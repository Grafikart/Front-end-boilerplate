const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const webpackBase = require('./webpack.base')
const config = require('./config')

webpackBase.plugins.push(
  new ProgressBarPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false
  }),
  new AssetsPlugin({
    filename: 'assets.json',
    path: config.assets_path
  })
)

module.exports = webpackBase
