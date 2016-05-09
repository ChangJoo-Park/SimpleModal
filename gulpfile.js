var gulp = require('gulp');
var minify = require('gulp-minify');
var stripDebug = require('gulp-strip-debug');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task('js-compress', function(){
  gulp.src('./src/modal.js')
      .pipe(stripDebug())
      .pipe(minify({
        ext:{
          src:'-debug.js',
          min:'.js'
        },
        output: {
          comments: false
        }
      }))
      .pipe(gulp.dest('dist'))
});

gulp.task('css-compress', function(){
  gulp.src('./src/modal.css')
      .pipe(cssmin())
      .pipe(gulp.dest('dist'))
});


gulp.task('default', ['js-compress', 'css-compress']);
