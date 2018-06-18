const gulp  = require('gulp'),
      html  = require('gulp-pug'),
      style = require('gulp-stylus'),
      error = require('gulp-plumber'),
      reload = require('browser-sync').create(),
      jsError = require('gulp-jshint');

// Crear el html
gulp.task('html', function() {
    gulp.src('./pug/*.pug')
        .pipe(error())
        .pipe(html({
            pretty:true
        }))
        .pipe(error.stop())
        .pipe(gulp.dest('../Game/'))
        .pipe(reload.stream());    
});
//  Diseño de la pagina
gulp.task('css', function() {
    gulp.src('./styles/*.stylus')
        .pipe(error())
        .pipe(style())
        .pipe(error.stop())
        .pipe(gulp.dest('../Game/css'))
        .pipe(reload.stream());
}); 
// Recargar el proyecto con nuevos cambio
gulp.task('Sync', function (){
    reload.init({
        server: {
            baseDir: "../Game"
        }
    });
});

//Corregir Javascript
gulp.task('js',function (){
    gulp.src('./js/*.js')
        .pipe(error())
        .pipe(jsError({esversion:6}))
        .pipe(jsError.reporter('default')) 
        .pipe(error.stop())
        .pipe(gulp.dest('../Game/js/statusGame/'))
        .pipe(reload.stream());
});
// Corregir a gulp
gulp.task('gulp', function () {
    gulp.src('./gulpFile.js')
        .pipe(error())
        .pipe(jsError({esversion:6}))
        .pipe(jsError.reporter('default'))
        .pipe(error.stop())
        .pipe(reload.stream());
});
// Ver, automatizar y actualizar las tareas

gulp.watch('./pug/*.pug', ['html']);
gulp.watch('./styles/*.stylus', ['css']);
gulp.watch('./js/*.js', ['js']);
gulp.watch('./gulpFile.js', ['gulp']);
gulp.task('default', ['html', 'css', 'Sync', 'js', 'gulp']);