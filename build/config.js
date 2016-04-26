var path = require('path');

// La seule configuration à modifier.
module.exports = {
    entry: {
        app: ['./css/app.scss', './js/app.js']
    },
    output: {
        path: path.resolve(__dirname, '../dist'), // attention ce dossier sera vidé systématiquement (ne rien y mettre !)
        filename: '[name].js',
        publicPath: '/dist/'
    },
    port: 3002,
    // proxy: 'http://localhost:8000', // Pour PHP / Ruby ou autre
    base: './',
    support: ['last 2 versions'], // Pour autopréfixer
    forceReload: ['./resources/**/*.php', './app/**/*.php']
}
