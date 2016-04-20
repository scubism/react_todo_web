var gulp = require('gulp');
var browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var browserifyInc = require('browserify-incremental')
var xtend = require('xtend')
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

var entries = ['index']

function build_js(entry) {
  return function() {
    var b = browserify(xtend(browserifyInc.args, {entries: ['./js/' + entry + '.js']}));
    browserifyInc(b, {cacheFile: './browserify-cache-' + entry + '.json'})
    b.transform(browserifyShim, {global: true})
      .transform(babelify)
      .bundle()
      .on('error', function(err) { console.error(err); this.emit("end"); })
      .pipe(plumber())
      .pipe(source(entry + '.bundle.js'))
      .pipe(gulp.dest('./static/build'));
  }
}

builds = [];
for (key in entries) {
  var entry = entries[key]
  gulp.task('build_js_' + entry, build_js(entry));
  builds.push('build_js_' + entry);
}
gulp.task('build_js', builds, function() {
  console.log('-> build_js finished!');
});

function dist_js(entry) {
  return function() {
    return gulp.src('./static/build/' + entry + '.bundle.js')
      .pipe(uglify())
      .pipe(rename(entry + '.bundle.min.js'))
      .pipe(gulp.dest('./static/dist'));
  }
}

dists = [];
for (key in entries) {
  var entry = entries[key]
  gulp.task('dist_js_' + entry, dist_js(entry));
  dists.push('dist_js_' + entry);
}
gulp.task('dist_js', dists, function() {
  console.log('-> dist_js finished!');
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
  gulp.watch(['./js/*.js', './js/*/*.js', './js/*/*/*.js'], {interval: 1000}, ['build_js']);

  gulp.watch(['./scss/*/*.scss'], {interval: 1000}, ['build_scss']);
});

gulp.task('default', function() {
  console.log('The following commands are available: build, dist, watch, build_js, build_scss');
});
