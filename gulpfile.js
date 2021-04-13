var gulp     = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require("browser-sync"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    notify  = require('gulp-notify'),
    gulpWatch = require('gulp-watch'),
    uglify = require('gulp-uglify');


// pathの設定
var distDir = 'dist';

gulp.task('server', function() {
  return browserSync.init({

    // 1)htmlのモックが起動

    server: {
      baseDir: distDir
    }

  })
});

/**
 * scss
 */
gulp.task('sass', function() {
  return gulp.src(distDir+'/scss/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass())
    .pipe(prefixer('last 2 version')) // autoprefixerの指定
    .pipe(gulp.dest(distDir+"/css")) //cssの出力先ディレクトリの指定
    .pipe(browserSync.stream());
});


gulp.task('watch', function() {
    gulp.watch(distDir+'/scss/**/*.scss', gulp.task('sass'));
    gulp.watch(distDir+'/**/*.html').on('change', function(){
      browserSync.reload()
    });
});

gulp.task('default', gulp.series(gulp.parallel('watch', 'server')));