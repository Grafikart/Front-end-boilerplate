var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('./webpack.base.conf')

// add hot-reload related code to entry chunks
Object.keys(config.entry).forEach(function (name) {
  config.entry[name] = ['./build/dev-client'].concat(config.entry[name])
})

config.devtool = '#eval-source-map'

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
].concat(config.plugins)

module.exports = config
