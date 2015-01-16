gulp = require("gulp")
$ = require("gulp-load-plugins")()
browserSync = require("browser-sync")
reload = browserSync.reload
path = global.path
browser_support = global.browser_support

gulp.task "sass", ->
  gulp.src path.scss + "*.scss"
  .pipe $.sass onError: console.error.bind(console, 'SASS Error:')
  .pipe $.autoprefixer(browsers: browser_support)
  .pipe gulp.dest(path.css)
  .pipe $.size()
  .pipe reload(stream: true)