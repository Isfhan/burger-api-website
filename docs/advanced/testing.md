---
sidebar_label: Testing
---

# Testing

You can test routes without starting a server or opening a port. Build the app, get its fetch handler, and pass real `Request` objects to it.

```ts
const handler = await app.fetchHandler();

const res = await handler(new Request("http://localhost/api/hello"));
```

`fetchHandler()` runs the same routes and request lifecycle as the server, without a port.

Tests use `bun test`. Put them in `test/` and name them `*.test.ts`.

## Build the app in the test

Do not import `src/index.ts` in a test: it calls `serve()` and opens a port. Build the same app without the server:

```ts title="test/helpers.ts"
import { Burger } from "burger-api";

export async function createHandler() {
  const app = new Burger({
    apiDir: "./src/api",
    apiPrefix: "/api",
  });

  return app.fetchHandler();
}
```

Run `bun test` from the project root, where `./src/api` resolves. Create the handler once per test file and reuse it.

## Test a GET route

```ts title="src/api/hello/route.ts"
export function GET() {
  return Response.json({ message: "Hello, world!" });
}
```

```ts title="test/hello.test.ts"
import { expect, test } from "bun:test";
import { createHandler } from "./helpers";

const handler = await createHandler();

test("GET /api/hello returns JSON", async () => {
  const res = await handler(new Request("http://localhost/api/hello"));

  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ message: "Hello, world!" });
});
```

The request URL needs a host, but the host is not used. Only the method and path reach the router.

## Test a POST with validation

```ts title="src/api/notes/schema.ts"
import { z } from "zod";
import type { MethodSchema } from "burger-api";

export const POST = {
  body: z.object({
    name: z.string().min(1),
  }),
} satisfies MethodSchema;
```

```ts title="src/api/notes/route.ts"
import { defineRoute } from "burger-api";
import { POST as PostSchema } from "./schema";

export const POST = defineRoute(PostSchema, (ctx) => {
  return Response.json({ name: ctx.validated.body.name }, { status: 201 });
});
```

```ts title="test/notes.test.ts"
import { expect, test } from "bun:test";
import { createHandler } from "./helpers";

const handler = await createHandler();

test("POST /api/notes creates a note", async () => {
  const res = await handler(
    new Request("http://localhost/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Groceries" }),
    })
  );

  expect(res.status).toBe(201);
  expect(await res.json()).toEqual({ name: "Groceries" });
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

A failed body schema returns `422` with an RFC 9457 Problem Details body. See [Validation Errors](/docs/validation/errors).

## Test a route behind an auth plugin

For a focused test, build a small app from the handler you want to test. When you pass `apiRoutes`, the app does not scan the filesystem; you supply the routes, plugins, and providers.

Add the plugin first:

```bash
burger-api add api-key
```

```ts title="src/api/secret/route.ts"
export function GET() {
  return Response.json({ ok: true });
}
```

```ts title="test/secret.test.ts"
import { expect, test } from "bun:test";
import { Burger } from "burger-api";
import type { PluginRegistrar } from "burger-api";
import { apiKey } from "../ecosystem/plugins/api-key/api-key";
import { GET } from "../src/api/secret/route";

const app = new Burger({
  apiRoutes: [{ path: "/api/secret", handlers: { GET } }],
  pluginsModule: {
    default: (burger: PluginRegistrar) =>
      burger.usePlugin(apiKey({ keys: ["test-key"] })),
  },
});

const handler = await app.fetchHandler();

test("rejects a request without a key", async () => {
  const res = await handler(new Request("http://localhost/api/secret"));

  expect(res.status).toBe(401);
});

test("accepts a valid key", async () => {
  const res = await handler(
    new Request("http://localhost/api/secret", {
      headers: { "X-API-Key": "test-key" },
    })
  );

  expect(res.status).toBe(200);
});
```

If a route validates input, add its `schema` to the `apiRoutes` entry too.

## Swap a provider for a fake

Use `providersModule` to register a fake service in place of `src/providers.ts`:

```ts title="test/fake-service.test.ts"
import { expect, test } from "bun:test";
import { Burger } from "burger-api";
import type { ProviderRegistrar } from "burger-api";
import { GET } from "../src/api/users/route";

const fakeDb = {
  listUsers: async () => [{ id: 99, name: "Test User" }],
};

const app = new Burger({
  apiRoutes: [{ path: "/api/users", handlers: { GET } }],
  providersModule: {
    default: (burger: ProviderRegistrar) => burger.provide("db", fakeDb),
  },
});

const handler = await app.fetchHandler();

test("reads users from the fake db", async () => {
  const res = await handler(new Request("http://localhost/api/users"));

  expect(await res.json()).toEqual({
    users: [{ id: 99, name: "Test User" }],
  });
});
```

The fake only needs the methods your route calls. See [Providers](/docs/core-concepts/providers) for how the real service is registered.

## Run the tests

```bash
bun test
```

Bun runs every `*.test.ts` file it finds. If a response has an unexpected status, log the body with `await res.text()` to see the error.

## Related

- [Providers](/docs/core-concepts/providers)
- [Validation](/docs/core-concepts/validation)
- [Hooks and Plugins](/docs/ecosystem/hooks-plugins)
- [Configuration](/docs/core/configuration)
