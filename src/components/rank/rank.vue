<template>
  <div class="rank">
    <scroll class="toplist" :data="topList">
      <ul>
        <li class="item" v-for="(list, index) in topList" :key="index">
          <div class="icon">
            <img v-lazy="list.picUrl" alt="" width="100" height="100">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(item, index) in list.songList" :key="item.singername">
              <span>{{ index + 1 }}</span>
              <span>{{ item.songname }} - {{ item.singername }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { getTopList } from 'api/rank'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'

export default {
  components: {
    Scroll
  },
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    _getTopList() {
      getTopList().then((res) => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .rank
    position fixed
    width 100%
    top 88px
    bottom 0
    .toplist
      height 100%
      overflow hidden
      .item
        display flex
        margin 0 20px
        padding-top 20px
        height 100px
        &:last-child
          padding-bottom 20px
        .icon
          flex 0 0 100px
          width 100px
          height 100px
        .songlist
          flex 1
          display flex
          flex-direction column
          justify-content center
          padding 0 20px
          height 100px
          overflow hidden
          background $color-highlight-background
          color $color-text-d
          font-size $font-size-small
          .song
            no-wrap()
            line-height 26px
</style>
