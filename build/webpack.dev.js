const path = require('path')
const webpack = require('webpack')
const webpackBase = require('./webpack.base')
const config = require('./config')

webpackBase.output.publicPath = 'http://localhost:' + config.port + config.assets_url
webpackBase.output.path = '/tmp/'
for (var name in webpackBase.entry) {
  webpackBase.entry[name] = [path.resolve(__dirname, './server-client'), ...webpackBase.entry[name]]
}
webpackBase.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  // new webpack.NoErrorsPlugin()
)

module.exports = webpackBase
