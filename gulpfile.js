var gulp = require('gulp'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    twig = require('gulp-twig'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync');


gulp.task('default',  ['clean'], function() {

    gulp.start(
        'browser-sync', 
        'stylus', 'scripts', 'compile', 'copy', 'watch');
    // place code for your default task
});



gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/js/'));
});


// Get one .styl file and render
gulp.task('stylus', function () {
    return gulp.src('app/style/*.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/style/'))
        .pipe(browserSync.reload({stream: true}));
});



gulp.task('compile', function () {
    'use strict';
    return gulp.src('app/views/index.twig')
        .pipe(twig())
        .pipe(gulp.dest('public'));
});



gulp.task('clean', function () {
    return gulp.src('public/', {read: false})
        .pipe(clean());
});



gulp.task('copy', function () {
    gulp.src('app/img/**')
        .pipe(gulp.dest('public/img'));
    gulp.src('app/style/fonts/**')
        .pipe(gulp.dest('public/style/fonts'))
    gulp.src('app/*.php')
        .pipe(gulp.dest('public'))
});



gulp.task('watch', function() {
    gulp.watch('app/style/*.styl', ['stylus']); // Наблюдение за styl файлами и выполнение задачи stylus
    gulp.watch('app/views/*.twig', ['compile']);
    gulp.watch('app/js/*.js', ['scripts']);  // Наблюдение за другими типами файлов
    gulp.watch('app/img/*', ['copy']);
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'public' // Директория для сервера - app
        },
        notify: true // Отключаем уведомления
    });
});
