'use strict'
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.dev')
const compiler = webpack(config)
const hotMiddleware = require('webpack-hot-middleware')(compiler)
const chokidar = require('chokidar')

// Force le rafraichissement du navigateur
let refresh = function (path) {
    console.log('* ' + path + ' changed')
    hotMiddleware.publish({action: 'reload'})
}

let server = new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: false,
  quiet: false,
  noInfo: true,
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 50
  },
  stats: {colors: true}
})
server.use(hotMiddleware)
server.listen(3003, function (err) {
  if (err) {
    console.log(err)
    return
  }
  chokidar.watch(config.refresh).on('change', refresh)
  console.log('==> Listening on http://localhost:3003')
})