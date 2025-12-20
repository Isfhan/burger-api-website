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

The fastest way to get started is with the dedicated **Burger API CLI**. It handles project scaffolding and dependency installation automatically.

1. **Install the CLI:**
   - **macOS/Linux/WSL:** `curl -fsSL https://burger-api.com/install.sh | bash`
   - **Windows PowerShell:** `irm https://burger-api.com/install.ps1 | iex`

2. **Create your project:**
   ```bash
   burger-api create my-awesome-api
   ```

3. **Run your project:**
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
