<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches>
      </div>
      <div class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listwrapper">
        <scroll class="list-scroll" v-if="currentIndex === 0" :data="favoriteList" ref="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectItem"></song-list>
          </div>
        </scroll>
        <scroll v-if="currentIndex === 1" :data="playHistory" class="list-scroll" ref="historyList">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectItem"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import NoResult from 'base/no-result/no-result'
import Song from 'common/js/song'
import { playlistMixin } from 'common/js/mixin'
import { mapGetters, mapActions } from 'vuex'

export default {
  mixins: [playlistMixin],
  components: {
    Switches,
    Scroll,
    SongList,
    NoResult
  },
  data() {
    return {
      switches: [
        {name: '我喜欢的'},
        {name: '最近听的'}
      ],
      currentIndex: 0
    }
  },
  computed: {
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    noResultDesc() {
      if (this.currentIndex === 0) {
        return '暂无收藏歌曲'
      } else {
        return '你还没有听过歌曲'
      }
    },
    ...mapGetters([
      'favoriteList',
      'playHistory'
    ])
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.listwrapper.style.bottom = bottom
      // if (this.currentIndex === 0) {
      //   this.$refs.favoriteList.refresh()
      // } else {
      //   this.$refs.historyList.refresh()
      // }
      // 第二种方法
      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.historyList && this.$refs.historyList.refresh()
    },
    back() {
      this.$router.back()
    },
    switchItem(index) {
      this.currentIndex = index
      // this.refreshList()
    },
    selectItem(item) {
      this.insertSong(new Song(item))
    },
    // refreshList() {
    //   setTimeout(() => {
    //     if (this.currentIndex === 0) {
    //       this.$refs.favoriteList.refresh()
    //     } else {
    //       this.$refs.historyList.refresh()
    //     }
    //   }, 20)
    // },
    random() {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      if (list.length === 0) {
        return
      }
      list = list.map((song) => {
        return new Song(song)
      })
      this.randomPlay({
        list
      })
    },
    ...mapActions([
      'insertSong',
      'randomPlay'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .user-center
    position fixed
    top 0
    bottom 0
    width 100%
    z-index 100
    background $color-background
    &.slide-enter-active, &.slide-leave-active
      transition all 0.3s
    &.slide-enter, &.slide-leave-to
      transform translate3d(100%, 0, 0)
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
    .switches-wrapper
      margin 10px 0 30px 0
    .play-btn
      width 135px
      text-align center
      padding 7px 0
      margin 0 auto
      border 1px solid $color-text-l
      box-sizing border-box
      color $color-text-l
      border-radius 100px
      font-size 0
      // display flex
      // align-items center
      // justify-content center
      .icon-play
        display inline-block
        vertical-align middle
        margin-right 6px
        font-size $font-size-medium-x
      .text
        display inline-block
        vertical-align middle
        font-size $font-size-small
    .list-wrapper
      position absolute
      top 110px
      bottom 0
      width 100%
      .list-scroll
        height 100%
        overflow hidden
        .list-inner
          padding 20px 30px
    .no-result-wrapper
      position absolute
      top 50%
      width 100%
      transform translateY(-50%)
</style>
