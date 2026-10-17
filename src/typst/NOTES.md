## What the image contains

The template uses a prebuilt image, `ghcr.io/1solomonwakhungu/typst-dev-container/typst`, built from the [`Dockerfile`](https://github.com/1solomonwakhungu/typst-dev-container/blob/main/src/typst/Dockerfile) in this folder. Each image has:

- the [Typst](https://typst.app/) CLI, installed from the static musl release build
- [Pandoc](https://pandoc.org/), for converting LaTeX, Markdown, or Word documents to and from Typst
- the Rust toolchain from the official `rust` base image (Debian 13 trixie)

Images are built for `linux/amd64` and `linux/arm64`. The `typstVersion` option picks the image tag: `latest` follows the newest supported Typst release, and the numbered tags stay on one Typst version. The repository [README](https://github.com/1solomonwakhungu/typst-dev-container#included-versions) lists the current Rust and Pandoc versions.

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
