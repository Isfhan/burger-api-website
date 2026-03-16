---
sidebar_label: CORS Middleware
---

# CORS Middleware

CORS middleware adds the appropriate `Access-Control-*` headers to responses (e.g. for browser cross-origin requests). Add it via the CLI:

```bash
burger-api add cors
```

Then import from `ecosystem/middleware/` and add it to `globalMiddleware` in your Burger config. See [Ecosystem Introduction](/docs/ecosystem/introduction) and [CLI Add](/docs/cli/add).
