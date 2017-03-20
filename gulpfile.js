'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var nodemon     = require('gulp-nodemon');
var	sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var jsonlint    = require('gulp-json-lint');

gulp.task('default', ['browser-sync', 'build', 'watch']);

gulp.task('build', ['build-lib', 'build-js', 'build-css', 'jsonlint'])

gulp.task('watch', function () {
	gulp.watch('src/sass/*.scss', ['build-css'])
	gulp.watch('src/javascript/*.js', ['build-js'])
})

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*", "routes/**/*.*","views/**/*.*"],
        port: 7000
	});
});

gulp.task('jsonlint', function(){
    return gulp.src('src/data/*.json')
        .pipe(jsonlint())
        .pipe(jsonlint.report('verbose'))
        .pipe(gulp.dest('public/data'))
});

gulp.task('build-css', function() {
  return gulp.src('src/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public'))    
});

gulp.task('build-js', function () {
	console.log('ee');
	return gulp.src('src/javascript/*.js')
		.pipe(concat('client.js'))
		.pipe(gulp.dest('public'))
})
gulp.task('build-lib', function () {
	return gulp.src('src/javascript/lib/*.js')
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