---
sidebar_label: Params Validation
---

# Params Validation

Validate **path parameters** (e.g. from dynamic routes like `[id]`) by defining a `params` schema for the method in your route’s `schema` object. BurgerAPI runs validation before the handler; validated params are on `req.validated.params`.

See [Schema Definition](/docs/validation/schema) and the full [Validation](/docs/request-handling/validation) guide for examples.
