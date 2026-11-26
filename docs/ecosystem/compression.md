---
sidebar_label: Compression
---

# Compression Hook

The compression hook gzips or deflates response bodies when the client says it accepts them. Use it to cut the size of JSON, HTML, and other text responses.

## Install

```bash
burger-api add compression
```

## Usage

The hook returns a response transform, so compose it in `onRequest`:

```ts title="src/hooks.ts"
import { compress } from "../ecosystem/hooks/compression/compression";

export const onRequest = [compress()];
```

`onRequest` runs for every request, so the hook's response mapper also covers 404, 405, validation errors and `onError` responses, and sees the final status.

With no options it compresses bodies of 1KB or more with gzip, then deflate, whichever the client accepts first.

Raise the threshold or limit the content types:

```ts title="src/hooks.ts"
import { compress } from "../ecosystem/hooks/compression/compression";

export const onRequest = [
  compress({
    threshold: 2048,
    contentTypes: /^(text\/|application\/(json|javascript|xml))/,
  }),
];
```

## Options

- `threshold`: minimum body size in bytes to compress. Default `1024`.
- `encodings`: supported encodings in preference order. Default `["gzip", "deflate"]`.
- `contentTypes`: a string array or regex. When set, only matching content types are compressed. Default none, so all types are candidates.
- `excludeContentTypes`: a string array or regex. Default `["image/", "video/", "audio/", "font/"]`.

## Good to know

- The hook skips `text/event-stream`, `206` partial content, and responses with `Cache-Control: no-transform`. Event streams must pass through unbuffered.
- It also skips responses that already have `Content-Encoding`, have no body, or are `204` or `304`.
- Brotli is not implemented. If `"br"` is in `encodings` and the client accepts it, compression is skipped with a warning. Because the first match wins, listing `"br"` before `"gzip"` also blocks gzip.
- The body is buffered in full before it is compressed, so very large streaming responses are held in memory. If a CDN in front of your app already compresses, leave this hook off to avoid compressing twice.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Global Hooks](/docs/hooks/global)
