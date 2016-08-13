# Tiny Mustache
The smallest implementation of Mustache template engine.

Only **390 bytes** gzipped.

## Features
- [x] variables
- [x] sections
- [x] inverted sections
- [x] lambdas
- [x] comments
- [x] partials
- [ ] variables dot notation
- [ ] set delimiter

## Usage

```javascript
var template = `Hello {{name}}!`
var context = {name: "world"}

mustache.call(context, template)
// => Hello world!
```
