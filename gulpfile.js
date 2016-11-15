var gulp = require('gulp'),
	  concat = require('gulp-concat'),
  	uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
 	  watch = require('gulp-watch'),
 	  browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    connect = require('gulp-connect');

gulp.task('default', function() {
  // place code for your default task here
});

// gulp conect
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: 8001,
        livereload: true
    });
});

gulp.task('default', ['watch', 'connect']);

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano(),
    ];
    return gulp.src('./dist/assets/css/main.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist/assets/css/main.min.css'));
});

// sass
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// watch
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('/dist/assets/css/main.css', ['css']);
  gulp.watch('dist/*.html', browserSync.reload); 
});

// browserSync
 gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

 //useref
gulp.task('useref', function(){
  return gulp.src('dist/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});