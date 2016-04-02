var webpack = require('webpack')
var config = require('./webpack.dev.conf.js')
var WebpackDevServer = require('webpack-dev-server')
var port = 3003
var compiler = webpack(config)

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

var server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: "./",
  historyApiFallback: false,
  /*
  proxy: {
    "*": {
      target: "http://monsite.fr/...",
      changeOrigin: true
    }
  },
  */
  quiet: false,
  noInfo: false,
  publicPath: config.output.publicPath,
  stats: { colors: true }
})

server.use(hotMiddleware)

server.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
