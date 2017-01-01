const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
watch = require('gulp-watch');
 
gulp.task('sass', () =>
    sass('scss/project.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('dist/css/'))
);


gulp.task('default', function() {
 	gulp.watch('scss/*.scss', ['sass']);
});



