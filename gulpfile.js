const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const chalk = require('chalk');
const minifycss = require('gulp-minify-css');
var plumber = require('gulp-plumber');

// Compile SASS

const sassfiles = 'assets/scss/*.scss';

gulp.task('scss', function () {
  return gulp.src(sassfiles)
    .pipe(plumber())
    .pipe(sass({ style: 'compressed' }))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(gulp.dest('./assets/css/'));
});

// Compile compile style
gulp.task('style', ['scss'], function() {
    browserSync.init({
        server: "./",
    });
    gulp.watch("./assets/scss/**/*.scss", ['scss']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("assets/css/*.css").on('change', browserSync.reload);
});

gulp.task('default', ['style']);
