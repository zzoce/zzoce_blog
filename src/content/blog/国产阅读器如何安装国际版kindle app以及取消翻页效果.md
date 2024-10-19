---
title: "国产阅读器如何安装国际版kindle app以及取消翻页效果"
description: ""
pubDate: Oct 19 2024
image: /image/index.webp
categories:
  - 杂谈
badge: zzcoe
---


在Kindle 退出中国后大家纷纷转战美区账号，写这篇文章主要是为了解决国际版 kindle app缺乏字体，以及在国产阅读器上适配较差的问题（国产 kindle 我全都要！！！），希望能帮到大家

鉴于阅读器的羸弱性能 kindle 版本当然使越低越好，但是 kindle-8.75.0.100(1.3.282367.0) 以及之前的版本是无法取消翻页效果的。

如果你和我一样使用的是墨案迷你阅或者其他的阅读器，请<font color="#ff0000">安装 kindle-8-90 版本</font>，

因为我尝试了 8-84 以及 8-85 两个版本都无法安装，最新的额版本可能会无法安装字体，这里我没有尝试。如果你不想麻烦，建议听我的。

鉴于大家使用各种各样的网盘导致下载不方便，我将 kindle-8-90 版本的安装包放在了我自己的博客，大家直接点击就可以在浏览器下载，<font color="#ff0000">不需要关注什么东西，也不需要登录！！！</font>非常方便。（我真是个大善人！），[下载点我](https://zzoce.obs.cn-north-4.myhuaweicloud.com:443/kindle-8-90apk/kindle-8-90-1-0-2-0-5912-0.apk?AccessKeyId=Z5ZWFK65RTSDRP83554P&Expires=1729325382&x-obs-security-token=ggpjbi1ub3J0aC00Ti97ImFjY2VzcyI6Ilo1WldGSzY1UlRTRFJQODM1NTRQIiwibWV0aG9kcyI6WyJ0b2tlbiJdLCJyb2xlIjpbXSwicm9sZXRhZ2VzIjpbXSwidGltZW91dF9hdCI6MTcyOTM4OTg4MzY0OCwidXNlciI6eyJkb21haW4iOnsiaWQiOiJmMWJiMTU1N2EzNjM0ZjVkYWExMmVlOTM2MTA0YWU3NSIsIm5hbWUiOiJ6em9jZV94In0sImlkIjoiZDgxMTM0Zjk1YTljNDcwYWI4N2YzMzg0ZDZmODFlMDkiLCJuYW1lIjoienpvY2VfeCIsInBhc3N3b3JkX2V4cGlyZXNfYXQiOiIiLCJ1c2VyX3R5cGUiOjE3fX045feO2eYRDbaV1vZsT1fKXSyF3E8mq1MUIsnIlGB9C02ejUkTwBWbTO_ESs6CPLQlVykMde4brYequtpXl-ufWGLEwKdkalh8jUaRvkne6KUPhR526qdcfXLapvQHZDDVkdlBx9voAvhHBJRc78aZIgXV9HMO-NaWcGr47_pjXOLjzy34yIzUNnea8r52L5n9zvU65kKkiT5OA9ufP3XPDs1qRd29mnwLXRhwmZXlMEXd9HQTYqDQB1tBYlOFncjIzXliNIWZBfi43QXRoBl7s5qJjlQKtvHijpe95EwHnVEUFYGOMviKAUcHaEE1UVp90VoYmOw9P5U8KItHTxS_&Signature=YDyMf65Y3keWWq3sVMLCFrze80A%3D)


Ok，如果你不需要更换字体到这里就结束了。温馨提示想要<font color="#ff0000">更换字体需要魔法哦</font>。

首先，将设备时区修改为阿美莉卡的时区，语言改为英文，并打开魔法上网

其次，安装国际版 kindle，登录你的美区账号。注意登录账号后不要进行任何操作，尤其是下载书籍。直接在设置->管理其他字体中下载字体。可能有点慢，下载完成后会在手机消息栏提醒你。

然后随便下载一本中文书籍并打开，这时候就在手机消息栏 kindle 会提示你有一个 9M 大小字体需要安装，点一下，等进度条走完就可以了

接下来更换字体

手机使用自带的文件管理器就可以，阅读器就连接电脑或者下一个第三方的文件管理器（推荐 mt 管理器，好用）找到 `\Android\data\com.Amazon.Kindle\files\fonts\zh` 文件夹，其中 `MYingHeiSMedium.ttf` 就是黑体 `STBShusongRegular.ttf` 就是宋体，

使用第三方文件管理器路径可能是 `\storage\emulated\0\Android\data\com.Amazon.Kindle\files\fonts\zh`

然后<font color="#ff0000">修改你的字体文件名</font>为这两个其中一个并替换掉原来的文件，这一招就叫偷梁换柱！

重启 kindle 就可以正常使用啦