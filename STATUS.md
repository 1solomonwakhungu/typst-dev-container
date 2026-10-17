# Status

- Completed: updated and automated the Typst container toolchain.
- Completed: the toolchain updater now adopts a release only once the
  artifacts the image builds from are published, so a Docker Hub or upstream
  upload lag no longer breaks the scheduled update.
- Current versions: Typst 0.15.1, 0.15.0, and 0.14.2; Rust 1.98.0; Pandoc 3.11.
- Completed (2026-10-16): hardened CI and fixed template publishing.
  - `containers.yaml` publishes images only from `main`.
  - `test-pr.yaml` builds the image from the pull request (amd64) and smoke
    tests that instead of the published `:latest`; failures now fail the check.
  - `release.yaml` publishes the template to
    `ghcr.io/1solomonwakhungu/typst-dev-container/templates/typst`, so it no
    longer collides with the image at `.../typst`. It runs on pushes to `main`
    that change `devcontainer-template.json`, as well as on manual dispatch.
  - The updater bumps the template patch version on toolchain changes,
    rewrites the README versions block, and has a `--dry-run` flag. Its pull
    requests use the `TOOLCHAIN_PR_TOKEN` secret when set (see CONTRIBUTING.md).
  - Template metadata, `src/typst/README.md`, README, and CONTRIBUTING fixed.
- Next: add a `TOOLCHAIN_PR_TOKEN` secret so toolchain pull requests run CI
  without manual approval. Check that the new `templates/typst` package on
  ghcr.io is public after the first release.
