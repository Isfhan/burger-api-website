---
sidebar_label: Security Headers
---

# Security Headers Hook

The security headers hook adds response headers that block common browser attacks: CSP, HSTS, `X-Frame-Options`, and a few more. Use it on any app that serves pages or APIs to browsers.

## Install

```bash
burger-api add security-headers
```

## Usage

The hook returns a response transform, so compose it in `beforeRoute`:

```ts title="src/hooks.ts"
import { securityHeaders } from "../ecosystem/hooks/security-headers/security-headers";

export const beforeRoute = [securityHeaders()];
```

For a stricter setup, use a preset. `strictSecurity()` adds a `'self'`-only CSP, a two year HSTS policy with `preload`, and disables camera, microphone, geolocation, and payment:

```ts title="src/hooks.ts"
import { strictSecurity } from "../ecosystem/hooks/security-headers/security-headers";

export const beforeRoute = [strictSecurity()];
```

The other preset is `relaxedSecurity()`, which sends no CSP and no HSTS, sets `X-Frame-Options: SAMEORIGIN`, and keeps `X-XSS-Protection`.

To write your own CSP, pass camelCase directive names. They become kebab-case directives in the header:

```ts title="src/hooks.ts"
import { securityHeaders } from "../ecosystem/hooks/security-headers/security-headers";

export const beforeRoute = [
  securityHeaders({
    contentSecurityPolicy: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.example.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  }),
];
```

## Options

- `contentSecurityPolicy`: an object of directive names to values. Not set by default. `false` turns it off.
- `strictTransportSecurity`: `{ maxAge, includeSubDomains, preload }`. Default `{ maxAge: 31536000, includeSubDomains: true }`; `preload` defaults to `false`.
- `frameOptions`: `"DENY"` or `"SAMEORIGIN"`. Default `"DENY"`.
- `contentTypeOptions`: `"nosniff"`. Default `"nosniff"`.
- `xssProtection`: `"0"`, `"1"`, or `"1; mode=block"`. Default `"1; mode=block"`.
- `referrerPolicy`: any standard referrer policy. Default `"no-referrer"`.
- `permissionsPolicy`: an object of feature names to allow lists. Not set by default. An empty list emits `feature=()`.
- `dnsPrefetchControl`: `"on"` or `"off"`. Default `"off"`.
- `downloadOptions`: `"noopen"`. Default `"noopen"`.
- `permittedCrossDomainPolicies`: `"none"`, `"master-only"`, `"by-content-type"`, `"by-ftp-filename"`, or `"all"`. Default `"none"`.

Every option also accepts `false` to leave that header out.

## Good to know

- `false` means "do not add this header". It does not remove a header that a handler or an earlier hook already set.
- There is no CSP unless you pass one. The default set covers HSTS, framing, MIME sniffing, referrer, DNS prefetch, downloads, and cross-domain policies.
- HSTS has an effect only over HTTPS. Browsers ignore it on plain HTTP.
- `strictSecurity()` asks for `preload`, but browsers only honor it after your domain is submitted to the HSTS preload list. Test a new CSP in the browser console before you enforce it.

## Related

- [Hooks & Plugins](/docs/ecosystem/hooks-plugins)
- [Global Hooks](/docs/hooks/global)
