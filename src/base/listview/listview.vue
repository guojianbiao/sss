<template>
  <scroll
    class="listview"
    :data="data"
    ref="listview"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType"
  >
    <ul>
      <li class="list-group" v-for="(group, index) in data" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="handleClickItem(item)" class="list-group-item" v-for="item in group.items" :key="item.id">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li class="item"
            v-for="(item, index) in shortcutList"
            :key="index"
            :data-index="index"
            :class="{'current': currentIndex === index}"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixedTop">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>
    </div>
    <div class="loading-container" v-if="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1 // 滚动固定标题实现
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    handleClickItem(item) {
      console.log(item)
      this.$emit('select', item)
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      // 记录开始的时候的索引
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
      // 第二种方法
      // let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      // console.log(anchorIndex)
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        // 因为this.listHeight的长度是24，且最后一个listgroup的索引是22，所以要减2
        index = this.listHeight.length - 2
      }
      // console.log(index)
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    // 计算每个listGroup的高度
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    },
    refresh() {
      this.$refs.listview.refresh()
    }
  },
  watch: {
    // 监听传给listview中data数据的变化，调用计算高度函数
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // console.log(newY)
      // 当滚动到最顶部的时候 newY > 0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 当滚动到中间的时候
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if ((-newY >= height1 && -newY < height2)) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到最底部的时候，且 -newY 大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? (newVal - TITLE_HEIGHT) : 0
      // 了减少后续的 DOM 操作
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixedTop.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .listview
    position relative
    width 100%
    height 100%
    overflow hidden
    background $color-background
    .list-group
      padding-bottom 30px
      .list-group-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background: $color-highlight-background
      .list-group-item
        display flex
        align-items center
        padding 20px 0 0 30px
        .avatar
          width 50px
          height 50px
          border-radius 50%
        .name
          margin-left 20px
          color: $color-text-l
          font-size $font-size-medium
    .list-shortcut
      position absolute
      z-index 30
      right 0
      top 50%
      transform translateY(-50%)
      width 20px
      padding 20px 0
      border-radius 10px
      text-align center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding 3px
        line-height 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position absolute
      top 0
      left 0
      width 100%
      .fixed-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
    .loading-container
      position absolute
      top 50%
      width 100%
      transform translateY(-50%)
</style>
