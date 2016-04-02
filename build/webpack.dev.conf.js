var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('./webpack.base.conf')

config.devtool = '#eval-source-map'
config.module.loaders.push({
  test: /\.scss$/,
  loaders: ['style', 'css', 'sass']
})

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
].concat(config.plugins)

module.exports = config
