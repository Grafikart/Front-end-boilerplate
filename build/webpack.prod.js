'use strict'
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const webpack_base = require('./webpack.base')
const config = require('./config')

webpack_base.plugins.push(
  new ProgressBarPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false
  }),
  new AssetsPlugin({filename: config.assets_path + 'assets.json'})
)

module.exports = webpack_base
