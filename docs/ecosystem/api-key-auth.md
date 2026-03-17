---
sidebar_label: API Key Auth
---

# API Key Auth Middleware

API key auth middleware checks for an API key (e.g. in a header or query) and returns 401 if missing or invalid. Add it with:

```bash
burger-api add api-key-auth
```

Import from `ecosystem/middleware/` and add to `globalMiddleware` or route-specific middleware. See [Ecosystem Introduction](/docs/ecosystem/introduction) and [CLI Add](/docs/cli/add).
