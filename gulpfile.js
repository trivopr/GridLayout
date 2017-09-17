var gulp = require('gulp');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var postcssFlexbox = require('postcss-flexbox');
var fontMagician = require('postcss-font-magician');
var precss = require('precss');
var awesome = require('postcss-font-awesome');
var cssnext = require("postcss-cssnext");
var cssnano = require('gulp-cssnano');
var atImport = require("postcss-import");

gulp.task('serve', ['css'], function() {
    browserSync.init({
        server: './app/'
    });

    gulp.watch(["./app/styles/*.css", "./app/styles/component/*.css"], ['css']).on('change', browserSync.reload);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
});

gulp.task('css', function() {
    var plugins = [
        atImport(),
        precss(),
        cssnext(),
        postcssFlexbox(),
        fontMagician(),
        awesome()
    ];

    return gulp.src('./app/styles/main.css')
        .pipe(postcss(plugins))
        .pipe(cssnano())
        .pipe(gulp.dest('./app/dest/styles'));
});

gulp.task('default', ['serve']);