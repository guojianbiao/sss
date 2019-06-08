<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :data="songs"
      class="list"
      ref="list"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      @scroll="scroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'

const RESERVED_HEIGHT = 40
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    SongList,
    Scroll
  },
  data() {
    return {
      scrollY: 0
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    // 滚动的最小值
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    // 这里是普通 DOM 节点 
    this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
  },
  methods: {
    scroll(pos) {
      // console.log(pos.y)
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY(newY) {
      // 取一组数字中的最大值
      let tranlateY = Math.max(this.minTranslateY, newY)
      let zIndex = 0
      // console.log('newy:' + newY)
      // console.log('minTranslateY:' + this.minTranslateY)
      // console.log('tranlateY:' + tranlateY)
      // 这里是组件节点
      this.$refs.layer.style['transform'] = `translate3d(0, ${tranlateY}px, 0)`
      this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${tranlateY}px, 0)`
      if (newY < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = '40px'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
      }
      this.$refs.bgImage.style.zIndex = zIndex
    }
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgImage})`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index 100
    background $color-background
    .back
      position absolute
      top 0
      left 6px
      z-index 50
      .icon-back
        display block
        padding 10px
        font-size $font-size-large-x
        color $color-theme
    .title
      position absolute
      top 0
      left 10%
      width 80%
      z-index 40
      no-wrap()
      text-align center
      line-height 40px
      font-size $font-size-large
      color $color-text
    .bg-image
      position relative
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-size cover
      .filter
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background rgba(7, 17, 27, 0.4)
    .bg-layer
      position relative
      height 100%
      background $color-background
    .list
      position absolute
      top 0
      bottom 0
      width 100%
      // overflow hidden
      background: $color-background
      .song-list-wrapper
        padding 20px 30px
</style>
