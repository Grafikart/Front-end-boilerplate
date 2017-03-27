'use strict'
const path = require('path')
const webpack = require('webpack')
const config = require('./config')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ExtractCSSPlugin = require('./extractCSSPlugin')
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const postcss = {
  plugins: [
    require('autoprefixer')({
      browsers: config.browsers
    })
  ]
}

let webpack_base = {
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
      {
        test: /\.(ts|tsx)$/,
        loader: 'tslint-loader',
        exclude: [/node_modules/],
        enforce: 'pre'
      },
      // Loaders
      {
        test: /\.(ts|tsx)$/,
        use: ['./build/vue-ts-loader', 'awesome-typescript-loader']
      },
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
        use:ExtractCSSPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractCSSPlugin.extract({
          fallback: "style-loader",
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
        }],

      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: postcss,
        tslint: {
          emitErrors: true,
          failOnHint: true
        },
        vue: {
          loaders: {
            scss: ExtractCSSPlugin.extract({
              fallback: "vue-style-loader",
              use: ['css-loader', 'postcss-loader', 'sass-loader']
            }),
            js: 'babel-loader'
          },
          postcss: postcss
        }
      }
    }),
    new ExtractCSSPlugin({
      filename: '[name].[contenthash:8].css',
      disable: config.debug
    }),
    /*
    * Plugin: ForkCheckerPlugin
    * Description: Do type checking in a separate process, so webpack don't need to wait.
    *
    * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
    */
    new CheckerPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  performance: {
    hints: config.debug ? false : 'warning'
  }
}

if (config.stylelint) {
  webpack_base.plugins.push(
    new StyleLintPlugin({
      files: config.stylelint
    })
  )
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
