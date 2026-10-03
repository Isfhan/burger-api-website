# BurgerAPI Website

Source for [burger-api.com](https://burger-api.com), the documentation site for BurgerAPI.
Built with Docusaurus and Bun.

## Requirements

- Bun 1.4.0 or newer

## Setup

```sh
bun install
```

## Development

```sh
bun run start
```

Starts the dev server at http://localhost:3000. Most changes reload live.

## Build

```sh
bun run build
```

Generates `static/llms.txt`, `static/llms-full.txt`, and `static/llms-small.txt`
from `docs/`, then builds the static site into `build/`.

To regenerate only the llms files:

```sh
bun run generate:llms
```

Never edit the llms files by hand.

## Typecheck

```sh
bun run typecheck
```

## More

See [AGENTS.md](./AGENTS.md) for documentation standards and architecture rules.
