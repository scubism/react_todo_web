var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var browserifyShim = require('browserify-shim');
var minifyCss = require('gulp-minify-css');

gulp.task('build_js', function() {
  return browserify({entries: ['./js/index.js']})
    .transform(browserifyShim, {global: true})
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.error(err); this.emit("end"); })
    .pipe(plumber())
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./static/build'));
});
gulp.task('dist_js', ['build_js'], function() {
  return gulp.src('./static/build/bundle.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./static/dist'));
});

gulp.task('build_scss', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', function(err) { console.error(err); }))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./static/build'));
});
gulp.task('dist_scss', ['build_scss'], function() {
  return gulp.src('./static/build/styles.css')
   .pipe(minifyCss())
   .pipe(rename('styles.min.css'))
   .pipe(gulp.dest('./static/dist'));
});

gulp.task('build', ['build_js', 'build_scss'], function() {
  console.log('-> build finished!');
});

gulp.task('dist', ['dist_js', 'dist_scss'], function() {
  console.log('-> dist finished!');
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['./js/index.js', './js/*/*.js'], {interval: 500}, ['build_js']);
  gulp.watch(['./scss/*/*.scss'], {interval: 500}, ['build_scss']);
});

gulp.task('default', function() {
  console.log('The following commands are available: build, dist, watch, build_js, build_scss');
});
