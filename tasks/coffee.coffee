gulp = require("gulp")
$ = require("gulp-load-plugins")()
path = global.path

# Conversion du coffee en js avec le support de browserify (aka require('lib'))
gulp.task "coffee", ->
  gulp.src path.js + "*.coffee"
  .pipe $.coffeeify(insertGlobals: true)
  .pipe gulp.dest(path.js)
  .pipe $.size()