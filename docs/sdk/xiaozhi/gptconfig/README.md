---
title: gptconfig.json
date: 2024-02-19
permalink: /xiaozhi/gptconfig/
---

# gptconfig.json 配置

通过修改 `gptconfig.json` 可以使现场运维人员根据现场需求更改不同的请求地址、问候语、示例等

[gptconfig.json](http://192.168.1.123:10080/platform/qsdi/qihui/xiaozhi/-/blob/master/public/gptconfig.json)

```json
{
  "xiaoHuiUrl": "http://192.168.1.141:8008",
  "logoHello": "(^_^)你好，我是小智！",
  "welcomeHello": "(^_^)你好，我是小智！",
  "welcomeContent": "作为你的智能伙伴，我既能快速查询、目标关系分析。还能进行案事件研判和嫌疑目标动态布控等。",
  "initSayList": ["你是谁？", "js怎么创建dom？", "视频编码有哪些格式？"]
}

```