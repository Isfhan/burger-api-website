---
sidebar_label: Available Middleware
---

# Available Middleware

The BurgerAPI ecosystem provides middleware you can add with the CLI. List what’s available and add what you need:

```bash
burger-api list
burger-api add cors
burger-api add cors logger rate-limiter
```

Middleware is copied to `ecosystem/middleware/`; import it in your entry and pass to `globalMiddleware` or use per-route. See [Ecosystem Introduction](/docs/ecosystem/introduction) and [CLI Add](/docs/cli/add).
