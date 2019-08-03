音乐播放器
---
----该项目是基于vue全家桶（vue、vue-router、vuex、axios）开发的音乐播放器，主要功能包括推荐、歌手、排行、搜索、播放等页面，真实数据通过接口获取QQ音乐上的数据
![image](https://github.com/guojianbiao/sss/blob/master/gif/playlist.gif)

项目介绍

    该项目的内容以笔者自学前端的过程中写的600多篇博客为基础，对于同样学习前端的同学可能会有所帮助。许多博客都有直接可以操作的DEMO，对知识的理解可能会更直观

  采用移动优先的响应式布局，移动端、桌面端均可适配；字体大小使用em单位，桌面端的文字相应变大；移动端可使用滑屏操作，桌面端通过光标设置、自定义滚动条、回车确定等，提升交互体验

  全站采用服务器端渲染SSR的方式，有利于SEO，减少了首屏渲染时间；使用service worker和manifest实现了PWA方案的离线缓存和添加到桌面的功能

  根据HTML标签内容模型，使用语义化标签，尽量减少标签层级，尽量减少无语义的div标签

  CSS大量使用类选择器，尽量减少选择器层级，在vue组件中使用CSS module和postCSS，使用styleLint规范CSS代码，按照布局类属性、盒模型属性、文本类属性、修饰类属性的顺序编写代码，并使用order插件进行校验

  使用esLint规范JS代码，代码风格参照airbnb规范，所有命名采用驼峰写法，公共组件以Base为前缀，事件函数以on为前缀，异步函数以async为后缀，布尔值基本以do或is为前缀

  没有引用第三方组件库，如bootstrap或element组件，而是自己开发了项目中所需的公共组件。在common目录下，封装了头像、全屏、loading、遮罩、搜索框、联动选择等组件，方便开发

  使用配置数据，实现了数据和应用分离，以常量的形式存储在constants目录下

  使用了阿里云的短信模块，实现了短信验证功能
  
