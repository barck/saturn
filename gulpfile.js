var gulp = require('gulp'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    twig = require('gulp-twig'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp');



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
            compress: false
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/style/'))
        .pipe(browserSync.reload({stream: true}));
});



gulp.task('compile', function () {
    'use strict';
    return gulp.src('app/views/*.twig')
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
        .pipe(gulp.dest('public/style/fonts'));
    gulp.src('app/*.php')
        .pipe(gulp.dest('public'))
});

gulp.task('watch', function() {
    gulp.watch('app/style/*.styl', ['stylus']); // Наблюдение за styl файлами и выполнение задачи stylus
    gulp.watch('app/views/**', ['compile']);
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



/*** some ftp stuff ***/
var ftp_data = {
    from : [ "public/*/**", "public/**" ],
    to : "/httpdocs"
};

function getConn() {
    gutil.log("Ftp host - " + process.env.ftp_host);
    gutil.log("Ftp user - " + process.env.ftp_user);
    gutil.log("Ftp password - " + process.env.ftp_password);

    return ftp.create({
        host: process.env.ftp_host,
        user: process.env.ftp_user,
        pass: process.env.ftp_password
    });
}

gulp.task('deploy', function () {
    var conn = getConn();
    return gulp.src(ftp_data.from, {base: './public', buffer: false})
        .pipe(conn.dest(ftp_data.to))
        .pipe(gutil.noop());
});

