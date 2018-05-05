const gulp  = require('gulp'),
      html  = require('gulp-pug'),
      style = require('gulp-stylus'),
      error = require('gulp-plumber'),
      reload = require('browser-sync').create(),
      jsError = require('gulp-jslint');

// Crear el html
gulp.task('html', () => {
    gulp.src('./pug/*.pug')
        .pipe(error())
        .pipe(html({
            pretty:true
        }))
        .pipe(error.stop())
        .pipe(gulp.dest('../Game/'))
        .pipe(reload.stream());    
});
// marquetacióny diseño
gulp.task('css', () => {
    gulp.src('./styles/*.styl')
        .pipe(error())
        .pipe(style())
        .pipe(error.stop())
        .pipe(gulp.dest('../Game/css'))
        .pipe(reload.stream())
}); 
// Recagar el proyecto con nuevos cambio
gulp.task('Sync', ()=>{
    reload.init({
        server: {
            baseDir: "../Game"
        }
    });
});

//Corregir Javascript
gulp.task('js',()=>{
    gulp.src('./js/*.js')
        .pipe(error())
        .pipe(error.stop())
        .pipe(gulp.dest('../Game/js/statusGame/'))
        .pipe(reload.stream());
});
// Corregir a gulp
gulp.task('gulp', ()=> {
    gulp.src('./gulpFile.js')
        .pipe(error())
        .pipe(jsError())
        .pipe(jsError.reporter('default'))
        .pipe(error.stop())
        .pipe(reload.stream())
});

// Ver, automatizar y actualizar las tareas

gulp.watch('./pug/*.pug', ['html']);
gulp.watch('./styles/*.styl', ['css']);
gulp.watch('./js/*.js', ['js']);
gulp.watch('./gulpFile.js', ['gulp']);
gulp.task('default', ['html', 'css', 'Sync', 'js', 'gulp']);