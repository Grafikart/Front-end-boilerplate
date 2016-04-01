var config = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractSASS = new ExtractTextPlugin('app.css')
var webpack = require('webpack')

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

config.module.loaders = config.module.loaders.concat([{
  test: /\.scss$/,
  loader: extractSASS.extract(['css', 'sass'])
}])

module.exports = config;
