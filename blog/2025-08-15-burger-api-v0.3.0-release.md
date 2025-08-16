---
slug: burger-api-v0.3.0-release
title: BurgerAPI v0.3.0 Released 
authors: [isfhan]
tags: [release, framework, zod, validation]
---

We're excited to announce the release of **BurgerAPI v0.3.0**! This update brings significant improvements to our request validation system and dependency management.

{/* truncate */}

## 🚀 What's New in v0.3.0

### Version 0.3.0 (August 15, 2025)

    -   Updated Zod version from 3.x to 4.x
    -   Updated built-in request validation middleware to use Zod 4
    -   Updated and better request validation middleware error handling
    -   Removed Zod-to-json-schema dependency and use Zod 4 directly

## 🔧 Breaking Changes

This update includes breaking changes due to the Zod 4 upgrade. While we've tried to make the transition as smooth as possible, there's one important change that users need to be aware of: **the error response format has changed**.

### Error Response Format Change

**Before (Zod 3.x):**
```json
{
  "errors": [
    {
      "field": "body",
      "error": {
        "issues": [
          {
            "code": "invalid_type",
            "expected": "string",
            "received": "number",
            "path": ["name"],
            "message": "Expected string, received number"
          },
          {
            "code": "too_small",
            "minimum": 0,
            "type": "number",
            "inclusive": false,
            "exact": false,
            "message": "Price must be positive",
            "path": ["price"]
          }
        ],
        "name": "ZodError"
      }
    },
    {
      "field": "query",
      "error": {
        "issues": [
          {
            "code": "invalid_type",
            "expected": "number",
            "received": "string",
            "path": ["page"],
            "message": "Expected number, received string"
          }
        ],
        "name": "ZodError"
      }
    },
    {
      "field": "params",
      "error": {
        "issues": [
          {
            "code": "too_short",
            "minimum": 3,
            "path": ["id"],
            "message": "String must contain at least 3 character(s)"
          }
        ],
        "name": "ZodError"
      }
    }
  ]
}
```

**After (Zod 4.x):**
```json
{
  "errors": {
    "body": [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": ["name"],
        "message": "Invalid input: expected string, received number"
      },
      {
        "origin": "number",
        "code": "too_small",
        "minimum": 0,
        "inclusive": false,
        "path": ["price"],
        "message": "Price must be positive"
      }
    ],
    "query": [
      {
        "expected": "number",
        "code": "invalid_type",
        "path": ["page"],
        "message": "Invalid input: expected number, received string"
      }
    ],
    "params": [
      {
        "expected": "string",
        "code": "too_short",
        "minimum": 3,
        "path": ["id"],
        "message": "String must contain at least 3 character(s)"
      }
    ]
  }
}
```

### What Changed?

- **Structure**: The `errors` field now contains an object with `body`, `query`, and `params` keys instead of an array
- **Simplified Format**: Removed the nested `error.issues` structure for cleaner, more direct access
- **Better Organization**: Errors are now grouped by their source (body, query, or params)
- **Cleaner Messages**: Zod 4 provides more user-friendly error messages

### Migration Steps

If you're currently handling validation errors in your frontend or API consumers, you'll need to update your error handling logic to work with the new format. The new structure is actually more intuitive and easier to work with!


## 🎯 What This Means for You

- **No More Nested Loops**: Direct access to `response.errors.body`, `response.errors.query`, `response.errors.params`
- **Type Safety**: Clear structure makes it easier to write type-safe error handling
- **Better Performance**: No need to iterate through arrays and check for null values
- **Cleaner Code**: More readable and maintainable error handling logic
- **Consistent Structure**: All error types follow the same pattern
- **Better Performance**: Zod 4 brings improved performance and smaller bundle sizes
- **Enhanced Validation**: More robust error handling in request validation middleware
- **Cleaner Dependencies**: Removed unnecessary Zod-to-json-schema dependency
- **Future-Proof**: Stay up-to-date with the latest Zod features and improvements

## 📚 Documentation

For detailed information about the new validation features, check out our [validation documentation](/docs/request-handling/validation).

## 🤝 Community

We'd love to hear your feedback on this release! Join our community discussions and let us know what you think.

---

*Stay tuned for more updates and happy coding with BurgerAPI! 🍔*
