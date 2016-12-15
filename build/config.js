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
  refresh: ['./index.html'], // Permet de forcer le rafraichissement du navigateur lors de la modification de ces fichiers
  historyApiFallback: false, // Passer à true si on utilise le mode: 'history' de vue-router (redirige toutes les requêtes sans réponse vers index.html)
  debug: process.env.NODE_ENV === 'development'
}
