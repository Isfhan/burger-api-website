---
sidebar_label: Installation
sidebar_position: 1 # Position it early in the Getting Started section
---

# Installation

BurgerAPI is built for the [Bun.js](https://bun.sh/) runtime. Make sure you have Bun installed before you begin.

## Prerequisites

*   **Bun:** Follow the official [Bun installation guide](https://bun.sh/docs/installation) to install it on your system.

    You can verify your installation by running:
    ```bash
    bun --version
    ```

## Setting up Your Project

1.  **Initialize a new Bun project:**

    Navigate to the directory where you want to create your project and run:

    ```bash
    bun init
    ```

    Follow the prompts. Choosing the defaults for a blank project is usually sufficient to start.

2.  **Install BurgerAPI:**

    Add the `burger-api` package to your project's dependencies:

    ```bash
    bun add burger-api
    ```

    :::tip Zod Dependency
    BurgerAPI uses Zod for its automatic schema validation. While it's listed as a dependency of `burger-api`, you might want to add it explicitly to your project if you plan to use Zod directly for other purposes:

    ```bash
    bun add zod
    ```
    :::

## Ready to Go!

That's it! You now have a Bun project set up with BurgerAPI installed. 

Next, you might want to check out the [Configuration](./../core/configuration.md) guide to see how to create your first BurgerAPI instance. 