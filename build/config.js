const path = require('path')

module.exports = {
  entry: {
    app: [path.join(__dirname, '../css/app.scss'), path.join(__dirname, '../js/app.js')]
  },
  port: 3003,
  assets_url: '/assets/',
  assets_path: './dist/assets/'
}
