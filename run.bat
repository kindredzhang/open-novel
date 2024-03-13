@echo off

REM 删除 dist 目录下的所有文件
rmdir /s /q dist

REM 编译 TypeScript 代码
tsc

REM 运行编译后的 JavaScript 文件
node .\dist\endpoint\main.js
