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
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
])

// On modifier le loader CSS
var cssLoaders = config.module.loaders[0].loaders
config.module.loaders[0].loaders = null
config.module.loaders[0].loader = extractSASS.extract(cssLoaders.slice(1, 10))

module.exports = config;
