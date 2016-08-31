/** @version 0.3.0 */
function mustache(template, self, parent, invert) {
  var render = mustache
  var output = ""
  var i

  self = Array.isArray(self) ? self : (self ? [self] : [])
  self = invert ? self.length ? [] : [1] : self
  
  for (i = 0; i < self.length; i++) {
    var childCode = ''
    var depth = 0
    var inverted
    var ctx = (typeof self[i] == "object") ? self[i] : {}
    ctx.prototype = parent
    ctx["."] = self[i]
    
    template.replace(/([\s\S]*?)({{((\/)|(\^)|#)(.*?)}}|$)/g,
      function(match, code, y, z, close, invert, name) {
        if (!depth) {
          output += code.replace(/{{{(.*?)}}}|{{(!?)(&?)(>?)(.*?)}}/g,
            function(match, raw, comment, isRaw, partial, name) {
              return raw ? ctx[raw] || ""
                : isRaw ? ctx[name] || ""
                : partial ? render(ctx[name] || "", ctx)
                : !comment ? new Option(ctx[name] || "").innerHTML
                : ""
            }
          )
          inverted = invert
        } else {
          childCode += depth && !close || depth > 1 ? match : code
        }
        if (close) {
          if (!--depth) {
            if (/^f/.test(typeof ctx[name])) {
              output += ctx[name].call(ctx, childCode, function (template) {
                return render(template, ctx)
              })
            } else {
              output += render(childCode, ctx[name], ctx, inverted) 
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
