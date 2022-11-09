"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');

var fileinclude = require('gulp-file-include');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

/**
 * DIRECTORY
 */
var root = "./public";
var language = {
    ko : "/ko"
};
var type = {
    pcA : "/pc"
};
var srcRoot = "/src", //작업 폴더
    distRoot = "/dist"; //배포 폴더
var paths = { //작업&배포 폴더 트리 구조
    html: "/html",
    stylesheets : "/stylesheets",
    css : "/css",
    sass : "/sass",
    script : "/javascripts",
    map : "../map",
    images : "/images"
};
var typeRoot = {
    srcPcA : root + language.ko + type.pcA + srcRoot, //typeRoot.srcPc 배포
    distPcA : root + language.ko + type.pcA + distRoot //typeRoot.distPc 작업
};

/**
 * html copy
 */
var htmlCopyFun = function(o){
    return gulp.src([
        root + o.language + o.type + srcRoot + "/**/**/*.html",
        root + o.language + o.type + srcRoot + "/!include/*.html"
    ])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(root + o.language + o.type + distRoot))
};
gulp.task('pcA-html-copy', function(){htmlCopyFun({language : language.ko, type : type.pcA});});

/**
 * SASS
 */
var sassFun = function(o){
    return gulp.src(root + o.language + o.type + srcRoot + paths.stylesheets + paths.sass + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync({outputStyle:'compact'}).on('error', sass.logError))// nested, expanded, compact, or compressed.
        .pipe(sourcemaps.write(paths.map))
        .pipe(gulp.dest(root + o.language + o.type + distRoot + paths.stylesheets + paths.css));
};
gulp.task('pcA-sass', function(){sassFun({language : language.ko, type : type.pcA});});

/**
 * SCRIPT USED
 */
var scriptFun = function(o){
    return gulp.src([
        root + o.language + o.type + srcRoot + paths.script + "/function/default.js",
        root + o.language + o.type + srcRoot + paths.script + "/function/*.js"
    ])
    .pipe(concat('design_common.js'))
    .pipe(gulp.dest(root + o.language + o.type + distRoot + paths.script));
};
gulp.task('pcA-script', function(){scriptFun({language: language.ko, type: type.pcA});});

/**
 * SCRIPT API
 */
var pluginFun = function(o){
    return gulp.src([
        root + o.language + o.type + srcRoot + paths.script + "/plugin/*.js"
    ])
    .pipe(concat('plugin.js'))
    .pipe(gulp.dest(root + o.language + o.type + distRoot + paths.script));
};
gulp.task('pcA-plugin', function(){pluginFun({language: language.ko, type: type.pcA});});

/**
 * images copy
 */
var imagesFun = function(o){
    return gulp.src(root + o.language + o.type + srcRoot + paths.images + "/**/*.{gif,jpg,png,svg}")
    .pipe(gulp.dest(root + o.language + o.type + distRoot + paths.images))
};
gulp.task('pcA-image-copy', function(){imagesFun({language : language.ko, type : type.pcA});});

/**
 * WACTH
 */
var browserSyncPCA = require('browser-sync').create();
gulp.task('pcA-all', function(){
    browserSyncPCA.init({
        server: {
            baseDir: typeRoot.distPcA,
            index: "work_list.html"
        },
        ui: false,
        port:2000
    });

    gulp.watch(typeRoot.srcPcA + paths.stylesheets + '/**/*.scss', ['pcA-sass']);
    gulp.watch(typeRoot.srcPcA + paths.script + "/function/*.js", ["pcA-script"]);
    gulp.watch([typeRoot.srcPcA + "/**/**/*.html", typeRoot.srcPcA + "/include/*.html"], ['pcA-html-copy']);
    gulp.watch(typeRoot.srcPcA + paths.images + "/**/*.{gif,jpg,png,svg}", ['pcA-image-copy']);

    gulp.watch([
        typeRoot.distPcA + paths.stylesheets + '/**/*.css',
        typeRoot.distPcA + "/**/**/*.html",
        typeRoot.distPcA + "/*.html",
        typeRoot.distPcA + paths.script + "/*.js"
    ]).on('change', browserSyncPCA.reload);
});

/**
 * TASK
 */
gulp.task('default', runSequence(
    'pcA-all',
    'pcA-image-copy',
    'pcA-plugin'
));



