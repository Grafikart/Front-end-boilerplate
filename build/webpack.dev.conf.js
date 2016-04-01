var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('./webpack.base.conf')

Object.keys(config.entry).forEach(function (name) {
  config.entry[name] = ['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server'].concat(config.entry[name])
})

config.module.loaders.push({
  test: /\.scss$/,
  loaders: ['style', 'css', 'sass']
})

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin()
)

module.exports = config
