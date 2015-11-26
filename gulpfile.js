var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var browserifyShim = require('browserify-shim');

function build_js(is_dist) {
  var b = browserify({entries: ['./js/index.js']})
    .transform(browserifyShim, {global: true})
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.error(err); this.emit("end"); })
    .pipe(plumber())
    .pipe(source(is_dist ? 'bundle.min.js' : 'bundle.js'))
    .pipe(gulp.dest(is_dist ? './static/dist' : './static/build'));
  if (is_dist) {
    b.pipe(uglify());
  }
  return b;
}

gulp.task('build_js', function() {
  return build_js(false);
});
gulp.task('dist_js', function() {
  return build_js(true);
});

function bundle_scss(is_dist) {
  var start = Date.now();
  var s =gulp.src('./scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', function(err) { console.error(err); }));
  if (is_dist) {
    s.pipe(sass({outputStyle: 'compressed'}))
  }
  s.pipe(concat(is_dist ? 'styles.min.css' : 'styles.css'))
    .pipe(gulp.dest(is_dist ? './static/dist' : './static/build'))
  return s;
}

gulp.task('build_scss', function() {
  return bundle_scss(false);
});
gulp.task('dist_scss', function() {
  return bundle_scss(true);
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
