/** @version 0.4.0 */
function mustache(template, self, parent, invert) {
  var render = mustache
  var output = ""
  var i

  function get (ctx, path) {
    path = path.pop ? path : path.split(".")
    ctx = ctx[path.shift()] || ""
    return (0 in path) ? get(ctx, path) : ctx
  }

  self = Array.isArray(self) ? self : (self ? [self] : [])
  self = invert ? (0 in self) ? [] : [1] : self
  
  for (i = 0; i < self.length; i++) {
    var childCode = ''
    var depth = 0
    var inverted
    var ctx = (typeof self[i] == "object") ? self[i] : {}
    ctx.prototype = parent
    ctx[""] = {"": self[i]}
    
    template.replace(/([\s\S]*?)({{((\/)|(\^)|#)(.*?)}}|$)/g,
      function(match, code, y, z, close, invert, name) {
        if (!depth) {
          output += code.replace(/{{{(.*?)}}}|{{(!?)(&?)(>?)(.*?)}}/g,
            function(match, raw, comment, isRaw, partial, name) {
              return raw ? get(ctx, raw)
                : isRaw ? get(ctx, name)
                : partial ? render(get(ctx, name), ctx)
                : !comment ? new Option(get(ctx, name)).innerHTML
                : ""
            }
          )
          inverted = invert
        } else {
          childCode += depth && !close || depth > 1 ? match : code
        }
        if (close) {
          if (!--depth) {
            name = get(ctx, name)
            if (/^f/.test(typeof name)) {
              output += name.call(ctx, childCode, function (template) {
                return render(template, ctx)
              })
            } else {
              output += render(childCode, name, ctx, inverted) 
            }
            childCode = ""
          }
        } else {
          ++depth
        }
      }
    )
  }
  return output
}
