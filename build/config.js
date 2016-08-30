const path = require('path')

module.exports = {
  entry: {
    app: [path.join(__dirname, '../css/app.scss'), path.join(__dirname, '../js/app.js')]
  },
  port: 3003,
  html: true,
  assets_url: '/',  // Urls dans le fichier final
  assets_path: './dist/' // ou build ?
}
