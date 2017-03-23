# Front-end Starter Kit

A front-end starter kit by Yarn & Gulp.

## Gulp

### Dependencies
 - browser-sync
 - gulp
 - gulp-autoprefixer
 - gulp-cheerio
 - gulp-load-plugins
 - gulp-plumber
 - gulp-rename
 - gulp-sass
 - gulp-sourcemaps
 - gulp-svgmin
 - gulp-svgstore

### Features
 - Compiling scss
 - Adding prefixer
 - Generating svg sprite
 - Browser sync

## Html

### Features

 - Viewport setting is 'width=device-width'.
 - Ogp is available.(facebook, twitter)
 - Default setting loads those resources.
    - 'common/css/base.css'
    - 'common/js/jquery.min.js'
    - 'common/js/main.js'

## Css

### Dependencies

[sanitize](https://github.com/jonathantneal/sanitize.css)

### Features

base.css is compiled 'common/css/sass/base.scss'.  
base.scss is compiled 'common/css/sass/parts/\*scss'.

### Parts

 - adjust.scss
 - default.scss
 - form.scss
 - mixin.scss
 - sanitize.scss
 - structure.scss
 - variable.scss

## Javascript

### Features

Use the declare 'use strict;'.

## Images

### Features

It generates a sprite.svg from files of icons directory.

```
docs
└─common
    └─img
        ├sprite.svg
        └─icons ↑
          ├icon-A.svg
          ├icon-B.svg
          └icon-C.svg
```

#### How to use

```
<svg>
  <use xlink:href="/common/img/sprite.svg#icon-A" />
</svg>
```

## Setting

 - .editorconfig
    - It depends on Atom plugin.
 - .eslintrc
    - It depends on Atom plugin.
 - .jsbeautifyrc
    - It depends on Atom plugin.
 - gulpfile.js
    - For setting for gulp.
 - package.json
    - For setting for node modules.
 - yarn.lock
    - For locking of node modules.
 - gulpStart.bat
```
set LANG=ja_JP.UTF-8
cd %~dp0
gulp
```
 - remmoveNodeModules.bat
 ```
 @Echo off
 echo //////////////////////////////////////////////////////////////////
 echo %cd%\node_modules\*
 echo //////////////////////////////////////////////////////////////////

 pause

 for /d %%i in (%cd%\node_modules\*) do (
 echo %%~ni
 npm un %%~ni
 )

 pause
 ```
 - upgradePackages.bat
 ```
 set LANG=ja_JP.UTF-8
 cd %~dp0
 yarn upgrade-interactive
 ```
 - yarnInstall.bat
 ```
 set LANG=ja_JP.UTF-8
 cd %~dp0
 yarn install
 del /f "%~dp0%~nx0"
 ```
