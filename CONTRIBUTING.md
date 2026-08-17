# Contributing to Typst + Pandoc Dev Container

Thank you for your interest in contributing to the Typst + Pandoc Dev Container project! This guide will help you understand how to contribute effectively.

## Project Scope

This repository maintains a [Dev Containers](https://containers.dev/) template providing a pre-configured development environment for:

- **Typst**: A modern markup-based typesetting system for creating beautiful PDF documents
- **Pandoc**: A universal document converter, particularly useful for LaTeX to Typst conversion workflows

The project focuses on:
- Container template definitions and configurations
- Support for multiple stable Typst releases with compatible toolchain versions
- Cross-platform compatibility (Linux AMD64 and ARM64)
- Automated toolchain version updates
- Smoke testing to ensure template functionality

**Out of scope:** Container workflows, devcontainer configuration details, README updates, and deployment strategies (these are managed separately).

## Getting Started

### Prerequisites

To contribute, you'll need:

1. **Docker** installed on your system
2. **VS Code** or a VS Code-compatible IDE (VS Codium, etc.)
3. **Dev Containers extension** for VS Code
4. **Python 3.7+** for scripting tasks
5. **Git** for version control

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/1solomonwakhungu/typst-dev-container.git
   cd typst-dev-container
   ```

2. **Open in Dev Container:**
   - Open the project in VS Code
   - When prompted, click "Reopen in Container"
   - Or manually select: `F1` → "Dev Containers: Reopen in Container"

3. **Verify the environment:**
   ```bash
   typst --version
   pandoc --version
   rustc --version
   ```

## Development Workflow

### Understanding the Template Structure

- **`src/typst/`**: Main template directory containing:
  - `Dockerfile`: Container image definition
  - `docker-bake.hcl`: Multi-version build configuration
  - `devcontainer.json`: Dev container configuration
  - `devcontainer-template.json`: Template metadata and options

- **`test/`**: Test utilities and test scripts for template validation
  - `test/typst/test.sh`: Tests specific to the Typst template
  - `test/test-utils/test-utils.sh`: Shared testing utilities

- **`.github/workflows/`**: Automated workflows:
  - `test-pr.yaml`: Smoke tests on pull requests
  - `update-toolchain.yaml`: Weekly automated version updates
  - `containers.yaml`: Docker image building and publishing
  - `release.yaml`: Template publishing to Dev Containers registry

### Common Development Tasks

#### 1. Modifying the Container Configuration

If you need to update the Dockerfile or build configuration:

```bash
# Edit the Dockerfile
vim src/typst/Dockerfile

# Or update build matrix
vim src/typst/docker-bake.hcl
```

#### 2. Adding or Updating Test Cases

Test changes in `test/typst/test.sh`:

```bash
# Review existing tests
cat test/typst/test.sh

# Add new validation logic for template features
# Tests should verify the container builds and essential tools work
```

#### 3. Working with Toolchain Versions

The repository maintains support for the three latest stable Typst releases with compatible versions of Rust and Pandoc.

- View current versions in `src/typst/docker-bake.hcl`
- Versions are automatically updated weekly via `update-toolchain.yaml`
- Manual updates require modifying the `matrix` in `docker-bake.hcl`

## Targeted Verification

Before submitting a pull request, verify your changes:

### 1. Run Smoke Tests Locally

```bash
# Build the template
./.github/actions/smoke-test/build.sh typst

# Test the template
./.github/actions/smoke-test/test.sh typst
```

### 2. Validate Build Configuration

```bash
# Check Dockerfile syntax and HCL configuration
docker buildx bake --print -f src/typst/docker-bake.hcl typst
```

### 3. Build Specific Images

```bash
# Build a specific Typst version
docker buildx bake -f src/typst/docker-bake.hcl typst-v0-15-1

# Build for specific platform
docker buildx bake --set="typst.platform=linux/amd64" -f src/typst/docker-bake.hcl typst
```

### 4. Manual Testing in Container

```bash
# Start a test container with your changes
docker build -f src/typst/Dockerfile \
  --build-arg TYPST_VERSION=0.15.1 \
  --build-arg RUST_VERSION=1.97.1 \
  --build-arg PANDOC_VERSION=3.10.2 \
  -t test-typst .

docker run --rm -it test-typst bash

# Inside the container:
typst --version
pandoc --version
rustc --version
```

## Pull Requests

### Before Creating a PR

1. **Test locally** using the verification steps above
2. **Check the branch** off the current `main` branch
3. **Include the Co-authored-by trailer** in commit messages
4. **Write clear commit messages** following conventional commits:
   - `build:` for Dockerfile/build config changes
   - `test:` for test changes
   - `docs:` for documentation changes
   - `chore:` for maintenance tasks

### PR Guidelines

- **Scope:** Keep changes focused on the template, build configuration, or tests
- **Description:** Explain what changed and why
- **Testing:** Reference which tests you ran locally
- **Automated checks:** Smoke tests will run automatically on your PR

### Example PR Description

```markdown
## Description
Updated Dockerfile to include additional Rust tools for development.

## Changes
- Added `cargo-fmt` and `cargo-clippy` to Dockerfile
- Updated toolchain version to 1.97.1

## Testing
- ✅ Ran smoke tests locally: `./.github/actions/smoke-test/build.sh typst` and `./.github/actions/smoke-test/test.sh typst`
- ✅ Built image successfully: `docker buildx bake -f src/typst/docker-bake.hcl typst`
- ✅ Verified tools in container: `rustc --version`, `cargo fmt --version`, `cargo clippy --version`

## Related Issues
Closes #123
```

## Issue Reporting

### Before Opening an Issue

1. **Check existing issues** to avoid duplicates
2. **Search discussions** for related topics
3. **Verify the issue** is reproducible in a fresh container

### Issue Guidelines

**For template or toolchain issues:**
- Describe your setup (OS, Docker version, VS Code version, IDE)
- Include container build output if available
- Specify which Typst version you're using
- Provide reproduction steps

**For test failures:**
- Include the full test output
- Mention which platform you're testing on
- Include relevant environment details

### Issue Template Example

```markdown
## Description
Brief description of the issue

## Setup
- OS: [e.g., macOS 14.1]
- Docker version: [e.g., 24.0.0]
- VS Code version: [e.g., 1.84.0]
- Typst version: [e.g., 0.15.1]

## Steps to Reproduce
1. ...
2. ...
3. ...

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Logs/Output
```
[paste error output here]
```
```

## Supported Platforms and Versions

### Container Platforms
- **Linux AMD64** (x86_64)
- **Linux ARM64** (aarch64)

### Development Environments
- VS Code (recommended)
- VS Codium and other VS Code-compatible IDEs
- Any environment supporting the [Dev Containers specification](https://containers.dev/)

### Typst Support Policy
- The repository maintains dev container templates for the **three most recent stable Typst releases**
- Toolchain versions (Rust, Pandoc) are updated to match compatibility requirements
- New template versions are published weekly when updates are available

## Commit Message Format

Include this trailer in all commit messages:

```
Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>
```

Example:

```
build: update Typst toolchain versions

Updates docker-bake.hcl with the latest stable Typst releases
and compatible Rust/Pandoc versions.

Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>
```

## Questions?

- **Documentation:** See [README.md](README.md) for usage instructions
- **Status:** Check [STATUS.md](STATUS.md) for current project status
- **Issues:** Open an issue for bugs or feature requests
- **Discussions:** Use GitHub Discussions for questions or ideas

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

By contributing, you agree that your contributions will be licensed under the same MIT License.
