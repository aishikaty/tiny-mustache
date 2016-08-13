function mustache(template, parent, invert) {
  var self = this
  var render = mustache
  var output = ""
  var i
  
  self = Array.isArray(self) ? self : self ? [self] : []
  self = invert ? self.length ? [] : [0] : self
  
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
                : partial ? render.call(ctx, ctx[name] || "")
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
              output += ctx[name].call(ctx, childCode, render.bind(ctx))
            } else {
              output += render.call(ctx[name], childCode, ctx, inverted) 
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
