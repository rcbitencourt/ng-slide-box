var gulp 			= require('gulp');
var coffee 		= require('gulp-coffee');
var gutil 		= require('gulp-util');
 
gulp.task('build', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./dist/'))
});