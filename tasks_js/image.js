var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var sprite_directory = "icons/";
var path = global.path;

// Copy les images retina en les redimensionnant
gulp.task('copyNonRetina', function(){
    var dest = path.img + sprite_directory;
    gulp.src(path.img + sprite_directory + "@2x/*.png")
        .pipe($.changed(dest))
        .pipe($.imageResize({
            width: '50%',
            height: '50%',
            imageMagick: true
        }))
        .pipe(gulp.dest(dest))
})

// Génère une sprite à partir des images du dossier icon
gulp.task('sprite', ["copyNonRetina"], function(){
   var spriteData = null;
    var opts = {
        optimizationLevel: 5,
        progressive: true,
        interlace: true
    };

    // Sprite Retina
    var img = gulp.src(path.img + sprite_directory + "@2x/*.png")
        .pipe($.spritesmith({
            imgName: "sprite@2x.png",
            cssName: "_sprite.scss"
        }));
    img.pipe($.imagemin(opts))
        .pipe(gulp.dest(path.img));

    // Sprinte non retina
    spriteData = gulp.src(path.img + sprite_directory + "*.png")
        .pipe($.spritesmith({
            imgName: "sprite.png",
            cssName: "_sprite.scss",
            cssSpritesheetName: 'sprite',
            cssTemplate: path.scss + "tools/_sprite.mustache"
        }));

    // IMG
    spriteData.img
        .pipe($.imagemin(opts))
        .pipe(gulp.dest(path.img));

    // CSS
    spriteData.css.pipe(gulp.dest(path.scss + "tools/"));
});