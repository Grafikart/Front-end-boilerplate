'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base')

config.devtool = 'cheap-module-eval-source-map'
config.output.publicPath = 'http://localhost:3003/assets/'
config.output.path = '/tmp/'
for (var name in config.entry) {
  config.entry[name] = [path.resolve(__dirname, './server-client'), ...config.entry[name]]
}
config.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
)

config.module.loaders.forEach(function (loader) {
  if (loader.vue) {
    config.vue.loaders[loader.vue] = 'vue-style-loader!' + loader.loaders.join('-loader!') + '-loader'
  }
  if (loader.loaders && loader.loaders.includes('css')) {
    loader.loaders = ['style', ...loader.loaders]
  }
})

module.exports = config
