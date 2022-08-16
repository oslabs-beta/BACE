// // gulp is used to automate workflow
// // const gulp = require('gulp');
// // const rm = require('gulp-rm');
// // const webpack = require('webpack');
// // const fs = require('fs');
// import gulp from 'gulp';
// import rm from 'gulp-rm';
// import webpack from 'webpack';
// import fs from 'fs';
// const paths = {
//   build: './build'
// };
// /* CLEAN */
// gulp.task('clean', () => {
//   return gulp
//     .src(`${paths.build}/**/*`, {read: false})
//     .pipe(rm());
// });
// /* BUILD COMPONENTS */
// gulp.task('build:app', (done) => {
//   webpack(require('./webpack.config.js'), done);
// });
// /* COPY FILES INTO BUILD FOLDER */
// const files = [
//   './manifest.json',
//   './src/index.html'
//   // './src/devtools/devtools.html',
//   // './src/devtools/devtools.js'
// ];
// gulp.task('copy:static', (done) => {
//   gulp
//     .src(files)
//     .pipe(gulp.dest(paths.build))
//     .on('end', done);
// });
// /* BUILD */
// gulp.task('build', gulp.series([
//   'clean',
//   'build:app',
//   'copy:static'
// ]));