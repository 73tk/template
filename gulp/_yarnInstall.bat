set LANG=ja_JP.UTF-8
cd %~dp0
yarn install
del /f "%~dp0%~nx0"
