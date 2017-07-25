const gulp = require('gulp'),
    pug = require('gulp-pug'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    // gamer = require('phaser-ce'),
    stylus= require('gulp-stylus');
    browser = require('browser-sync').create(),
    error = require('gulp-plumber');
// Correccion del control de  tareas
gulp.task('errorGulp',() =>
    gulp.src('gulpfile.js')
    .pipe(error()) 
    .pipe(jshint())
    .pipe(jshint.reporter('Default'))
    .pipe(error.stop())
);
// sincronzar las pagina web 
gulp.task('servidor', ()=> {
    browser.init({
        server: {
            baseDir: "../Game"
        }
    });

});
// archivos de  javascript 
gulp.task('js', () => {
    gulp.src('statusGame/*.js')
    .pipe(jshint())
    .pipe(error())
    .pipe(concat('principal.js'))
    .pipe(error.stop())
    .pipe(jshint.reporter('Default'))
    .pipe(gulp.dest('../Game/js/statusGame/'))
    .pipe(browser.reload({ stream: true }));
});
// tareas del convertidor pug a html y sentido contrario);
gulp.task('pug',()=> {
    gulp.src('./documento/*.pug')
        .pipe(error())
        .pipe(pug({ pretty: true }))
        .pipe(error.stop())
        .pipe(gulp.dest('../Game/'))
        .pipe(browser.reload({ stream: true }));
});
gulp.task('style', ()=> {
    gulp.src('./documento/style.styl')
        .pipe(error())
        .pipe(stylus('stylus'))
        .pipe(error.stop())
        .pipe(gulp.dest('../Game/css/'))
        .pipe(browser.reload({ stream: true }));
});

//tarea de atomatizacion
gulp.task('default', ['servidor','js', 'errorGulp', 'pug', 'style' ], () => {
    gulp.watch('statusGame/*.js', ['js']);
    gulp.watch('./documento/*.pug', ['pug']);
    gulp.watch('./documento/*.styl', ['style']);
    gulp.watch('./gulpfile.js', ['errorGulp']);
});