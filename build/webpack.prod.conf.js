var config = require('./webpack.base.conf')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractSASS = new ExtractTextPlugin('app.css')

config.output.publicPath = ''
config.plugins = config.plugins.concat([
  extractSASS,
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
])

// On modifier le loader CSS
var css = [0, 1]
for(k in css){
  var cssLoaders = config.module.loaders[k].loaders
  config.module.loaders[k].loaders = null
  config.module.loaders[k].loader = extractSASS.extract(cssLoaders.slice(1, 10))
}

module.exports = config;
