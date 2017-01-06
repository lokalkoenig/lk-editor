const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var strip = require('gulp-strip-comments');
var watch = require('gulp-watch');
var minify = require('gulp-minify'); 
var cleanCSS = require('gulp-clean-css');
var stripCssComments = require('gulp-strip-css-comments');
 
 
gulp.task('sass', () =>
    sass('scss/project.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('dist/css/'))       
);

gulp.task('css-minfy', function() {
  return gulp.src([
                   'dist/css/project.css'
                 ])
    .pipe(stripCssComments())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css/'));
});



gulp.task('scripts-editor-pack', function() {
  return gulp.src([
                   'js-source/bootstrap-editable.js', 
                   "js-source/types/editor.js",
                   "js-source/types/image.js",
                   "js-source/types/cell.js",
                   "js-source/types/table.js",
                   "js-source/PXEdit.js"
                 ])
    .pipe(concat('PXEdit-packed.js'))
    .pipe(strip())
    .pipe(minify())
    .pipe(gulp.dest('./dist/js/'));
});


gulp.task('scripts-fileupload-pack', function() {
  return gulp.src([
                   'js-source/fileupload/jquery.ui.widget.js', 
                   "js-source/fileupload/jquery.iframe-transport.js",
                   "js-source/fileupload/jquery.fileupload.js"
                 ])
    .pipe(concat('jquery.fileupload.js'))
    .pipe(strip())
    .pipe(minify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('scripts-trumbowyg-pack', function() {
  return gulp.src([
                   'js-source/trumbowyg/trumbowyg.min.js', 
                   "js-source/trumbowyg/langs/de.min.js"
                 ])
    .pipe(concat('trumbowyg.js'))
    .pipe(strip())
    .pipe(minify())
    .pipe(gulp.dest('./dist/js/'));
});




gulp.task('default', function() {
 	gulp.watch('scss/*.scss', ['sass', 'css-minfy']);
        gulp.watch('js-source/*.js', ['scripts-editor-pack']);       
});


gulp.task('build', ['scripts-trumbowyg-pack', 
                    'scripts-fileupload-pack', 
                    'scripts-editor-pack', 
                    'sass', 
                    'css-minfy']);

