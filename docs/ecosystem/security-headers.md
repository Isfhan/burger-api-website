---
sidebar_label: Security Headers
---

# Security Headers Hook

This hook adds response headers that protect browsers from common attacks, such as HSTS, `X-Frame-Options` and an optional Content Security Policy (CSP).

## Install

```bash
burger-api add security-headers
```

To update the copy later, run `burger-api add security-headers --force`.

## Add it

Add it to `onRequest` in `src/hooks.ts`, so every response gets the headers:

```ts title="src/hooks.ts"
import { securityHeaders } from "../ecosystem/hooks/security-headers/security-headers";

export const onRequest = [securityHeaders()];
```

Presets:

- `strictSecurity()`: a `'self'`-only CSP, long HSTS with `preload`, and blocks camera, microphone, location and payment.
- `relaxedSecurity()`: no CSP, no HSTS, and allows same-origin framing.

## Options

Add your own CSP with camelCase directive names:

```ts title="src/hooks.ts"
export const onRequest = [
  securityHeaders({
    contentSecurityPolicy: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.example.com"],
    },
  }),
];
```

- `contentSecurityPolicy`: CSP directives. Not set by default.
- `strictTransportSecurity`: `{ maxAge, includeSubDomains, preload }`.
- `frameOptions`: `"DENY"` or `"SAMEORIGIN"`. Default `"DENY"`.
- `referrerPolicy`: default `"no-referrer"`.

Pass `false` for any option to leave that header out. The full list is in `ecosystem/hooks/security-headers/README.md`.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Global Hooks](/docs/hooks/global)
