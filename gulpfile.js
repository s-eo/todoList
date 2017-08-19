var gulp = require('gulp'),
    minifyCSS = require('gulp-csso'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    uglifyJS = require('gulp-uglify');

gulp.task('css', function () {
    return gulp.src('assets/*.sass')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/static/css'))
});

gulp.task('js', function () {
    return gulp.src('assets/*.js')
        .pipe(uglifyJS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/static/js'))
});

gulp.task('default', ['css', 'js']);