'use strict'
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackDev = require('./webpack.dev')
const config = require('./config')
const compiler = webpack(webpackDev)
const hotMiddleware = require('webpack-hot-middleware')(compiler)
const chokidar = require('chokidar')

// Force le rafraichissement du navigateur
let refresh = function (path) {
  console.log('* ' + path + ' changed')
  hotMiddleware.publish({action: 'reload'})
}

let server = new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: config.historyApiFallback,
  quiet: true,
  noInfo: false,
  publicPath: webpackDev.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
})
server.use(hotMiddleware)
server.listen(config.port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  chokidar.watch(config.refresh).on('change', refresh)
  console.log('==> Listening on http://localhost:' + config.port)
})
