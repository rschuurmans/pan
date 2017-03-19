'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var nodemon     = require('gulp-nodemon');
var	sass        = require('gulp-sass');
var concat     = require('gulp-concat');

gulp.task('default', ['browser-sync', 'build-lib'], function () {
	gulp.watch('public/sass/**/*.scss', ['build-css'])
	gulp.watch('public/javascript/**/*.js', ['build-js'])
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*", "routes/**/*.*","views/**/*.*"],
        port: 7000
	});
});

gulp.task('build-css', function() {
  return gulp.src('public/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public'))
    
});

gulp.task('build-js', function () {
	return gulp.src('public/javascript/*.js')
		.pipe(concat('client.js'))
		.pipe(gulp.dest('public'))
})
gulp.task('build-lib', function () {
	return gulp.src('public/javascript/lib/*.js')
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('public'))	
})
gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});