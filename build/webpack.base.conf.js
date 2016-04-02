var path = require('path')
var root = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: ['./css/app.scss', './js/app.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.coffee', '.css', '.scss'],
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: root,
        exclude: /(node_modules|libs)/
      }
    ],
    loaders: [
      {
        test: /\.coffee$/,
        loader: 'coffee',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: root,
        exclude: /node_modules/
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
    formatter: require('eslint-friendly-formatter')
  }
}
