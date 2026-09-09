---
name: typst-dev-container
description: Configure and use the 1solomonwakhungu Typst and Pandoc Dev Container for reproducible document work. Use when a project needs a containerized Typst workspace, VS Code Dev Containers or Codespaces setup, Pandoc conversion, compilation checks, or container-specific troubleshooting.
---

# Typst Dev Container

Use the published multi-architecture image from
`ghcr.io/1solomonwakhungu/typst-dev-container/typst`. Keep changes scoped to the
user's document project; do not replace an existing container setup without
first inspecting it and accounting for its features, mounts, users, and editor
settings.

## Configure the workspace

1. Inspect `.devcontainer/devcontainer.json`, any Compose files, and the
   project's existing build commands.
2. If the project has no container configuration, add a minimal
   `.devcontainer/devcontainer.json` using the published image. Use `latest`
   when the user wants automatic toolchain updates. For a reproducible build,
   inspect the currently published tags and pin an explicit Typst version.
3. Preserve unrelated customizations. For VS Code, recommend Tinymist for Typst
   language support; add other extensions only when the project needs them.
4. Keep generated PDFs and intermediate files wherever the project already
   expects them. Do not invent a new output layout for an established project.

A minimal new configuration is:

```json
{
  "name": "Typst + Pandoc",
  "image": "ghcr.io/1solomonwakhungu/typst-dev-container/typst:latest",
  "customizations": {
    "vscode": {
      "extensions": ["myriad-dreamin.tinymist"]
    }
  }
}
```

The image supports Linux `amd64` and `arm64`. Do not add host-specific Typst,
Pandoc, or Rust installations when the container already supplies them.

## Work with documents

- Compile once with `typst compile input.typ output.pdf`.
- Watch during editing with `typst watch input.typ output.pdf`.
- Convert Markdown to editable Typst with
  `pandoc input.md --to typst --output output.typ`, then compile the generated
  `.typ` file separately. Review the conversion rather than assuming Pandoc
  preserves every layout detail.
- Preserve the document's existing fonts, package imports, bibliography paths,
  and output naming unless the user asks to change them.

## Verify the result

Run these checks inside the container:

```bash
typst --version
pandoc --version
rustc --version
typst compile path/to/input.typ path/to/output.pdf
test -s path/to/output.pdf
```

For a new workspace, compile a tiny smoke-test document if no real `.typ` file
exists. Report separately whether the container opened, the tool binaries ran,
and the PDF compiled; one result does not prove the others.

## Diagnose failures

- An image-pull failure is a registry, authentication, tag, or platform issue.
  Check those before changing document source.
- A missing binary after a successful pull usually means the wrong image or
  tag is running. Confirm the container image from inside the active workspace.
- A Typst compile error is a document or resource-path issue unless the same
  minimal document also fails.
- When `latest` changes behavior, reproduce with an explicit version tag before
  editing the project.

The source, supported version matrix, and architecture mapping live at
<https://github.com/1solomonwakhungu/typst-dev-container>.
