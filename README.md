# Tiny Mustache
The smallest implementation of [Mustache](https://mustache.github.io/) template engine.

Only **436 bytes** gzipped.

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

## Browser support
This library works in every modern browser. To use it in IE you will need a [polyfill for `Object.assign()`](https://github.com/rubennorte/es6-object-assign).
