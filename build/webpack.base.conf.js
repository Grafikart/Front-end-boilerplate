var path = require('path')
var root = path.resolve(__dirname, '../')
var autoprefixer = require('autoprefixer')
var conf = require('./config')

module.exports = {
  entry: conf.entry,
  output: conf.output,
  resolve: {
    extensions: ['', '.js', '.vue', '.coffee', '.css', '.scss', '.ts'],
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /(node_modules|libs)/
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /\.pug$/,
        include: root,
        loader: 'pug-static'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: root,
        exclude: /node_modules|libs/
      },
      {
        test: /\.ts$/,
        loader: 'ts',
        include: root,
        exclude: /node_modules|libs/
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name]-[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [],
  eslint: {
    configFile: path.resolve(root, './.eslintrc'),
    formatter: require('eslint-friendly-formatter')
  },
  postcss: function () {
      return [autoprefixer({browsers: conf.support})];
  },
  pug: {
    pretty: true,
    locals: { foo: 'bar' }
  }
}
