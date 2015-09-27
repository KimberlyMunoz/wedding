var gulp = require('gulp');

var filesize = require('gulp-filesize');
var rename = require('gulp-rename');

var concat = require('gulp-concat');  
var uglify = require('gulp-uglify');    

var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');


gulp.task('vendor', function() {  
    return gulp.src('./_lib/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('sass', function () {
    return gulp.src('./_scss/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./css'));
});

gulp.task('uncss', function () {
    return gulp.src('./css/main.css')
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('minify:css', function() {
    return gulp.src('./css/main.css')
        .pipe(sourcemaps.init())
        .pipe(minifycss({compatibility: 'ie7'}))
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});

gulp.task('minify:vendor', function () {
    return gulp.src('./js/vendor.js')
        .pipe(filesize())
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('./js'))
        .pipe(filesize());
});

gulp.task('minify:main', function () {
    return gulp.src('./js/main.js')
        .pipe(filesize())
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('./js'))
        .pipe(filesize());
});

gulp.task('imagemin', function () {
    return gulp.src('./_images/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./img'));
});

gulp.task('watch', function () {
    gulp.watch('./_scss/**/*.scss', ['sass']);
});

gulp.task('minify', ['minify:vendor', 'minify:main', 'minify:css']);

gulp.task('default', ['sass', 'uncss', 'vendor', 'minify', 'imagemin']);