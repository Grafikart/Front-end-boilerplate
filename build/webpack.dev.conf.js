var webpack = require('webpack')
var webpackConfig = require('./webpack.base.conf')
var config = require('./config')

// add hot-reload related code to entry chunks
Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name])
})
webpackConfig.devtool = '#eval-source-map'
webpackConfig.devServer = { headers: { "Access-Control-Allow-Origin": "*" }}
if(config.proxy){
  webpackConfig.output.publicPath = "http://localhost:" + config.port + webpackConfig.output.publicPath
}
webpackConfig.plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
].concat(webpackConfig.plugins)

module.exports = webpackConfig
