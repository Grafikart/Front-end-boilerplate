outdatedBrowser = require('./modules/outdatedbrowser')

jQuery ($) ->

  # Sorry IE :(
  outdatedBrowser
    bgColor: '#f25648'
    color: '#ffffff'
    lowerThan: 'boxShadow'
    languagePath: ''