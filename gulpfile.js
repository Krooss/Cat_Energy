var gulp = require('gulp');
var less = require('gulp-less');
// var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('less', function () {
  return gulp.src('source/less/styles.less')
    .pipe(less())
    .pipe(postcss([autoprefixer({browsers: ['last 10 version']})
      ]))
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.reload({
      stream:true
    }));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./source"
        }
    });
    // browserSync.watch('source', browserSync.reload)
});

gulp.task('watch', function() {
  gulp.watch('source/less/**/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series('less',
  gulp.parallel('watch','serve')
  ));






// gulp.task('browser-sync', function() {
//   browserSync({
//     server: {
//       baseDir: 'source'
//     },
//     notify: false
//   });
// });

// gulp.task('watch', gulp.parallel('browser-sync', 'less'), function() {
//   gulp.watch('source/less/**/*.less', gulp.parallel('less'));
// });
