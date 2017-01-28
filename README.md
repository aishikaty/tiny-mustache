# Tiny Mustache
The smallest implementation of [Mustache](https://mustache.github.io/) template engine.

Only **446 bytes** gzipped.

## Usage

```javascript
mustache("Hello {{name}}!", {name: "world"})
// => Hello world!
```

## Features
- [x] variables `{{escaped}}`, `{{&unescaped}}`, `{{{unescaped}}}`
- [x] sections `{{#section}}`
- [x] inverted sections `{{^inverted}}`
- [x] lambdas `{{#lambda}}`
- [x] comments `{{!comment}}`
- [x] partials `{{>partial}}`
- [x] variables dot notation `{{obj.prop}}`
- [x] tests

## Not implemented
- set delimiter `{{=<% %>=}}`

