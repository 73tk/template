// gulpプラグインの読みこみ
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rubySass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

// ブラウザシンク起動

// var browserSync = require('browser-sync');
// gulp.task('launchBrowserSync', function () {
//   browserSync({
//     server: {
//       baseDir: 'docs/'
//     },
//     port: 8000
//   });
// });

// サーバー起動

var webserver = require('gulp-webserver');
gulp.task('server', function () {
  gulp.src('./docs')
  .pipe(webserver({
    livereload: true,
    directoryListing: false,
    open: true,
    port: 8000
  }));
});

// scssのコンパイル→autoprefix

gulp.task('css', function () {
  return rubySass('docs/common/css/sass/base.scss', {
    style: 'expanded',
    sourceMap: false,
    sourceComments: false
  })
  .pipe(plumber({
    errorHandler: function (err) {
      console.log(err.messageFormatted);
      this.emit('end');
    }
  }))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('docs/common/css/'));
});

//watch

gulp.task('watch',function () {
  gulp.watch('docs/common/css/sass/parts/*.scss', ['css']);
  gulp.watch('./docs', ['server']);
});

gulp.task('default', ['watch', 'server']);
