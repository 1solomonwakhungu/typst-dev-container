#!/usr/bin/env python3

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path


API_ROOT = "https://api.github.com/repos"
DOCKER_HUB_ROOT = "https://hub.docker.com/v2/repositories/library"
BAKE_FILE = Path("src/typst/docker-bake.hcl")
DOCKERFILE = Path("src/typst/Dockerfile")
TEMPLATE_FILE = Path("src/typst/devcontainer-template.json")
README_FILE = Path("README.md")
README_START = "<!-- toolchain-versions:start -->"
README_END = "<!-- toolchain-versions:end -->"
USER_AGENT = "typst-dev-container-version-updater"
# Upstream projects differ in how many components they publish: Typst and Rust
# use X.Y.Z, while Pandoc ships tags such as 3.11, 3.10.2 and 3.9.0.2.
STABLE_VERSION = re.compile(r"v?\d+(?:\.\d+)+")


def github_json(path: str):
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": USER_AGENT,
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if token := os.environ.get("GH_TOKEN"):
        headers["Authorization"] = f"Bearer {token}"

    request = urllib.request.Request(f"{API_ROOT}/{path}", headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return json.load(response)
    except (urllib.error.URLError, json.JSONDecodeError) as error:
        raise RuntimeError(f"Failed to fetch GitHub release data for {path}: {error}") from error


def docker_hub_tag_exists(image: str, tag: str) -> bool:
    request = urllib.request.Request(
        f"{DOCKER_HUB_ROOT}/{image}/tags/{tag}",
        method="HEAD",
        headers={"User-Agent": USER_AGENT},
    )
    try:
        with urllib.request.urlopen(request, timeout=30):
            return True
    except urllib.error.HTTPError as error:
        if error.code == 404:
            return False
        raise RuntimeError(f"Failed to query Docker Hub for {image}:{tag}: {error}") from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"Failed to query Docker Hub for {image}:{tag}: {error}") from error


def version_key(version: str) -> tuple[int, ...]:
    return tuple(map(int, version.split(".")))


def stable_releases(repository: str) -> list[tuple[str, set[str]]]:
    """Stable releases as (version, asset names), newest first."""
    releases = github_json(f"{repository}/releases?per_page=100")
    versions = {
        match.group(0).removeprefix("v"): {asset["name"] for asset in release["assets"]}
        for release in releases
        if not release["draft"] and not release["prerelease"]
        if (match := STABLE_VERSION.fullmatch(release["tag_name"]))
    }
    return sorted(versions.items(), key=lambda entry: version_key(entry[0]), reverse=True)


def buildable_versions(repository: str, is_buildable, count: int) -> list[str]:
    """The newest `count` releases the image can actually be built from.

    Publishing a release is not the same as publishing the artifacts the image
    consumes: Docker Hub lags behind (and sometimes skips) upstream Rust point
    releases, and a fresh Typst or Pandoc release carries its per-architecture
    tarballs only once the upload finishes. Adopting a version before then
    leaves the bake definition referencing something that does not exist, so
    skip past those instead of failing the whole update.
    """
    usable: list[str] = []
    skipped: list[str] = []
    for version, assets in stable_releases(repository):
        if is_buildable(version, assets):
            usable.append(version)
            if len(usable) == count:
                break
        else:
            skipped.append(version)

    if skipped:
        print(
            f"note: skipping {repository} {', '.join(skipped)} "
            "(release published, build artifacts not available yet)",
            file=sys.stderr,
        )
    if len(usable) < count:
        raise RuntimeError(f"Expected at least {count} buildable releases for {repository}")
    return usable


def typst_is_buildable(version: str, assets: set[str]) -> bool:
    # The Dockerfile installs the static musl builds for both platforms.
    return all(
        f"typst-{arch}-unknown-linux-musl.tar.xz" in assets
        for arch in ("x86_64", "aarch64")
    )


def pandoc_is_buildable(version: str, assets: set[str]) -> bool:
    return all(
        f"pandoc-{version}-linux-{arch}.tar.gz" in assets for arch in ("amd64", "arm64")
    )


def rust_is_buildable(version: str, assets: set[str]) -> bool:
    # The image builds `FROM rust:<version>`, so the upstream release is only
    # usable once the official Docker image for it has been published.
    return docker_hub_tag_exists("rust", version)


def render_readme_versions(typst_versions: list[str], rust_version: str, pandoc_version: str) -> str:
    typst = ", ".join(
        f"{version} (`latest`)" if index == 0 else version
        for index, version in enumerate(typst_versions)
    )
    return "\n".join(
        [
            README_START,
            f"- **Typst**: {typst}",
            f"- **Pandoc**: {pandoc_version}",
            f"- **Rust**: {rust_version}",
            f"- **Base image**: `rust:{rust_version}` (Debian 13 trixie)",
            README_END,
        ]
    )


def bump_patch(version: str) -> str:
    parts = version.split(".")
    if len(parts) != 3 or not all(part.isdigit() for part in parts):
        raise RuntimeError(f"Template version {version!r} is not MAJOR.MINOR.PATCH")
    return ".".join([parts[0], parts[1], str(int(parts[2]) + 1)])


def main() -> int:
    parser = argparse.ArgumentParser(description="Update the Typst, Rust, and Pandoc versions.")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="print the files that would change without writing them",
    )
    args = parser.parse_args()

    typst_versions = buildable_versions("typst/typst", typst_is_buildable, 3)
    rust_version = buildable_versions("rust-lang/rust", rust_is_buildable, 1)[0]
    pandoc_version = buildable_versions("jgm/pandoc", pandoc_is_buildable, 1)[0]

    original_bake = BAKE_FILE.read_text()
    content, latest_updates = re.subn(
        r'(variable "LATEST" \{\n  type    = string\n  default = ")[^"]+("\n\})',
        rf"\g<1>{typst_versions[0]}\g<2>",
        original_bake,
    )
    matrix = "\n".join(
        f'      {{ typst = "{typst}", rust = "{rust_version}", pandoc = "{pandoc_version}" }},'
        for typst in typst_versions
    )
    content, matrix_updates = re.subn(
        r"(?<=    item = \[\n).*?(?=\n    \])",
        matrix,
        content,
        flags=re.DOTALL,
    )
    if latest_updates != 1 or matrix_updates != 1:
        raise RuntimeError(f"Could not locate the expected version fields in {BAKE_FILE}")

    original_dockerfile = DOCKERFILE.read_text()
    dockerfile, dockerfile_updates = re.subn(
        r"^ARG RUST_VERSION=.*$",
        f"ARG RUST_VERSION={rust_version}",
        original_dockerfile,
        flags=re.MULTILINE,
    )
    if dockerfile_updates != 1:
        raise RuntimeError(f"Could not locate the Rust version in {DOCKERFILE}")

    original_template = TEMPLATE_FILE.read_text()
    template = json.loads(original_template)
    template["options"]["typstVersion"]["proposals"] = ["latest", *typst_versions]
    toolchain_changed = (
        content != original_bake
        or dockerfile != original_dockerfile
        or json.dumps(template) != json.dumps(json.loads(original_template))
    )
    if toolchain_changed:
        # The release workflow only publishes a template version that is not
        # in the registry yet, so every toolchain change needs a new version.
        template["version"] = bump_patch(template["version"])
    template_text = json.dumps(template, indent=4) + "\n"

    original_readme = README_FILE.read_text()
    readme, readme_updates = re.subn(
        rf"{re.escape(README_START)}.*?{re.escape(README_END)}",
        lambda _: render_readme_versions(typst_versions, rust_version, pandoc_version),
        original_readme,
        flags=re.DOTALL,
    )
    if readme_updates != 1:
        raise RuntimeError(f"Could not locate the version markers in {README_FILE}")

    updates = {
        BAKE_FILE: (original_bake, content),
        DOCKERFILE: (original_dockerfile, dockerfile),
        TEMPLATE_FILE: (original_template, template_text),
        README_FILE: (original_readme, readme),
    }
    for path, (before, after) in updates.items():
        if before == after:
            continue
        if args.dry_run:
            print(f"would update {path}", file=sys.stderr)
        else:
            path.write_text(after)

    print(
        f"Typst: {', '.join(typst_versions)}; Rust: {rust_version}; Pandoc: {pandoc_version}"
        + (f"; template version: {template['version']}" if toolchain_changed else "")
    )
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, RuntimeError) as error:
        print(error, file=sys.stderr)
        sys.exit(1)
