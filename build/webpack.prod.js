'use strict'
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const config = require('./webpack.base')

config.devtool = false
config.output.filename = '[name].[chunkhash:8].js'
config.plugins.push(
  new ProgressBarPlugin(),
  new ExtractTextPlugin('[name].[contenthash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false
  }),
  new AssetsPlugin({filename: './public/assets/assets.json'})
)

// On extrait le CSS
config.module.loaders.forEach(function (loader) {
  if (loader.vue) {
    config.vue.loaders[loader.vue] = ExtractTextPlugin.extract(loader.loaders)
  }
  if (loader.loaders && loader.loaders.includes('css')) {
    loader.loader = ExtractTextPlugin.extract(loader.loaders)
    delete loader['loaders']
  }
})

module.exports = config
