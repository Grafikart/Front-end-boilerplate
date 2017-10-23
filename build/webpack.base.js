const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const ExtractCSSPlugin = require('./extractCSSPlugin')

let webpackBase = {
  devtool: config.debug ? 'cheap-module-eval-source-map' : false,
  entry: config.entry,
  output: {
    path: config.assets_path,
    filename: config.debug ? '[name].js' : '[name].[chunkhash:8].js',
    publicPath: config.assets_url
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../js'),
      components: path.join(__dirname, '../js/components'),
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      // Linters
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/],
        enforce: 'pre'
      },
      // Loaders
      {
        test: /\.js$/,
        exclude: [/node_modules/, /libs/],
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        exclude: [/node_modules/],
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractCSSPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractCSSPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }, {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10,
            name: '[name].[hash:7].[ext]'
          }
        }]
      }, {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      faker: 'faker'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        },
        vue: {
          loaders: {
            scss: ExtractCSSPlugin.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader', 'postcss-loader', 'sass-loader']
            }),
            js: 'babel-loader'
          }
        }
      }
    }),
    new ExtractCSSPlugin({
      filename: '[name].[contenthash:8].css',
      disable: config.debug
    }),
    // new FriendlyErrorsWebpackPlugin()
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  performance: {
    hints: config.debug ? false : 'warning'
  }
}

if (config.html) {
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const glob = require('glob')
  const files = glob.sync('*.ejs')
  files.forEach(file => {
    webpackBase.plugins.push(
      new HtmlWebpackPlugin({
        filename: file.replace('.ejs', '.html'),
        template: file,
        inject: true
      })
    )
  })
}

module.exports = webpackBase
