---
sidebar_label: JWT Auth
---

# JWT Auth Middleware

JWT auth middleware validates JSON Web Tokens (e.g. from `Authorization` header) and can attach user info to the request. Add it with:

```bash
burger-api add jwt-auth
```

Import from `ecosystem/middleware/` and add to `globalMiddleware` or use as route-specific middleware. See [Ecosystem Introduction](/docs/ecosystem/introduction) and [CLI Add](/docs/cli/add).
