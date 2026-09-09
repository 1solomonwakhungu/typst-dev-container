---
name: typst-toolchain-maintainer
description: Maintain the buildable Typst, Rust, and Pandoc version matrix in 1solomonwakhungu/typst-dev-container and compatible forks. Use for scheduled toolchain updates, release-asset lag, multi-architecture image failures, or changes to the repository's updater and container publishing workflow.
---

# Typst Toolchain Maintainer

Apply this workflow only to repositories that use the same layout and updater as
`1solomonwakhungu/typst-dev-container`.

## Preserve the buildability rule

The newest upstream release is not necessarily usable. Adopt a release only
after every artifact consumed by the Docker build exists:

- Typst needs both static musl archives:
  `typst-x86_64-unknown-linux-musl.tar.xz` and
  `typst-aarch64-unknown-linux-musl.tar.xz`.
- Pandoc needs both Linux archives:
  `pandoc-<version>-linux-amd64.tar.gz` and
  `pandoc-<version>-linux-arm64.tar.gz`.
- Rust needs the official `rust:<version>` Docker Hub tag because the
  Dockerfile builds from that image.

Release metadata alone does not prove these inputs are available. Preserve the
skip-forward behavior in `.github/scripts/update-toolchain.py` so a partially
published release does not break the scheduled update.

## Update the repository

Before editing, read:

- `.github/scripts/update-toolchain.py`
- `src/typst/Dockerfile`
- `src/typst/docker-bake.hcl`
- `src/typst/devcontainer-template.json`
- the workflows that call the updater or publish images

Run the updater from the repository root. Review its diff and keep these fields
in sync:

- the three buildable Typst versions in the bake matrix;
- the `LATEST` Typst version;
- the single Rust version in the bake matrix and Dockerfile default;
- the single Pandoc version across the bake matrix;
- `latest` plus the three explicit Typst proposals in the template metadata.

Do not hand-select a version that the updater rejected unless the upstream
artifacts have since become available and the same checks now pass.

## Verify changes

Use the narrowest checks that cover the edit:

```bash
python3 .github/scripts/update-toolchain.py
docker buildx bake --print -f src/typst/docker-bake.hcl typst
```

When Docker is available, build at least one target. For changes to architecture
mapping, downloads, or extraction, verify both `linux/amd64` and `linux/arm64`.
Inside a built image, check:

```bash
typst --version
pandoc --version
rustc --version
typst help watch
```

Also run the repository's targeted test workflow. If Docker or a second
architecture is unavailable, state exactly which build remains for CI rather
than claiming full verification.

Keep version-only pull requests mechanical. Explain any skipped upstream
release in the PR body with the missing asset or image tag that caused the
skip.
