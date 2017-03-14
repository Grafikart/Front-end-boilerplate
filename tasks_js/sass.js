var gulp = require('gulp');
var $ = require("gulp-load-plugins")();
var path = global.path;
var browser_support = global.browser_support;

gulp.task('sass', function(){
    gulp.src(path.scss + "*.scss")
        .pipe($.sass({
            onError: console.error.bind(console, 'SASS Error:')
        }))
        .pipe($.autoprefixer({
            browsers: browser_support
        }))
        .pipe(gulp.dest(path.css))
        .pipe($.size())
});