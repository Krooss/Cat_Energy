var gulp = require('gulp');
var less = require('gulp-less');
// var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var svgSprite = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');

gulp.task('less', function () {
  return gulp.src('source/less/styles.less')
    .pipe(less())
    .pipe(postcss([autoprefixer({browsers: ['last 10 version']})
      ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style-min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('serve', function() {
    browserSync.init({
        server: "build/"
    });
    gulp.watch('source/less/**/*.less', gulp.series('less'));
    gulp.watch('source/*.html', gulp.series('html')).on('change', browserSync.reload);
});

gulp.task('sprite', function() {
  return gulp.src('source/img/icon-*.svg')
    .pipe(svgSprite({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function(done) {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function() {
  return gulp.src([
    'source/img/**',
    'source/fonts/**/*.{woff,woff2}',
    'source/js/**'
  ], {
    base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build');
});


gulp.task('build', gulp.series('clean','copy','less','html'));
gulp.task('start', gulp.series('build','serve'));
