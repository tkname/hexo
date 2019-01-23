---
title: 开发环境 gulp使用
date: 2018-12-12 21:27:37
tags: gulp
---

# gulp.src(globs[, options])
- 输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。
- 将返回一个 Vinyl files 的 stream 它可以被 piped 到别的插件中。
- 使用
```
    gulp.src('client/templates/*.jade')
    .pipe(jade())
    .pipe(minify())
    .pipe(gulp.dest('build/minified_templates'));
```

# gulp.dest(path[, options])
- 能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，
- 因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它
- 使用
```
    gulp.src('./client/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/templates'))
    .pipe(minify())
    .pipe(gulp.dest('./build/minified_templates'));
    
```
# gulp.task(name[, deps], fn)
- 定义一个使用 Orchestrator 实现的任务（task）
- 使用

```
    gulp.task('somename', function() {
    // 做一些事
    });

```