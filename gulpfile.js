var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');

var paths = {
    js : { src : [ 'app/**/*.js', 'app/**/*.jsx' ], dest : 'public/js/' }
};

gulp.task('default', ['build']);

gulp.task('watch', function () {
    gulp.watch(paths.js.src, ['compile']);
});

gulp.task('build', [ 'compile' ]);

gulp.task('compile', function () {
  browserify({
    entries: [ './app/index.js' ],
    extensions: [ '.js', '.jsx' ],
    debug: true // Add sourcemaps
  })
  .transform(babelify) // JSX and ES6 => JS
  .bundle() // Browserify bundles required files
    .on('error', console.error.bind(console))
    .on("error", notify.onError({
      message: 'Error: <%= error.message %>',
      sound: 'Sosumi'
    }))
  .pipe(source('bundle.js')) // Desired filename of bundled files
  .pipe(gulp.dest(paths.js.dest));
});