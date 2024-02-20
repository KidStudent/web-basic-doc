---
title: Manifest V2 配置
date: 2023-07-25
permalink: /ivdg-extension/manifest/
---

# Manifest V2 配置说明

```json
{
  // Required
  // 必须的字段3个
  "manifest_version": 2, // manifest编写规范版本，目前主流2
  "name": "My Extension",    // 插件名
  "version": "versionString",    // 版本号

  // Recommended
  "default_locale": "en",    // 默认编码，国际化
  "description": "A plain text description",     // 插件描述。132个字符以内
  // 插件下载或浏览时显示的图标，可选多种规格的扩展图标。推荐大小16，48，128
  "icons": {                
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },

  // Pick one (or none)
  // 图标显示在地址栏右边，能在所有页面显示 //地址栏右侧图标管理。含图标及弹出页面的设置等
  "browser_action": {
    "default_icon": "image/icon-128.png",
    "default_title": "My Test",
    "default_popup": "html/browser.html"
  }, 
  // 图标显示在地址栏右侧（地址栏内），只在特定页面显示
  // 地址栏最后附加图标。含图标及行为等
  "page_action": {
    "default_icon": "image/icon-48.png",
    "default_title": "My Test",
    "default_popup": "html/page.html"
  },
  "theme": {}, // 主题，用于更改整个浏览器的外观
  "app": {}, // 指定扩展需要跳转到的URL

  // Optional
  "author": "",            // 插件作者
  "automation": true,        // 开启自动化
  // 指定扩展进程的background运行环境
  // 可常驻浏览器后台的脚本，可以连接其他页面
  "background": {
    // Recommended
    "persistent": false,
    "script": ["background.js"],
    "page":"html/background.html"
  },
  "background_page": ,
  // 覆盖当前的chrome配置
  "chrome_settings_overrides": {},
  // 覆盖当前的chrome界面配置
  "chrome_ui_overrides": {
    "bookmarks_ui": {
      "remove_bookmark_shortcut": true,
      "remove_button": true
    }
  },
  // 替换页面
  // 修改点击相应动作时返回的页面链接，只支持bookmarks、history、newtab三个页面
  "chrome_url_overrides": {
    "bookmarks": "myPage.html",
    "history": "myPage.html",
    "newtab": "myPage.html",
    "pageToOverride": "html/overrides.html"
  },
  // 键盘触发插件快捷键
  "commands": {
    "_execute_browser_action": {
      "suggested_key": {
        "windows": "Ctrl+Shift+Y",
        "mac": "Command+Shift+Y",
        "chromeos": "Ctrl+Shift+U",
        "linux": "Ctrl+Shift+J"
      }
    },
  },
  // 页面权限
  "content_capabilities": {
    "matches": ["https://*.nyc.corp.google.com/*"],
    "permissions": ["unlimitedStorage", "notifications"] 
  },
  // 指定在web页面运行的脚本
  // 可以操作页面元素，不能使用chrome的api
  "content_scripts": [{
    "matches": ["https://www.baidu.com/*"],
    "css": ["css/mystyles.css"],
    "js": ["lib/jquery-3.3.1.min.js", "js/content.js"]
  }], 
  // 安全策略，默认情况下禁止使用eval或者Function构造函数，以及内联js，禁止载入外部脚本
  "content_security_policy": "script-src ‘self‘; object-src ‘self‘",
  // 将用户脚本转化为content script，允许使用GM_* (greasemonkey)方法
  "converted_from_user_script": true,
  "copresence": ,
  "current_locale": ,
  // 在开发中工具中的页面
  "devtools_page": "devtools.html",
  // 事件监听规则及条件
  "event_rules": [
    {
      "event": "declarativeContent.onPageChanged",
      "actions": [{
        "type": "declarativeContent.ShowPageAction"
      }],
      "conditions": [{
        "type": "declarativeContent.PageStateMatcher",
        "css": ["video"]
      }]
    }
  ],
  // 哪些外部扩展、应用或网页能连接此插件
  "externally_connectable": {
    "ids": [
      "aaaaaaaaaa",
      "bbbbbbbb",
      "*"        // 允许所有可使用 "*"
    ],
    "matches": ["*://*.example.com/*"],
    "accepts_tls_channel_id": false
  },
  // 允许用户上传文件，只支持Chrome OS
  "file_browser_handlers": [{
    "id": "upload",
    // 按钮文字
    "default_title": "Save to Gallery",
    "file_filters": [
      "filesystem:*.jpg",
      "filesystem:*.jpeg",
      "filesystem:*.png"
      // 匹配所有文件可用 "filesystem:*.*"
    ]
  }],
  // 允许访问文件系统，只支持Chrome OS
  "file_system_provider_capabilities": {
    "configurable": true,
    "multiple_mounts": true,
    "source": "network"
  },
  // 插件主页，扩展的官方主页，显示在chrome扩展工具列表中
  "homepage_url": "http://path/to/homepage",
  // 允许其他组件调用自己的模块
  "export": {
    "whitelist": [
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    ]
  },
  // 调用其他组件的模块，与其他组件的export属性共用
  "import": [{"id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}],
  // 隐身模式
  "incognito": "spanning or split or not_allowed",
  // 用户操作意图描述
  "intents": {},
  // 输入管理，键盘事件等
  "input_components": [
    {
      "name": "Test IME",
      "type": "ime",
      "id": "test",
      "description": "Test IME",    // A user visible description
      "language": "en-US",        // The primary language this IME is used for
      "layouts": ["us::eng"]        // The supported keyboard layouts for this IME
    }
  ],
  // 自动生成，可不需要。扩展唯一标识。不需要人为指定
  "key": "publicKey",
  // 要求支持的chrome的最低版本
  "minimum_chrome_version": "versionString",
  // 消息与本地处理模块映射
  // 使用native client 模块
  "nacl_modules": [{                
    "path": "OpenOfficeViewer.nmf",
    "mime_type": "application/vnd.oasis.opendocument.spreadsheet"
  }],
  // 谷歌账户相关信息
  "oauth2": ,
  // 离线使用 // 是否允许脱机运行
  "offline_enabled": true,
  //ominbox即地址栏。用于响应地址栏的输入事件    // 搜索关键词推荐
  "omnibox": {
    "keyword": "aString"
  },
  // 运行时权限，非必须权限
  "optional_permissions": ["tabs"],
  // 设置页，可从扩展工具列表进入 // 选项页。用于在扩展管理页面跳转到选项设置
  "options_page": "options.html",
  // 设置页
  "options_ui": {
      "chrome_style": true,
      "page": "options.html"
  },
  // 安装时提示的权限，基本权限
  "permissions": [
    "https://www.baidu.com/*",
    "background",
    "tabs"
  ],
  // 可以将部分基于平台的功能文件放入_platform_specific目录然后列在此项中减少插件体积
  "platforms": ,
  // NPAPI插件  // 扩展。可调用第三方扩展
  "plugins": [{
    "path": "extension_plugin.dll",
    "public": true
  }],
  // 安装前置需求 // 指定所需要的特殊技术。目前只支持"3D"
  "requirements": {
    "3D": {
        "features": ["webgl"]
    }
  },
  // 放入沙盒中运行
  "sandbox": [
    {
      "pages": [
          "page1.html",
          "directory/page2.html"
      ],
      // content_security_policy is optional.
      "content_security_policy": "sandbox allow-scripts; script-src https://www.google.com"
    }
  ],
  // 短名称，最长12个字母，如不设置则用name属性代替
  "short_name": "Short Name",
  "signature": ,
  // 拼写检查
  "spellcheck": ,
  // 描述了各种属性的type，json格式文件，能在storage.managed API中调用
  "storage": {
    "managed_schema": "schema.json"
  },
  // 实验性API，只在开发版中实现，已弃用
  "system_indicator": ,
  // text to speech
  "tts_engine": {
    "voices": [
      {
        "voice_name": "Alice",
        "lang": "en-US",
        "gender": "female",
        "event_types": ["start", "marker", "end"]
      },
      {
        "voice_name": "Pat",
        "lang": "en-US",
        "event_types": ["end"]
      }
    ]
  },
  // 插件更新地址，自动升级
  "update_url": "http://myhost.com/mytestextension/updates.xml",
  // 版本名，和version字段的区别是没有格式要求，任意字符串
  "version_name": "aString",
  // 指定本扩展在注入的目标页面上所需使用的资源的路径，指定资源路径，为String数组
  "web_accessible_resources": ["images/*.png"]
 }
```