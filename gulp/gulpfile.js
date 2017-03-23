// gulpプラグインの読みこみ
var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

// ブラウザシンク起動
gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: 'docs/'
    },
    // http://localhost:9999/
    port: 9999
  });
});

// リロード
gulp.task('reload', function () {
  browserSync.reload();
});

// css作成
gulp.task('css', function () {
  gulp.src('docs/common/css/sass/base.scss')
    // scssのコンパイル
    .pipe($.sass({
      style: 'expanded'
    })).on('error', $.sass.logError)
    // autoprefix
    .pipe($.autoprefixer('last 2 versions'))
    .pipe(gulp.dest('docs/common/css/'))
    // ブラウザリロード
    .pipe(browserSync.reload({
      stream: true
    }));
});

// SVG sprite作成
gulp.task('svg', function () {
  gulp.src('docs/common/img/icons/*.svg')
    .pipe($.svgmin())
    .pipe($.svgstore({
      inlineSvg: true
    }))
    .pipe($.cheerio({
      run: ($, file) => {
        // 不要なタグを削除
        $('style,title,defs').remove();
        // symbolタグ以外のid属性を削除
        $('[id]:not(symbol)').removeAttr('id');
        // Illustratorで付与される「st」または「cls」ではじまるclass属性を削除
        $('[class^="st"],[class^="cls"]').removeAttr('class');
        // svgタグ以外のstyle属性を削除
        $('[style]:not(svg)').removeAttr('style');
        // data-name属性を削除
        $('[data-name]').removeAttr('data-name');
        // fill属性を削除
        $('[fill]').removeAttr('fill');
        // svgタグにdisplay:noneを付与
        // （読み込み時、スプライト全体を非表示にするため）
        $('svg').attr({
          style: 'display:none'
        });
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe($.rename('sprite.svg'))
    .pipe(gulp.dest('docs/common/img/'));
});

//watch

gulp.task('watch', function () {
  gulp.watch('docs/common/css/sass/parts/*.scss', ['css']);
  gulp.watch('docs/common/img/icons/*.svg', ['svg', 'reload']);
  gulp.watch('docs/common/js/*.js', ['reload']);
  gulp.watch('docs/*.html', ['reload']);
  gulp.watch('docs/', ['server']);
});

gulp.task('default', ['watch', 'server']);
