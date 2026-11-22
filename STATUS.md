# Status

- Completed: updated and automated the Typst container toolchain.
- Completed: the toolchain updater now adopts a release only once the
  artifacts the image builds from are published, so a Docker Hub or upstream
  upload lag no longer breaks the scheduled update.
- Current versions: Typst 0.15.1, 0.15.0, and 0.14.2; Pandoc 3.14; `debian:trixie-slim` default and Rust 1.100.0 (`:rust` variant) (template 1.1.0).
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
- Completed (2026-10-17): merged #16, the toolchain update #12 (Rust 1.99.1,
  Pandoc 3.12.1, template 1.0.2), and docker-in-docker 4.1.3 (#15). The repo's
  own `.devcontainer` sets `"moby": false`, because the feature refuses to
  install Moby on the trixie-based image. Image builds on `main` are queued so
  overlapping pushes cannot publish out of order.
- Completed (2026-11-11): added a landing page in `landing-page/` (Vite, React,
  GitHub's Primer Brand design system), deployed by Vercel from `main` to
  <https://typst-dev-container.vercel.app>. It reads the version matrix from
  `images/typst/docker-bake.hcl` at build time. No image or template workflow
  is triggered by changes in that folder.
- Completed (2026-11-22): verified GHCR packages (`typst` and `templates/typst`)
  are public, merged toolchain update #19 (Rust 1.100.0, Pandoc 3.14, template
  1.0.4), and completed storefront, repository hygiene, and landing page SEO
  improvements (`README.md`, `.gitattributes`, `CONTRIBUTING.md`,
  `landing-page/public/robots.txt`, and `landing-page/public/sitemap.xml`).
- Completed (2026-11-22): added `v1.1.0` slim Debian default image
  (`debian:trixie-slim`, ~132 MB compressed on `linux/amd64` / ~135 MB on
  `linux/arm64`) and explicit `:rust` / `:<version>-rust` variant (~667 MB
  compressed on `linux/amd64` / ~624 MB on `linux/arm64`, ~80% reduction for
  default pulls), expanded `test/typst/test.sh` with real PDF compile checks,
  published GitHub Releases `v1.0.4` and `v1.1.0`, verified `TOOLCHAIN_PR_TOKEN`
  is configured, and updated template metadata, toolchain updater, docs, and
  landing page.
