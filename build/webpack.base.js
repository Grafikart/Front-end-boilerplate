'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('./config')

const postcss = {
  plugins: [
    require('autoprefixer')({
      browsers: config.browsers
    })
  ]
}

let webpack_base = {
  entry: config.entry,
  output: {
    path: config.assets_path,
    filename: '[name].js',
    publicPath: config.assets_url
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../js'),
      components: path.join(__dirname, '../js/components'),
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/],
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/,/libs/],
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: ['vue-loader']
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /libs/],
        loader: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              'es2015-webpack',
              'stage-2'
            ],
            plugins: ["transform-runtime"]
          }
        }]
      },
      {
        test: /\.scss$/,
        loader: [
          'style-loader',
          'css-loader', 
          'postcss-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: ['css-loader', 'postcss-loader']
      }, {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        loader: [{
          loader: 'url-loader',
          query: {
            limit: 10,
            name: '[name].[hash:7].[ext]'
          }
        }],
        
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: postcss,
        vue: {
          loaders: {
            scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
          },
          postcss: postcss
        }
      }
    })
  ],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  }
}

if (config.html) {
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  webpack_base.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  )
}

module.exports = webpack_base
