module.exports = {
  entry: {
    app: ['./css/app.scss', './js/app.js']
  },
  port: 3003,
  html: true,
  browsers: ['last 2 versions', 'ie > 8'],
  assets_url: '/',  // Urls dans le fichier final
  stylelint: './css/**/*.scss',
  assets_path: './dist/', // ou build ?
  refresh: ['./index.html'] // Permet de forcer le rafraichissement du navigateur lors de la modification de ces fichiers
}
