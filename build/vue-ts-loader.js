var fs = require('fs')

module.exports = function (content) {
  this.cacheable()
  var isProduction = this.minimize || process.env.NODE_ENV === 'production'

  if (!isProduction) {
    console.log(content)
    content += `
      if (module.hot) {
        const api = require('vue-hot-reload-api')
        const Vue = require('vue')
        api.install(Vue, false)
        module.hot.accept()
        
        if (!module.hot.data) {
          api.createRecord('very-unique-id', HelloWord)
        } else {
          api.reload('very-unique-id', HelloWord.options)
        }
      }
    `
  }

  return content

}