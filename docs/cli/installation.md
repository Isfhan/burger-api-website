---
sidebar_label: CLI Installation
---

# CLI Installation

Install the Burger API CLI to create projects, add middleware, and build for production.

## Option 1: Bun global (recommended)

```bash
bun add -g @burger-api/cli
```

## Option 2: bunx (no install)

```bash
bunx @burger-api/cli create my-project
```

## Option 3: Standalone executable

- **macOS/Linux/WSL:** `curl -fsSL https://burger-api.com/install.sh | bash`
- **Windows PowerShell:** `irm https://burger-api.com/install.ps1 | iex`

Or download from [GitHub Releases](https://github.com/isfhan/burger-api/releases/latest).

## Verify

```bash
burger-api --version
```

For all commands and workflows, see [CLI Tool](/docs/getting-started/cli).
