module.exports = {
  entry: {
    app: ['./css/app.scss', './js/app.js']
  },
  port: 3003,
  html: true,
  assets_url: '/',  // Urls dans le fichier final
  assets_path: './dist/', // ou build ?
  refresh: ['./index.html'], // Permet de forcer le rafraichissement du navigateur lors de la modification de ces fichiers
  historyApiFallback: false // Passer à true si on utilise le mode: 'history' de vue-router (redirige toutes les requêtes sans réponse vers index.html)
}
