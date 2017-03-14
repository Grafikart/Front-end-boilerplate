var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var path = global.path;

gulp.task('default', function(){

    gulp.watch(path.scss + '**/*scss', ['sass']);
    gulp.watch(path.img + "icons/**/*.png", ["sprite"]);
});