# Tiny Mustache
The smallest implementation of Mustache template engine.

Only **390 bytes** gzipped.

## Features
- [x] variables `{{escaped}}`, `{{&unescaped}}`, `{{{unescaped}}}`
- [x] sections `{{#section}}`
- [x] inverted sections `{{^inverted}}`
- [x] lambdas `{{#lambda}}`
- [x] comments `{{!comment}}`
- [x] partials `{{>partial}}`
- [x] tests
- [x] variables dot notation `{{obj.prop}}`
- [ ] set delimiter `{{=<% %>=}}`

## Usage

```javascript
var template = `Hello {{name}}!`
var context = {name: "world"}

mustache(template, context)
// => Hello world!
```
