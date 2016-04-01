var webpack = require('webpack')
var config = require('./webpack.dev.conf.js')
var WebpackDevServer = require('webpack-dev-server')
var port = 8080
var compiler = webpack(config)

var server = new WebpackDevServer(compiler, {
  contentBase: "./",
  hot: true,
  historyApiFallback: false,
  proxy: {
    // "*": "http://isitweekendyet.com"
  },
  quiet: false,
  noInfo: false,
  publicPath: "/dist/",
  stats: { colors: true }
})

server.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
