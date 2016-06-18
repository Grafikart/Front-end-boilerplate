require('shelljs/global')
env.NODE_ENV = 'production'
var path = require('path')
var ora = require('ora')
var webpack = require('webpack')
var config = require('./config')
var webpack_config = require('./webpack.prod.conf')

var spinner = ora('building...')
var root = path.resolve(__dirname, '../')
spinner.start()

// On copie les fichiers / dossiers
for (directory of config.directories) {
  cp('-R', root + "/src/" + directory, root + '/dist')
}
for (file of config.files) {
  cp(root + "/src/" + file, root + '/dist/')
}

// Webpack
webpack(webpack_config, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
})
