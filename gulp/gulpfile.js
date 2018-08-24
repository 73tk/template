// gulpプラグイン読込み

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

// パスの設定

var pathes = {
  root: 'docs/',
  baseScss: 'docs/common/css/sass/base.scss',
  destCss: 'docs/common/css/',
  svgIcons: 'docs/common/img/icons/*.svg',
  destSvg: 'docs/common/img/',
  watch: {
    html: 'docs/**.html',
    scss: 'docs/common/css/sass/parts/*.scss',
    js: 'docs/common/js/*.js',
    svg: 'docs/common/img/icons/*.svg'
  }
}

// ブラウザシンク起動
gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: pathes.root
    },
    port: 8000
  });
});

// ブラウザシンクリロード
gulp.task('reload', function () {
  browserSync.reload();
});

// css作成
gulp.task('css', function () {
  // scssのコンパイル
  return $.rubySass(pathes.baseScss, {
    style: 'expanded'
  })
  .on('error', function(error) {
    console.log(error);
    this.emit('end');
  })
  // autoprefix
  .pipe($.autoprefixer('last 2 versions'))
  .pipe(gulp.dest(pathes.destCss))
  // ブラウザリロード
  .pipe(browserSync.reload({
    stream: true
  }));
});

// SVG sprite作成
gulp.task('svg', function () {
  gulp.src(pathes.svgIcons)
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
    .pipe(gulp.dest(pathes.destSvg))
    // ブラウザリロード
    .pipe(browserSync.reload({
      stream: true
    }));
});

//watch

gulp.task('watch', function () {
  gulp.watch(pathes.watch.scss, ['css']);
  gulp.watch(pathes.watch.js, ['reload']);
  gulp.watch(pathes.watch.html, ['reload']);
});

// run

gulp.task('default', ['server', 'watch']);