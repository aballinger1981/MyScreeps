var gulp = require('gulp');
var screeps = require('gulp-screeps');
var credentials = require('./credentials');

gulp.task('screepsUpload', function () {
    gulp.src('./lib/*.js')
        .pipe(screeps(credentials));
});