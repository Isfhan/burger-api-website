---
sidebar_label: Compression
---

# Compression Hook

This hook compresses responses with gzip or deflate when the client accepts it. Use it to shrink JSON, HTML and other text.

## Install

```bash
burger-api add compression
```

To update the copy later, run `burger-api add compression --force`.

## Add it

Add it to `onRequest` in `src/hooks.ts`, so it covers every response, including errors:

```ts title="src/hooks.ts"
import { compress } from "../ecosystem/hooks/compression/compression";

export const onRequest = [compress()];
```

With no options it compresses bodies of 1KB or more.

## Options

- `threshold`: minimum body size in bytes. Default `1024`.
- `encodings`: encodings in order of preference. Default `["gzip", "deflate"]`. Brotli is not supported.
- `contentTypes`: only compress these types (string array or regex).
- `excludeContentTypes`: never compress these types. Default images, video, audio and fonts.

The full list is in `ecosystem/hooks/compression/README.md`.

## Good to know

- Event streams and responses with `Content-Encoding` already set are skipped.
- If a CDN in front of your app already compresses, leave this hook off.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Global Hooks](/docs/hooks/global)
