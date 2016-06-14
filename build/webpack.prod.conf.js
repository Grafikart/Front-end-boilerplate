var config = require('./webpack.base.conf')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractSASS = new ExtractTextPlugin('app.css')

config.plugins = config.plugins.concat([
  extractSASS,
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: {
      warnings: false,
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
])

// On modifie le loader CSS
// Fournir la liste des index des loaders
var css = [0, 1]
for(k in css){
  var idx = css[k]
  var cssLoaders = config.module.loaders[idx].loaders
  config.module.loaders[idx].loaders = null
  config.module.loaders[idx].loader = extractSASS.extract(cssLoaders.slice(1, 10))
}

module.exports = config;
