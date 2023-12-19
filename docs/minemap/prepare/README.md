---
title: 使用须知
date: 2023-11-17
permalink: /minemap/prepare/
---

# 使用须知

[minemap 官网](https://minedata.cn/minedata-portal/) 

本章介绍使用 MineMap for 3D Ultra API 开发地图应用之前的一些[使用须知](https://minedata.cn/nce-support/webDev/MineMap-3D-Ultra?type=prepare)。

# 版本说明

目前 MineMap for 3D Ultra API 使用版本为 V4.0.0。
MineMap for 3D Ultra API 版本兼容以前矢量图层和配图，`不兼容 MineMap for 3D`。

# 前期准备

一、注册账号并申请 key

1、首先，[注册](https://minedata.cn/md-platform/login/login) MineData 账号，成为 MineData 用户；

2、登陆之后，进入「工作台」页面「应用管理」，申请 key；

二、创建自定义地图

1、登陆之后，进入「工作台」页面「地图应用」，创建地图方案，并发布；

![prepare-start](/images/minemap/prepare-start.png)

2、使用自己创建好的或其它准备好的方案，作为应用开发的底图样式，并取得 solution id 和 key，用于 JS 开发的全局配置；

![prepare-key](/images/minemap/prepare-key.png)