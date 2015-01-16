gulp = require("gulp")
$ = require("gulp-load-plugins")()
browserSync = require("browser-sync")
reload = browserSync.reload
path = global.path

gulp.task "default", ->
  opts =
    notify: false
    open: true
  if path['proxy']
    opts['proxy'] = path.proxy
  else
    opts['server'] = { baseDir: path.server }
  browserSync opts

  gulp.watch path.scss + "**/*.scss", ["sass"]
  gulp.watch [path.js + "**/*.coffee", path.js + "modules/**/*.js"], ["coffee"]
  gulp.watch path.refresh, reload
  gulp.watch path.img + "icons/**/*.png", ["sprite"]