---
sidebar_label: "Using LLM Files (New)"
title: "Using LLM Files"
description: "A detailed guide on how to integrate Burger API's LLM context files with various AI editors like Cursor and GitHub Copilot."
sidebar_position: 2
---

# Using LLM Files

Integrating Burger API's LLM files into your workflow is straightforward. If you've created your project using the Burger API CLI, you can find these files in the `ecosystem/.llm-context/` directory.

This guide covers how to use them with the most popular AI-powered code editors.

## For Cursor IDE

Cursor is built specifically for AI-assisted coding and makes it very easy to reference external files.

### 1. Attach Files with @ Mentions
In the Chat or Composer window, simply type `@` followed by the name of the LLM file you want to use.

**Example Prompt:**
> `@ecosystem/.llm-context/llms-small.txt Generate a new route file for user authentication with login and register endpoints.`

### 2. Best Practices
- Use **`llms-small.txt`** for most tasks to keep the AI response fast and focused.
- Use **`llms-full.txt`** when you need the AI to understand complex configurations or advanced features.

---

## For GitHub Copilot

GitHub Copilot can reference files using several methods depending on your IDE (VS Code, IntelliJ, etc.).

### 1. Reference in Chat
Open the GitHub Copilot Chat and reference the file path directly.

**Example Prompt:**
> `Using the documentation in ./ecosystem/.llm-context/llms-small.txt, explain how to implement a custom middleware for logging.`

### 2. Open Files in Tabs
Copilot often uses open files as context. Keeping the relevant `llm-*.txt` file open in a background tab can help Copilot provide more accurate suggestions in other files.

---

## For Claude Code

Claude Code (Anthropic's CLI tool) is exceptionally powerful at processing documentation context.

### 1. Using `/add`
In your Claude Code session, use the `/add` command to bring the context files into the conversation.

**Example:**
> `/add ecosystem/.llm-context/llms-small.txt`
> `Now, using that context, create a route group for 'admin' with a custom authentication middleware.`

### 2. Context Chaining
Claude's large context window allows you to keep `llms-full.txt` active for complex architectural discussions without losing track of your project state.

---

## For Other AI Editors

Whether you are using open-source editors (like **PearAI**, **Continue**, or **Void**) or premium tools like **Windsurf**:

- **Mentions & Symbols**: Most AI editors now use the `@` or `#` symbols to reference files. Try `@llms-small.txt` first.
- **System Prompts**: In tools like **Continue**, you can add the content of `llms-small.txt` to your system prompt to always have Burger API context available.
- **Copy/Paste**: For specific tasks, copy the relevant section from `llms-full.txt` directly into your prompt.
- **File Upload**: Many modern AI interfaces allow you to upload text files directly as context.
- **Reference URL**: If your files are hosted online (e.g., on GitHub), you can provide the raw link to the AI.

---

## Example Prompts

Here are some effective ways to phrase your requests:

- **Create a Route**: `"Using the Burger API documentation from @llms-small.txt, create a route file with GET and POST handlers for products."`
- **Implement Middleware**: `"Reference @llms-full.txt to show me how to implement authentication middleware that checks for a Bearer token."`
- **Check Validation**: `"Based on @llms.txt, what validation options are available for request bodies in Burger API?"`

## Best Practices for AI Prompting

1. **Be Specific**: Tell the AI exactly which file to use and what you want to achieve.
2. **Mind the Tokens**: If you're working on a small feature, `llms-small.txt` is much more efficient than the full version.
3. **Keep Files Updated**: When you upgrade your Burger API version, ensure you also update your local copies of the LLM context files.
4. **Combine Context**: For the best results, mention both the LLM context file AND the specific file in your project you want to modify.

---

:::info
The more context you provide about your specific needs, the better the AI can tailor the Burger API patterns to your project.
:::
