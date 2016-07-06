var config = require('./webpack.base.conf')
var conf = require('./config')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractSASS = new ExtractTextPlugin('app.css')
var HtmlWebpackPlugin = require('html-webpack-plugin')


config.output.publicPath = ''
config.plugins = config.plugins.concat([
  extractSASS,
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
])

// On ajoute le HtmlWebppackPlugin pour extraire nos fichier HTML venant d'un fichier template (ici PUG)
var htmlPlugins = []

conf.extractsHtml.forEach((extract) => {
  htmlPlugins.push(
    new HtmlWebpackPlugin(extract)
  )
})

config.plugins = config.plugins.concat(htmlPlugins)

// On modifie le loader CSS
var css = [0, 1]
for(k in css){
  var cssLoaders = config.module.loaders[k].loaders
  config.module.loaders[k].loaders = null
  config.module.loaders[k].loader = extractSASS.extract(cssLoaders.slice(1, 10))
}

module.exports = config
