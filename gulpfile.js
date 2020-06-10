'use strict';

// connections
var gulp = require('gulp'),
	prefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	cssmin = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
	terser = require('gulp-terser'),
	reload = browserSync.reload;

// paths
var path = {
	build: {
		html: 'build/',
		js: 'build/scripts/',
		vendor: 'build/scripts/vendor',
		css: 'build/',
		img: 'build/styles/img/',
		fonts: 'build/styles/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/scripts/main.js',
		vendor: 'src/scripts/vendor/**/*.js',
		style: 'src/styles/style.scss',
		img: 'src/styles/img/**/*.*',
		fonts: 'src/styles/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/scripts/*.js',
		vendor: 'src/scripts/vendor/**/*.js',
		style: 'src/styles/**/*.scss',
		img: 'src/styles/img/**/*.*',
		fonts: 'src/styles/fonts/**/*.*'
	},
	clean: './build'
};

// configs
var config = {
	server: {
		baseDir: "./build"
	},
	//tunnel: true,
	host: 'localhost',
	port: 3000,
	browser: "chrome"
	// browser: "firefox"
};

//build
function html() {
	return gulp
		.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.stream());
}

function vendor() {
	return gulp
		.src(path.src.vendor)
		.pipe(gulp.dest(path.build.vendor))
		.pipe(browserSync.stream());
}

function js() {
	return gulp
		.src(path.src.js)
		.pipe(rigger())
		.pipe(gulp.dest('./build/scripts/nomini'))
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(browserSync.stream());
}

function es() {
	return gulp.src(path.src.js)
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./build/scripts/'))
		.pipe(browserSync.stream());
}

function css() {
	return gulp
		.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(prefixer())
		.pipe(gulp.dest('./build/scripts/nomini'))
		.pipe(cssmin())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.stream());
}

function img() {
	return gulp
		.src(path.src.img)
		.pipe(gulp.dest(path.build.img))
		.pipe(browserSync.stream());
}

function fonts() {
	return gulp
		.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
}

gulp.task('build', gulp.parallel(html, vendor, js, css, fonts, img));


//watch
gulp.task('watch', function () {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.style, css);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.img, img);
	gulp.watch(path.watch.fonts, fonts);
	gulp.watch(path.watch.js, es);
});


gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));