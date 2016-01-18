# Configuration
path =
  #proxy: "local.dev/my/server/lol",
  server: './'
  scss: "css/"
  svgs: "img/svgs/"
  img: "img/"
  js: "js/"
  coffee: "js/"
  css: "./"
  refresh: ["**/*.html", "**/*.php", "js/*.js"]

# Support
browser_support = ['last 2 versions']

# Require
gulp = require("gulp")
$ = require("gulp-load-plugins")()
browserSync = require("browser-sync")
reload = browserSync.reload

gulp.task "default", ["sass", "coffee", "svg"], ->
  opts =
    notify: false
    open: true
  if path['proxy']
    opts['proxy'] = path.proxy
  else
    opts['server'] = {baseDir: path.server}
  browserSync opts

  $.watch path.scss + "**/*.scss", -> gulp.start("sass")
  $.watch path.svgs + "**/*.svg", -> gulp.start("svg")
  $.watch [path.coffee + "**/*.coffee", path.coffee + "**/*.vue"], -> gulp.start("coffee")
  $.watch path.refresh, reload

gulp.task "sass", ->
  gulp.src path.scss + "*.scss"
  .pipe $.plumber()
  .pipe $.sass
    includePaths: [
      'node_modules/foundation-sites/scss',
      'node_modules/motion-ui/src'
    ]
  .pipe $.autoprefixer(browsers: browser_support)
  .pipe gulp.dest(path.css)
  .pipe $.size()
  .pipe reload(stream: true)

gulp.task "coffee", ->
  gulp.src path.coffee + "*.coffee", {read: false}
  .pipe $.plumber()
  .pipe $.browserify
    insertGlobals: true
    transform: ['coffeeify'],
    extensions: ['.coffee']
  .pipe $.rename(extname: '.js')
  .pipe gulp.dest(path.js)
  .pipe $.size()

gulp.task 'svg', ->
  gulp.src(path.svgs + "**/*.svg")
  .pipe $.plumber()
  .pipe $.svgmin()
  .pipe $.svgSprite
    mode:
      symbol:
        spacing:
          padding: 5
        layout: 'diagonal'
        dest: './'
        sprite: 'sprite.svg'
        bust: false
  .pipe gulp.dest(path.img)
  .pipe $.size()