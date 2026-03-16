---
sidebar_label: Installation
sidebar_position: 1
---

# Installation

BurgerAPI runs on [Bun.js](https://bun.sh/). You need Bun installed first.

## Prerequisites

- **Bun** — Install from the [official Bun installation guide](https://bun.sh/docs/installation). Verify with:

  ```bash
  bun --version
  ```

## Install the Burger API CLI (recommended)

The CLI is the easiest way to create and run projects.

### Option 1: Global install with Bun

```bash
bun add -g @burger-api/cli
```

### Option 2: Use bunx (no global install)

```bash
bunx @burger-api/cli create my-project
```

### Option 3: Standalone executable

- **macOS / Linux / WSL:**
  ```bash
  curl -fsSL https://burger-api.com/install.sh | bash
  ```
- **Windows PowerShell:**
  ```powershell
  irm https://burger-api.com/install.ps1 | iex
  ```

You can also download binaries from [GitHub Releases](https://github.com/isfhan/burger-api/releases/latest).

## Create and run a project

```bash
burger-api create my-awesome-api
cd my-awesome-api
bun run dev
```

For full CLI options and manual setup, see the [Getting Started Installation guide](/docs/getting-started/installation) and the [CLI Tool](/docs/getting-started/cli) reference.
