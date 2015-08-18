var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var batch = require('gulp-batch');

gulp.task('javascript', function() {

  gulp.src('public/javascripts/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/dist/'));

  });

gulp.task('templates', function() {

  gulp.src('public/javascripts/**/*.html')
    .pipe(flatten())
    .pipe(gulp.dest('public/dist/templates'));
});

gulp.task('watch', function() {

  watch('public/javascripts/**/*.js', batch(function(events, done) {
    gulp.start('javascript', done);
  }));

  watch('public/javascripts/**/*.html', batch(function(events, done){
    gulp.start('templates', done);
  }));
});