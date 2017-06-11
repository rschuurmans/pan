'use strict';

var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var nodemon      = require('gulp-nodemon');
var	sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var imagemin     = require('gulp-imagemin');
var cleanDest = require('gulp-clean-dest');
var del = require('del');




gulp.task('watch', function () {
	gulp.watch('src/sass/**/*.scss', ['build-css'])
	gulp.watch('src/javascript/*.js', ['build-js'])
	gulp.watch('src/images/*.*', ['build-images'])
})

gulp.task('default', ['clean'], function() {

    gulp.start(
        'build',
        'browser-sync',
        'watch'
    );
});

gulp.task('build', function() {

    gulp.start(
        'build-lib',
        'build-js',
        'build-css',
        'build-images'
    );
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "localhost:3000",
        files: ["public/**/*.*", "routes/**/*.*","views/**/*.*"],
        port: 7000
	});
});
    
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['public']);
});

gulp.task('build-css', function() {
 	return gulp.src('src/sass/style.scss')
	    .pipe(sass())
	    .on('error', errorHandle)
		.pipe(autoprefixer())
		.on('error', errorHandle)
		.pipe(gulp.dest('public'))  
	      
});

gulp.task('build-js', function () {
	return gulp.src('src/javascript/*.js')
		.pipe(concat('client.js'))
		.on('error', errorHandle)
		.pipe(gulp.dest('public'))
})
gulp.task('build-lib', function () {
	return gulp.src('src/javascript/lib/*.js')
		.pipe(concat('lib.js'))
		.on('error', errorHandle)
		.pipe(gulp.dest('public'))	
		 
		
})

gulp.task('build-images', function () {
	return gulp.src('src/images/*.*')
	    .pipe(imagemin())
	    .on('error', errorHandle)
	    .pipe(gulp.dest('public/images'))	
		
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

var errorHandle = function (err) {
	console.log('error!', err);
	this.emit('end');
}