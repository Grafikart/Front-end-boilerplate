'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const postcss = [
  require('autoprefixer')({
    browsers: ['last 2 versions', 'ie > 8']
  })
]

module.exports = {
  entry: {
    app: [path.join(__dirname, '../css/app.scss'), path.join(__dirname, '../js/app.js')]
  },
  output: {
    path: './public/assets/',
    filename: '[name].js',
    publicPath: '/assets/'
  },
  refresh: ['index.html'], // Permet de forcer le rafraichissement du navigateur lors de la modification de ces fichiers
  resolve: {
    extensions: ['', '.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../js'),
      components: path.join(__dirname, '../js/components')
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: [/node_modules/,/libs/]
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loaders: ['vue']
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/, /libs/]
      },
      {
        test: /\.scss$/,
        vue: 'scss',
        loaders: ['css', 'sass']
      },
      {
        test: /\.css$/,
        loaders: ['css']
      }, {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  babel: {
    babelrc: false,
    presets: [
      'es2015',
      'stage-2'
    ],
    plugins: ["transform-runtime"]
  },
  postcss,
  vue: {
    loaders: {},
    postcss
  },
  plugins: [],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  }
}
