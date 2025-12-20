---
sidebar_label: CLI Tool (New)
sidebar_position: 2
---

# Burger API CLI Tool

The Burger API CLI is the recommended way to create, manage, and build your Burger API projects. It provides a streamlined experience for scaffolding new projects, managing middleware, and compiling your application for production.

## Installation

You can install the Burger API CLI quickly using the following commands:

### Quick Install (macOS, Linux, WSL)
```bash
curl -fsSL https://burger-api.com/install.sh | bash
```

### Quick Install (Windows PowerShell)
```powershell
irm https://burger-api.com/install.ps1 | iex
```

### Manual Installation
You can also download the latest binaries directly from the [GitHub Releases](https://github.com/isfhan/burger-api/releases/latest).

### Verification
After installation, verify that the CLI is working by checking its version:
```bash
burger-api --version
```
*Show version : `0.6.4`*

---

## Quick Start

Get a new project up and running in seconds:

```bash
# 1. Create a new project
burger-api create my-awesome-api

# 2. Navigate to your project
cd my-awesome-api

# 3. Start the development server
bun run dev

# 4. Open http://localhost:4000 in your browser
```

---

## Available Commands

### 1. `burger-api create <project-name>`
Creates a new Burger API project with interactive prompts.

- **What it does:** Scaffolds a complete project structure, configures initial settings, and automatically installs dependencies.
- **Interactive Prompts:** You'll be asked about API routes, API directory, API prefix, debug mode, Page routes, Page directory, and Page prefix.
- **Example:**
  ```bash
  burger-api create my-api
  ```

### 2. `burger-api list` (alias: `ls`)
Shows all available middleware from the official ecosystem.

- **What it does:** Fetches the latest list of curated middleware from the repository and displays their names and descriptions in a table.
- **Example:**
  ```bash
  burger-api list
  ```

### 3. `burger-api add <middleware...>`
Adds one or more middleware to your project.

- **What it does:** Downloads the specified middleware from GitHub and copies them to your `ecosystem/middleware/` directory. It also provides usage instructions after installation.
- **Examples:**
  ```bash
  burger-api add cors
  burger-api add cors logger rate-limiter
  burger-api add jwt-auth api-key-auth
  ```

### 4. `burger-api build <file>`
Bundles your project into a single JavaScript file.

- **Options:**
  - `--outfile <path>`: Output file path (default: `.build/bundle.js`)
  - `--minify`: Minify the output code
  - `--sourcemap <type>`: Generate sourcemaps (`inline`, `linked`, or `none`)
  - `--target <target>`: Target environment (e.g., `bun`, `node`)
- **Example:**
  ```bash
  burger-api build src/index.ts --minify
  ```

### 5. `burger-api build:executable <file>`
Compiles your project into a standalone executable that doesn't require a runtime to be pre-installed.

- **Options:**
  - `--outfile <path>`: Output file path
  - `--target <target>`: Target platform (e.g., `bun-windows-x64`, `bun-linux-x64`, `bun-darwin-arm64`)
  - `--minify`: Minify the output (enabled by default)
  - `--no-bytecode`: Disable bytecode compilation
- **Example:**
  ```bash
  burger-api build:executable src/index.ts --target bun-linux-x64
  ```

### 6. `burger-api serve`
Starts a development server with hot reload, automatically restarting when you make file changes.

- **Options:**
  - `-p, --port <port>`: Port to run on (default: `4000`)
  - `-f, --file <file>`: Entry file (default: `src/index.ts`)
- **Example:**
  ```bash
  burger-api serve --port 4000
  ```

---

## Common Workflows

### Creating and Running a Project
1. Use `burger-api create` to set up your directory.
2. Run `burger-api serve` or `bun run dev` to start coding.

### Adding Middleware
1. Browse available middleware with `burger-api list`.
2. Add what you need with `burger-api add <name>`.
3. Import the middleware from `ecosystem/middleware/` in your `index.ts`.

### Building for Production
1. For a single JS file: `burger-api build src/index.ts --minify`.
2. For a standalone binary: `burger-api build:executable src/index.ts --target bun-linux-x64`.

---

## Project Structure (CLI Created)

When you create a project using `burger-api create`, it generates the following structure:

```text
my-api/
├── src/
│   ├── index.ts          # Main entry point
│   └── api/              # Your file-based API routes
├── ecosystem/
│   └── middleware/       # Middleware installed via `burger-api add`
├── package.json
└── tsconfig.json
```

- **`ecosystem/middleware/`**: This is where the CLI places all downloaded middleware files. Each middleware is usually in its own subdirectory.

---

## Troubleshooting

- **`burger-api: command not found`**
  - Ensure the installation directory (usually `~/.burger-api/bin`) is in your system's `PATH`.
  - Restart your terminal or run `source ~/.bashrc` (or equivalent).

- **`Directory already exists`**
  - The `create` command requires a target directory that doesn't exist yet. Choose a new name or remove the existing folder.

- **Could not get middleware list from GitHub**
  - Check your internet connection. The CLI needs to reach `github.com` to fetch the middleware registry.

- **Entry file not found**
  - Ensure you are running the command from the root of your project or specify the correct path using the `-f` flag.

- **Build failures on Windows (D:\ drive)**
  - If you encounter issues compiling executables on a secondary drive (like `D:\`), try moving the project to the `C:\` drive or ensuring your user has full permissions for the target output directory.
