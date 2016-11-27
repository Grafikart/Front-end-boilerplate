'use strict'
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const webpack_base = require('./webpack.base')
const config = require('./config')

webpack_base.devtool = false
webpack_base.output.filename = '[name].[chunkhash:8].js'
webpack_base.plugins.push(
  new ProgressBarPlugin(),
  new ExtractTextPlugin('[name].[contenthash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  /* 
  TODO: Fix this
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false
  }),
  */
  new AssetsPlugin({filename: config.assets_path + 'assets.json'})
)

// On extrait le CSS
let vuePlugin = webpack_base.plugins[0].options.options.vue
let vuePluginSCSSLoader = vuePlugin.loaders.scss
vuePluginSCSSLoader.shift()

vuePlugin.loaders.scss = ExtractTextPlugin.extract({
  loader: vuePluginSCSSLoader
})

webpack_base.module.rules.forEach(function (rule, k) {
  
  if (".scss".match(rule.test)) {
    rule.loader.shift()
    webpack_base.module.rules[k].loader = ExtractTextPlugin.extract({
      loader: rule.loader
    })
  }

})

module.exports = webpack_base
