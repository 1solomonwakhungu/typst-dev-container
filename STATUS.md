# Status

- Completed: updated and automated the Typst container toolchain.
- Completed: the toolchain updater now adopts a release only once the
  artifacts the image builds from are published, so a Docker Hub or upstream
  upload lag no longer breaks the scheduled update.
- Current versions: Typst 0.15.1, 0.15.0, and 0.14.2; Rust 1.99.1; Pandoc 3.12.1 (template 1.0.2).
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
  - Review follow-up: the `Dockerfile` and `docker-bake.hcl` moved from
    `src/typst/` to `images/typst/`. `devcontainer templates apply` copies
    every file in the template folder into the user's project, so the old
    layout would have dropped (or overwritten) a `Dockerfile` there. Image
    builds now trigger on `images/typst/**`, so template docs changes no
    longer republish the images. `release.yaml` runs one at a time.
- Next: add a `TOOLCHAIN_PR_TOKEN` secret so toolchain pull requests run CI
  without manual approval. Check that the new `templates/typst` package on
  ghcr.io is public after the first release.
