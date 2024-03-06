#!/bin/bash

# 删除 dist 目录下的所有文件
rm -rf dist

# 编译 TypeScript 代码
tsc

# 运行编译后的 JavaScript 文件
node ./dist/endpoint/main.js
