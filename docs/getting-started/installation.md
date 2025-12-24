---
sidebar_label: Installation
sidebar_position: 1 # Position it early in the Getting Started section
---

# Installation

BurgerAPI is built for the [Bun.js](https://bun.sh/) runtime. Make sure you have Bun installed before you begin.

## Prerequisites

- **Bun:** Follow the official [Bun installation guide](https://bun.sh/docs/installation) to install it on your system.

  You can verify your installation by running:

  ```bash
  bun --version
  ```

## Recommended: Using the Burger API CLI

Burger API comes with a powerful CLI tool that makes it easy to scaffold new projects and manage middleware. Install it globally to get started:

### Installation

#### Option 1: Bun Global Installation (Recommended if you have Bun installed)

```bash
# Global installation
bun add -g @burger-api/cli
```

Or use with **bunx** (No Installation Needed):

```bash
bunx @burger-api/cli create my-project
```

#### Option 2: Standalone Executable (Alternative Installation Method)

- **macOS/Linux/WSL:**
  ```bash
  curl -fsSL https://burger-api.com/install.sh | bash
  ```
- **Windows PowerShell:**
  ```powershell
  irm https://burger-api.com/install.ps1 | iex
  ```

### Create your project

Once installed, you can create a new project by running:

```bash
burger-api create my-awesome-api
```

### Run your project

```bash
cd my-awesome-api
bun run dev
```

For detailed CLI usage, check out the [CLI Tool Guide](./cli.md).

---

## Alternative: Manual Setup (Standard Bun)

If you prefer not to use the CLI, you can set up a project manually using standard Bun commands:

1. **Initialize a new Bun project:**
   Navigate to your project directory and run:
   ```bash
   bun init
   ```
   Follow the prompts to create a basic Bun project.

2. **Install BurgerAPI:**
   Add the framework to your dependencies:
   ```bash
   bun add burger-api
   ```

---

## Ready to Go!

That's it! You now have a Bun project set up with BurgerAPI installed.

Next, you might want to check out the [Configuration](./../core/configuration.md) guide to see how to create your first BurgerAPI instance.
