'use strict'

import gulp from "gulp";
import gulpMode from "gulp-mode";
const mode = gulpMode();
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import sourcemaps from "gulp-sourcemaps";
import imagemin, {mozjpeg, optipng} from 'gulp-imagemin';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import {deleteAsync} from 'del';
import browserSync from 'browser-sync';
import zip from 'gulp-zip';

var isProduction = mode.production();
if(isProduction) {
    console.log("Gulp Production mode");
}
var isDevelopment = mode.development();
if(isDevelopment) {
    console.log("Gulp Development mode");
}
if (isProduction && isDevelopment) {
    throw new Error('Something is wrong with environment settings, it can not be set to development and production at the same time');
}

gulp.task('cleanup', async () => {
    return await deleteAsync(['./dist/*', './!dist/.gitkeep'], {force: true});
});

gulp.task('html', () => {
    return gulp.src('./src/*.html')
        .pipe(mode.production(replace('style.css', 'style.min.css')))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('libs:js', () => {
    return gulp.src('./src/js/*/*.min.js')
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('libs:css', () => {
    return gulp.src('./src/css/*.min.css')
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('libs:fonts', () => {
    return gulp.src('./src/css/fonts/*', {encoding: false})
        .pipe(gulp.dest('./dist/css/fonts/'));
});

gulp.task('favicons', () => {
    return gulp.src('./src/img/favicons/*', {encoding: false})
        .pipe(gulp.dest('./dist/img/favicons/'));
});

gulp.task('scss', () => {
    let config = {silenceDeprecations: ['legacy-js-api']};
    if (isProduction) {
        config['outputStyle'] = 'compressed';
    }
    return gulp.src('./src/css/*.scss')
        .pipe(mode.development(sourcemaps.init()))
        .pipe(sass(config)
            .on('error', sass.logError))
        .pipe(mode.development(sourcemaps.write('./maps/')))
        .pipe(mode.production(rename({
            suffix: '.min'
        })))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('images:png', () => {
    return gulp.src('./src/img/*.png', {encoding: false})
        // .pipe(imagemin([
        //     optipng({optimizationLevel: 5})
        // ]))
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('images:jpg', () => {
    return gulp.src('./src/img/*.jpg', {encoding: false})
        .pipe(imagemin([
            mozjpeg({quality: 75, progressive: true})
        ]))
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('js', () => {
    let paths = ['./src/js/app/dist/*.js'];
    if (isDevelopment) {
        paths.push('./src/js/app/dist/*.js.map')
    }

    return gulp.src(paths)
        .pipe(gulp.dest('./dist/js/'));
});


gulp.task('build', () => {
    if (! isProduction) {
        throw new Error('This task must be executed in production mode only!');
    }

    return gulp.src('./dist/**', {encoding: false})
        .pipe(zip(`build-${Date.now()}.zip`, {compress: true}))
        .pipe(gulp.dest('./builds/'));
});

gulp.task('watch', () => {
    let localBrowserSync = browserSync.create();
    localBrowserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    let htmlWatcher = gulp.watch('./src/*.html', gulp.series('html'));
    htmlWatcher.on('change', (path, stats) => localBrowserSync.reload());

    let jsPaths = ['./src/js/app/dist/*.js'];
    if (isDevelopment) {
        jsPaths.push('./src/js/app/dist/*.js.map')
    }
    let jsWatcher = gulp.watch(jsPaths, gulp.series('js'));
    jsWatcher.on('change', (path, stats) => localBrowserSync.reload());

    let scssWatcher = gulp.watch('./src/css/*.scss', gulp.series('scss'));
    scssWatcher.on('change', (path, stats) => localBrowserSync.reload());
});

gulp.task('default', gulp.series('cleanup', gulp.parallel(
    'html', 'libs:js', 'libs:css', 'libs:fonts', 'favicons', 'scss', 'images:png', 'images:jpg', 'js'
)));
