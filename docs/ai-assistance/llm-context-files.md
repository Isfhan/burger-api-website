---
sidebar_label: "LLM Context Files (New)"
title: "LLM Context Files"
description: "Learn how to use Burger API's LLM context files to help AI editors understand and generate code for your project."
sidebar_position: 1
---

# LLM Context Files

Burger API provides specialized context files designed to help AI editors (like Cursor, GitHub Copilot, and others) understand the framework's architecture, APIs, and best practices. These files provide the "brain" for your AI assistant, ensuring it generates accurate and idiomatic Burger API code.

## Introduction

### What are LLM context files?
LLM context files are structured text or markdown files that contain comprehensive information about the Burger API framework, its CLI, and common coding patterns. 

### Why they exist
Modern AI editors are powerful, but they might not always have the latest training data for specialized frameworks like Burger API. By providing these context files, you bridge that gap, enabling the AI to:
- Generate correct route structures
- Use the middleware system accurately
- Apply proper Zod validation schemas
- Suggest the right CLI commands

### Where to find them

There are two main ways to access these files:

1.  **In your project**: If you created your project using the Burger API CLI, these files are already available in the `ecosystem/.llm-context/` directory of your project.
2.  **Direct Download**: You can also download them directly from our website:
    - [llms.txt](https://burger-api.com/llms.txt)
    - [llms-small.txt](https://burger-api.com/llms-small.txt)
    - [llms-full.txt](https://burger-api.com/llms-full.txt)

## File Descriptions

We provide three different versions of the context files to suit different needs and token limits:

| File | Type | Description |
| :--- | :--- | :--- |
| [**llms.txt**](https://burger-api.com/llms.txt) | Table of Contents | A lightweight map of all documentation sections. Best for getting an overview. |
| [**llms-small.txt**](https://burger-api.com/llms-small.txt) | Concise Reference | ~400 lines of essential information. Includes basics, routing, middleware, validation, and core CLI commands. |
| [**llms-full.txt**](https://burger-api.com/llms-full.txt) | Comprehensive Guide | ~1700 lines of exhaustive documentation. Includes all details, troubleshooting, and advanced examples. |

## When to Use Each File

- **Use `llms.txt`** when you need a quick overview of what documentation is available or to help the AI "navigate" the docs.
- **Use `llms-small.txt`** for daily development tasks, creating new routes, or when you are mindful of AI token usage.
- **Use `llms-full.txt`** for complex implementations, deep dives into framework internals, or when you need detailed troubleshooting help.

## How to Use

Simply "attach" or "mention" these files in your AI editor's prompt. 

- In **Cursor**, use the `@` symbol to reference the file.
- In **Copilot**, you can reference the file path or open the file in a tab.

## Benefits

- **Better Code Generation**: AI produces code that follows Burger API conventions perfectly.
- **Accurate Type Suggestions**: Helps AI understand the specialized types like `BurgerRequest` and `Middleware`.
- **Reduced Errors**: Minimizes the "hallucination" of non-existent APIs.
- **Up-to-Date Context**: These files are updated with every framework release.

---

:::tip
For the best results, combine these LLM files with your own codebase context when prompting your AI assistant.
:::

## Next Steps

- [Learn how to use these files with your editor](./using-llm-files.md)
- [Explore the file contents reference](./llm-files-reference.md)
- [See real-world integration examples](./integration-examples.md)
