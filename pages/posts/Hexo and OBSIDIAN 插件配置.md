---
title: Hexo + OBSIDIAN 插件配置
categories:
 - 博客
tags:
 - hexo
 - obsidian
date: 2023-04-17 18:03:23
updated: 2023-04-19 11:03:38
type: blog
lang: zh
---

### 前言

写了很久博客了，原来halo搭建的博客又转移到hexo了，转移原因如下：
1. 写文章不方便。每次在本地Typora写完一次笔记，都要登录网站粘贴进去， 很麻烦。
2. 需要定期维护网站。网站稳定点还好，但是我那个腾讯服务器经常死机，哎真麻烦

### 插件配置

**本次用到的插件：**
* Image auto upload Plugin (PicGo图床上传)
* Obsidian Git (快速Git上传)
* Templater (文件元数据模板)
* Update time on edit (自动更新时间)

#### PicGo图床上传

前置条件：安装并配置[PicGo](https://github.com/Molunerfinn/PicGo)
安装插件：Image auto upload Plugin

![image.png](https://wrxinyue.oss-cn-hongkong.aliyuncs.com/img/20230417184305.png)

#### 快速Git上传

安装插件：Obsidian Git

根据喜好可以设置自动git推送 (推荐手动)

![image.png](https://wrxinyue.oss-cn-hongkong.aliyuncs.com/img/20230417184729.png)

Ctrl + P 快捷键输入命令，如 输入git可以看到所有命令

![image.png](https://wrxinyue.oss-cn-hongkong.aliyuncs.com/img/20230417191104.png)

#### 文件元数据模板

安装插件：Templater

这个是自动配置模板的，要开始使用 Templator，必须创建一个目录来存储模板的 markdown 文件，如 Templator 文件夹位置中所述。
![63a78a3dd59149e65b5b0dbe.jpg](https://wrxinyue.oss-cn-hongkong.aliyuncs.com/img/63a78a3dd59149e65b5b0dbe.jpg)

在我的环境中，还存放了核心插件的模板，所以目录结构如下。

```bash
Templates/
├── Template MOC.md # 手册
├── Template/ # 核心插件的模板
└── Templater Plugin/ # 社区插件的模板
```

`Template MOC.md`描述了模板文件以及如何使用它。 `Templater Plugin`将模板文件移动到目录后，在Template Plugin设置画面的Template Folder Location项目中输入路径。
![50537c20f0744f1ba8edffd4.jpg](https://wrxinyue.oss-cn-hongkong.aliyuncs.com/img/50537c20f0744f1ba8edffd4.jpg)

我的 Templater Plugin 配置如下：

```
---
title: <% tp.file.title %>
categories:
 - <% tp.file.folder(relative=true) %>
tags:
 - ''
data: <% tp.date.now(format="YYYY-MM-DD HH:mm:ss") %>
updated: ''
---
```

Alt+ E 快捷键使用模板

详细配置可以看[官方文档](https://silentvoid13.github.io/Templater/introduction.html)

#### 自动更新时间

安装插件：Update time on edit

![image.png](https://wrxinyue.oss-cn-hongkong.aliyuncs.com/img/20230417190820.png)

### 设置钩子函数自动生成静态资源

`.git\hooks` 创建一个名为pre-commit的文件，内容如下：

```bash
#!/bin/sh
# pre-commit

echo -e "\033[1;35mRunning pre-commit checks\033[0m"

# Run your compile command here
hexo clean && hexo g

# Add the compiled files
git add .

echo -e "\033[1;35mStatic resource to generate success\033[0m"

# If all checks have passed, run git commit with the original commit message
exec git commit -m "Auto commit at $(date)" --no-verify
```

### 下一步打算

当然是写一个自己的博客系统了，最重要的实现和hexo博客实时同步功能，这样就可以实现一个博客编写多个博客同步了

### 相关链接

1. [Obsidian中文教程](https://publish.obsidian.md/chinesehelp/)
2. [プラグインを導入しよう｜Obsidian.Zenn](https://zenn.dev/estra/books/obsidian-dot-zenn/viewer/a-oz-add-plugins)
