/*
    Configuration.
    Project Configuration for gulp tasks.
*/

const path = require("path");
const fontDestination = "dist/fonts";
const fontFiles = "assets/fonts/*.**";
const htmlDestination = "dist/";
const htmlFiles = "*.html";
const imageDestination = "dist/images";
const imageFiles = "assets/images/*.**";
const styleDestination = "dist/style";
const styleFiles = "assets/scss/**/*.scss";

/**
    Load Plugins.
    Load gulp plugins and assing them semantic names.
 */

const gulp = require("gulp"),
  watch = require("gulp-watch");
const browserSync = require("browser-sync").create();

const gutil = require("gulp-util");
const chalk = require("chalk");

const { gulpSassError } = require("gulp-sass-error");

// CSS related plugins.
var sass = require("gulp-sass"); // Gulp pluign for Sass compilation
var autoprefixer = require("gulp-autoprefixer"); // Autoprefixing magic
var minifycss = require("gulp-uglifycss"); // Minifies CSS files

// JS related plugins.
var concat = require("gulp-concat"); // Concatenates JS files
var uglify = require("gulp-uglify"); // Minifies JS files

// Utility related plugins.
var rename = require("gulp-rename"); // Renames files E.g. style.css -> style.min.css
var sourcemaps = require("gulp-sourcemaps"); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
var notify = require("gulp-notify"); // Sends message notification to you

/**
    Task: styles
    Compiles Sass, Autoprefixes it and Minifies CSS
*/

gulp.task("styles", function() {
  gulp
    .src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: "compressed", // compressed || nested || expanded
        precision: 10
      }).on("error", sass.logError)
    )
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      autoprefixer(
        "last 2 version",
        "> 1%",
        "safari 5",
        "ie 8",
        "ie 9",
        "opera 12.1",
        "ios 6",
        "android 4"
      )
    )
    .pipe(sourcemaps.write(styleDestination))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(styleDestination));
});

gulp.task("images", () => {
  gulp
    .src(imageFiles)
    // .pipe(sourcemaps.init())
    // .pipe(sourcemaps.write({ includeContent: true }))
    // .pipe(sourcemaps.write(imageDestination))
    .pipe(gulp.dest(imageDestination));
});

gulp.task("fonts", () => {
  gulp
    .src(fontFiles)
    // .pipe(sourcemaps.init())
    // .pipe(sourcemaps.write({ includeContent: true }))
    // .pipe(sourcemaps.write(fontDestination))
    .pipe(gulp.dest(fontDestination));
});

gulp.task("html", () => {
  gulp
    .src(htmlFiles)
    // .pipe(sourcemaps.init())
    // .pipe(sourcemaps.write({ includeContent: true }))
    // .pipe(sourcemaps.write(htmlDestination))
    .pipe(gulp.dest(htmlDestination));
});

/**
    Task: browser-sync
    Refreshes the browser for you
*/

gulp.task("browser-sync", function() {
  const files = ["**/*.php", "**/*.html", "*.html"];

  browserSync.init(files, {
    server: "./dist/",
    port: 9000
  });
});

gulp.task("watch", () => {
  gulp
    .watch("./src/scss/**/*.scss", ["styles"])
    .on("change", browserSync.reload);
  gulp.watch("./*.html", ["html"]).on("change", browserSync.reload);
  gulp.watch("./images/*", ["images"]).on("change", browserSync.reload);
  watch("./dist/style/*.css").on("change", browserSync.reload);
});

/**
    Task: styles
    Compiles Sass, Autoprefixes it and Minifies CSS
*/

gulp.task("default", [
  "styles",
  "browser-sync",
  "watch",
  "images",
  "fonts",
  "html"
]);

gulp.task("compile", ["images", "fonts", "html"]);

gulp.task("build", ["styles", "images", "fonts", "html"]);
