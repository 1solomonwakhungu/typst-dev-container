# Typst + Pandoc Dev Container

This repository provides a development container environment for working with Typst and Pandoc, enabling seamless PDF creation and LaTeX to Typst conversion workflows.

![Header Image](/assets/header.png)


## Features

- **Typst**: A modern markup-based typesetting system for creating beautiful PDF documents
- **Pandoc**: A universal document converter that can transform LaTeX files into Typst format
- **Pre-configured Environment**: All necessary tools and dependencies are pre-installed
- **VS Code Integration**: Ready-to-use development environment

## Prerequisites

Before using this dev container, ensure you have:

1. A VS Code-like IDE (VS Code, VS Codium, etc.)
2. The [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed
3. Docker installed on your system

## Getting Started

1. Clone this repository
2. Open the project in VS Code
3. When prompted, click "Reopen in Container" or use the command palette (F1) and select "Dev Containers: Reopen in Container"

For a detailed walkthrough on using Dev Containers, check out this tutorial:

[![Dev Containers Tutorial](https://img.youtube.com/vi/X7guekGZM20/0.jpg)](https://youtu.be/X7guekGZM20?t=72)

## Usage

### Creating PDFs with Typst

1. Create a new `.typ` file
2. Write your document using Typst syntax
3. Click on "preview" to view the PDF while typing
4. Use the built-in Typst compiler to generate PDFs

### Converting LaTeX to Typst

1. Place your LaTeX files in the workspace
2. Use Pandoc to convert them:
   ```bash
   pandoc input.tex -o output.typ
   ```

## Contributing

Feel free to submit issues and enhancement requests!
