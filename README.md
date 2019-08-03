音乐播放器
---
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该项目是基于vue全家桶（vue、vue-router、vuex、axios）开发的音乐播放器，主要功能包括推荐、歌手、排行、搜索、播放等页面，真实数据通过接口获取QQ音乐上的数据。

项目介绍
---
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;该项目主要技术有vue、vuex、vue-router、axios、jsonp、better-scroll、es6等，采用flex布局，适配苹果及安卓各个手机型号。CSS大量使用类选择器，尽量减少选择器层级，在vue组件中使用css预处理器stylus；通过QQy音乐获取数据的api，并对其接口进行分析，然后使用axios、jsonp进行真实数据的获取并渲染；对模块进行按需加载，图片进行懒加载等提高页面的性能。

功能演示
---
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主要功能包括推荐、歌手、排行、搜索、播放等页面<br/>
【推荐页面】<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;推荐页面包括可拖拽轮播图、热门歌单推荐<br/><br/>
![image](https://github.com/guojianbiao/sss/blob/master/gif/recommend.gif)<br/>
【歌手页面】<br/><br/>
![image](https://github.com/guojianbiao/sss/blob/master/gif/singer.gif)<br/>
【排行页面】<br/><br/>
![image](https://github.com/guojianbiao/sss/blob/master/gif/rank.gif)<br/>
【搜索页面】<br/><br/>
![image](https://github.com/guojianbiao/sss/blob/master/gif/search.gif)<br/>
【播放页面】<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;播放页面主要功能有暂停、播放、上一首、下一首、随机播放、收藏、歌词展示<br/><br/>
![image](https://github.com/guojianbiao/sss/blob/master/gif/play.gif)<br/>

目录结构
---
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;src目录下，包括api(获取数据方法)、base(公共组件)、common(公共的静态资源)、components(功能组件)、router(路由)、store(vuex)这6个目录

    - api // 获取数据方法
        recommend.js // 获取推荐页面的数据
        rank.js // 获取排行页面的数据
        singer.js // 获取歌手数据
        ...
       
    - base // 存放公共组件
        confirm.vue // 确认对话框组件
        scroll.vue // 移动端滚动组件
        slider.vue // 轮播图组件
        ...
   
    - common // 存放公共的静态资源
        -fonts // 存放图标字体
        -image // 存放图片
        -js // 存放公共方法
            cache.js // 浏览器存储
            jsonp.js // 跨域获取数据
            mixin.js // 组件共用的方法
            util.js // 其他工具方法
            ...
         -stylus // 存放样式
         
    - components // 存放功能组件
        recommend.vue // 推荐页面组件
        singer.vue // 歌手页面组件
        rank.vue // 排行榜页面组件
        search.vue // 搜索页面组件
        ...
        
      - router // 存放路由
          index.js
          
      - store // 存放vuex
          index.js
        
【公共组件】<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;封装了确认对话框组件、通讯录列表组件、加载态组件、无结果展示组件、进度条组件、圆形进度条组件、移动端滚动组件、搜索框组件、搜索列表组件、轮播图组件、开关切换组件、顶部消息提示组件、歌曲列表组件等13个公共组件

    confirm.vue // 确认对话框组件
    listview.vue // 通讯录列表组件
    loading.vue // 加载态组件
    no-result.vue // 无结果展示组件
    progress-bar.vue // 进度条组件
    progress-circle.vue // 圆形进度条组件
    scroll.vue // 移动端滚动组件
    search-box.vue // 搜索框组件
    search-list.vue // 搜索列表组件
    slider.vue // 轮播图组件
    switches.vue // 开关切换组件
    top-tip.vue // 顶部消息提示组件
    song-list.vue // 歌曲列表组件
    
【功能组件】<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;封装了添加歌曲到列表组件、歌单详情页组件、页面头部组件、歌曲列表页面组件、播放器内核组件、播放列表组件、排行榜页面组件、推荐页面组件、搜索页面组件、歌手页面组件、歌手详情页组件、搜索提示列表组件、顶部导航栏组件、排行榜详情页组件、用户中心页组件等15个组件

    add-song.vue // 添加歌曲到列表组件
    disc.vue // 歌单详情页组件
    m-header.vue // 页面头部组件
    music-list.vue // 歌曲列表页面组件
    player.vue // 播放器内核组件
    playlist.vue // 播放列表组件
    rank.vue // 排行榜页面组件
    recommend.vue // 推荐页面组件
    search.vue // 搜索页面组件
    singer.vue // 歌手页面组件
    singer-detail.vue // 歌手详情页组件
    suggest.vue // 搜索提示列表组件
    tab.vue // 顶部导航栏组件
    top-list.vue // 排行榜详情页组件
    user-center.vue // 用户中心页组件
