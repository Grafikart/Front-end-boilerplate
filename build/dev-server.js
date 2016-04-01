var webpack = require('webpack')
var config = require('./webpack.dev.conf.js')
var WebpackDevServer = require('webpack-dev-server')
var port = 3003
Object.keys(config.entry).forEach(function (name) {
  config.entry[name] = ['webpack-dev-server/client?http://localhost:' + port + '/', 'webpack/hot/dev-server'].concat(config.entry[name])
})
var compiler = webpack(config)


var server = new WebpackDevServer(compiler, {
  contentBase: "./",
  hot: true,
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

server.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
