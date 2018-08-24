# Gulp template

Frontend start kit by Gulp.

## Gulp

### Dependencies

 - browser-sync
 - gulp
 - gulp-autoprefixer
 - gulp-cheerio
 - gulp-load-plugins
 - gulp-plumber
 - gulp-rename
 - gulp-ruby-sass
 - gulp-svgmin
 - gulp-svgstore

## Development

Enter that command.

`gulp`

## Html

### Features

 - viewport setting is 'width=devicewidth'.
 - ogp is available.(facebook, twitter)
 - default setting is that resource.
    - 'common/css/base.css'
    - 'common/js/common.js'

## Css

### Dependencies

 - [ress](https://github.com/filipelinhares/ress) is used as reset css.

### Features

 - base.css is compiled 'common/css/sass/base.scss'
 - base.scss is compiled 'common/css/sass/parts/\*.scss'
 - there are shortcuts of mediaquery in mixin.

## Javascript

### Features

## Svg

### Features

When you enter a gulp command, it will sprite the icon automatically.

`gulp svg`

This refer to `'docs/common/img/icons/*.svg'`