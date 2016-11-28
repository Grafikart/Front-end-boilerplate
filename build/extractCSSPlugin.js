var ExtractPlugin = require('extract-text-webpack-plugin')
var RawSource = require("webpack-sources").RawSource
var postcss  = require('postcss')

var SVGDeclarationHeader = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs>'
var SVGDeclarationFooter = '</defs></svg>'

function ExtractCSSPlugin() {
  ExtractPlugin.apply(this, arguments)
}

ExtractCSSPlugin.extract = ExtractPlugin.extract

ExtractCSSPlugin.prototype = Object.create(ExtractPlugin.prototype)

ExtractCSSPlugin.prototype.renderExtractedChunk = function(chunk) {
  var source = ExtractPlugin.prototype.renderExtractedChunk.call(this, chunk)
  
  // Merge all CSS
  var out = ""
  for (var i = 0; i < source.children.length; i++) {
    var raw = source.children[i].source()
    out += raw
  }

  // PostCSS
  out = postcss([ 
    require('css-mqpacker'),
    require('postcss-merge-rules'),
    require('csswring')
  ]).process(out)
  
  // Fake source
  source.children = [new RawSource(out)]
  return source
}

module.exports = ExtractCSSPlugin
