var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./scss/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass']);