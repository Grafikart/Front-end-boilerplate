/* eslint-disable */
var hotClient = require('webpack-hot-middleware/client?reload=true&noInfo=true&path=http://localhost:3003/__webpack_hmr')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
