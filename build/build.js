require('shelljs/global')
env.NODE_ENV = 'production'
var ora = require('ora')
var webpack = require('webpack')
var config = require('./webpack.prod.conf')

var spinner = ora('building...')
spinner.start()
rm('-rf', config.output.path)

webpack(config, function (err, stats) {
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
