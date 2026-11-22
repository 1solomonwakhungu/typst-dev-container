## What the image contains

The template uses a prebuilt image, `ghcr.io/1solomonwakhungu/typst-dev-container/typst`, built from the [`Dockerfile`](https://github.com/1solomonwakhungu/typst-dev-container/blob/main/images/typst/Dockerfile) in `images/typst`. Each image has:

- the [Typst](https://typst.app/) CLI, installed from the static musl release build
- [Pandoc](https://pandoc.org/), for converting LaTeX, Markdown, or Word documents to and from Typst
- `git`, `curl`, and CA certificates on a minimal `debian:trixie-slim` base (default)

Two image variants are published for `linux/amd64` and `linux/arm64`:

- **Slim Debian (default)**: `:latest`, `:slim`, `:<version>`, and `:<version>-slim` — built on `debian:trixie-slim` for a fast, lightweight pull when you only need Typst and Pandoc.
- **Rust variant**: `:rust` and `:<version>-rust` — built on the official `rust` base image (Debian 13 trixie), adding `rustc`, `cargo`, and build tools for Typst plugin or Rust development.

The `typstVersion` option picks the image tag: `latest` follows the newest supported Typst release on Debian slim, `rust` follows the newest release on the Rust base image, and numbered tags (`<version>` or `<version>-rust`) stay on one Typst version. The repository [README](https://github.com/1solomonwakhungu/typst-dev-container#included-versions) lists the current Typst, Pandoc, and Rust versions.

The container also installs these VS Code extensions:

- `myriad-dreamin.tinymist`: Typst language server, preview, and `typstyle` formatting on save
- `shardulm94.trailing-spaces`
- `stkb.rewrap`
- `FreddyZhu.pandoc-assist`

## Using the template

In VS Code, run **Dev Containers: Add Dev Container Configuration Files...**, choose **Show All Definitions**, and search for `ghcr.io/1solomonwakhungu/typst-dev-container/templates/typst`. With the Dev Container CLI:

```bash
devcontainer templates apply \
  --template-id ghcr.io/1solomonwakhungu/typst-dev-container/templates/typst \
  --template-args '{"typstVersion": "latest"}'
```

Then reopen the folder in the container, create a `.typ` file, and compile it with `typst compile <file>.typ`.

The container runs as `root`. Remove the `remoteUser` line from the generated `.devcontainer/devcontainer.json` if you need a different user.
