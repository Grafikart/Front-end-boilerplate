// Variables
const outputPath = './dist'
const assetPath = './src'
const dev = process.env.NODE_ENV !== 'production'

// Dependencies
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ImageminPlugin = require('imagemin-webpack-plugin').default
const ManifestPlugin = require('webpack-manifest-plugin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const extractCSS = new ExtractTextPlugin({
  filename: 'main.css',
  disable: dev
})
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Load configuration from a .env
// require('dotenv').config({path: path.resolve(process.cwd(), '.env')})

// The brain
const config = {
  entry: {
    main: [`${assetPath}/css/main.scss`, `${assetPath}/js/main.js`]
  },
  mode: dev ? 'development' : 'production',
  // devtool: dev ? 'cheap-module-eval-source-map' : false,
  externals: {
    // jquery: 'jQuery'
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    overlay: true,
    clientLogLevel: 'warning'
    // host: 0.0.0.0
  },
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: '[name].js',
    publicPath: dev ? `http://localhost:8080/` : '/'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
    alias: {
      '~': path.resolve('node_modules')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: !dev,
                sourceMap: dev
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: dev
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: dev
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: `[name]${dev ? '' : '.[hash]'}.[ext]`,
            useRelativePath: !dev
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({inject: true, template: 'index.html'}),
    extractCSS,
    new ImageminPlugin({
      disable: dev,
      pngquant: {
        quality: '95-100'
      },
      jpegtran: false,
      plugins: [
        imageminMozjpeg({
          quality: 90,
          progressive: true
        })
      ]
    })
  ]
}

// Env specific plugins
if (dev) {
  config.plugins.push(new BundleAnalyzerPlugin({openAnalyzer: false}))// default port 8888
} else {
  config.plugins.push(new ManifestPlugin())
}

module.exports = config
