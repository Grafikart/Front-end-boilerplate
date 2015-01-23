# Configuration
global.path = 
    #proxy: "local.dev/my/server/lol",
    server: './'
    scss: "css/"
    img: "img/"
    js: "js/"
    css: "./"
    refresh: ["**/*.html", "**/*.php", "js/*.js"]

# Support
global.browser_support = [
    "ie >= 9"
    "ie_mob >= 10"
    "ff >= 30"
    "chrome >= 34"
    "safari >= 7"
    "opera >= 23"
    "ios >= 7"
    "android >= 4.4"
    "bb >= 10"
]

# Require

# Load all the tasks !
require 'coffee-script/register'
requireDir = require 'require-dir'
dir = requireDir './tasks'