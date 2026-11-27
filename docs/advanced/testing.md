---
sidebar_label: Testing
---

# Testing

Test routes without a server. Build the app, get its fetch handler, and send it real `Request` objects. It runs the same routes and hooks as the server.

Use `bun test`. Put tests in `test/` and name them `*.test.ts`.

## Build the app in the test

Do not import `src/index.ts` in a test: it starts the server. Build the app in a helper instead:

```ts title="test/helpers.ts"
import { Burger } from "burger-api";

export async function createHandler() {
  const app = new Burger({ apiDir: "./src/api", apiPrefix: "/api" });
  return app.fetchHandler();
}
```

Run `bun test` from the project root, so `./src/api` resolves.

## Test a route

```ts title="test/notes.test.ts"
import { expect, test } from "bun:test";
import { createHandler } from "./helpers";

const handler = await createHandler();

test("GET /api/hello returns JSON", async () => {
  const res = await handler(new Request("http://localhost/api/hello"));

  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ message: "Hello, world!" });
});

test("POST /api/notes rejects an empty name with 422", async () => {
  const res = await handler(
    new Request("http://localhost/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "" }),
    })
  );

  expect(res.status).toBe(422);
});
```

These tests assume a `hello` route and a `notes` route with a `body` schema. The URL needs a host, but only the method and path matter.

## Test with a plugin or a fake service

For a focused test, pass the routes yourself with `apiRoutes`. Then the app does not scan files. Add plugins with `pluginsModule` and fake services with `providersModule`:

```ts title="test/secret.test.ts"
import { expect, test } from "bun:test";
import { Burger } from "burger-api";
import type { PluginRegistrar, ProviderRegistrar } from "burger-api";
import { apiKey } from "../ecosystem/plugins/api-key/api-key";
import { GET } from "../src/api/users/route";

const app = new Burger({
  apiRoutes: [{ path: "/api/users", handlers: { GET } }],
  pluginsModule: {
    default: (burger: PluginRegistrar) =>
      burger.usePlugin(apiKey({ keys: ["test-key"] })),
  },
  providersModule: {
    default: (burger: ProviderRegistrar) =>
      burger.provide("db", { listUsers: async () => [{ id: 99, name: "Test User" }] }),
  },
});

const handler = await app.fetchHandler();

test("rejects a request without a key", async () => {
  const res = await handler(new Request("http://localhost/api/users"));
  expect(res.status).toBe(401);
});

test("reads users from the fake db", async () => {
  const res = await handler(
    new Request("http://localhost/api/users", { headers: { "X-API-Key": "test-key" } })
  );
  expect(res.status).toBe(200);
});
```

If the route validates input, add its `schema` to the `apiRoutes` entry too.

If a test fails with an unexpected status, log `await res.text()` to see the error.

## Related

- [Providers](/docs/core-concepts/providers)
- [Validation](/docs/core-concepts/validation)
- [Hooks and Plugins](/docs/ecosystem/hooks-plugins)
- [Configuration](/docs/core/configuration)
