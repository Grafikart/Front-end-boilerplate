var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('./webpack.base.conf')

config.module.loaders.push({
  test: /\.scss$/,
  loaders: ['style', 'css', 'sass']
})

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin()
)

module.exports = config
