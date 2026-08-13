#!/usr/bin/env python3

import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path


API_ROOT = "https://api.github.com/repos"
BAKE_FILE = Path("src/typst/docker-bake.hcl")
DOCKERFILE = Path("src/typst/Dockerfile")
TEMPLATE_FILE = Path("src/typst/devcontainer-template.json")
STABLE_VERSION = re.compile(r"^v?(\d+)\.(\d+)\.(\d+)$")


def github_json(path: str):
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "typst-dev-container-version-updater",
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


def latest_stable_versions(repository: str, count: int) -> list[str]:
    releases = github_json(f"{repository}/releases?per_page=100")
    versions = {
        match.group(0).removeprefix("v")
        for release in releases
        if not release["draft"] and not release["prerelease"]
        if (match := STABLE_VERSION.fullmatch(release["tag_name"]))
    }
    ordered = sorted(
        versions,
        key=lambda version: tuple(map(int, version.split("."))),
        reverse=True,
    )
    if len(ordered) < count:
        raise RuntimeError(f"Expected at least {count} stable releases for {repository}")
    return ordered[:count]


def latest_release(repository: str) -> str:
    tag = github_json(f"{repository}/releases/latest")["tag_name"]
    version = tag.removeprefix("v")
    if not STABLE_VERSION.fullmatch(version):
        raise RuntimeError(f"Latest release for {repository} is not a stable version: {tag}")
    return version


def main() -> int:
    typst_versions = latest_stable_versions("typst/typst", 3)
    rust_version = latest_release("rust-lang/rust")
    pandoc_version = latest_release("jgm/pandoc")

    content = BAKE_FILE.read_text()
    content, latest_updates = re.subn(
        r'(variable "LATEST" \{\n  type    = string\n  default = ")[^"]+("\n\})',
        rf"\g<1>{typst_versions[0]}\g<2>",
        content,
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

    BAKE_FILE.write_text(content)

    dockerfile = DOCKERFILE.read_text()
    dockerfile, dockerfile_updates = re.subn(
        r"^ARG RUST_VERSION=.*$",
        f"ARG RUST_VERSION={rust_version}",
        dockerfile,
        flags=re.MULTILINE,
    )
    if dockerfile_updates != 1:
        raise RuntimeError(f"Could not locate the Rust version in {DOCKERFILE}")
    DOCKERFILE.write_text(dockerfile)

    template = json.loads(TEMPLATE_FILE.read_text())
    template["options"]["typstVersion"]["proposals"] = ["latest", *typst_versions]
    TEMPLATE_FILE.write_text(json.dumps(template, indent=4) + "\n")
    print(
        f"Typst: {', '.join(typst_versions)}; Rust: {rust_version}; Pandoc: {pandoc_version}"
    )
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except (OSError, RuntimeError) as error:
        print(error, file=sys.stderr)
        sys.exit(1)
