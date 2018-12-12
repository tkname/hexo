---
title: 奇门遁甲之windows bat 文件重命名
date: 2018-12-12 21:25:06
tags: bat 文件重命名
---

*常用的东西，真的需要了解下*

@ECHO OFF&SetLocal ENABLEDELAYEDEXPANSION 
for %%c in (*.png) do (
   set "name=%%c"
   set "name=!name: (=!"
   set "name=!name:)=!"
   ren "%%c" "!name!" 
)
