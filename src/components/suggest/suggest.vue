<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSearch } from 'api/search'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: []
    }
  },
  methods: {
    _getSearch() {
      getSearch(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this._genResult(res.data).then((result) => {
            this.result = result
          })
        }
      })
    },
    // 对获取到的数据进行想要的结果处理
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push(...data.zhida, ...{ type: TYPE_SINGER })
      }
      return processSongsUrl(this._normalizeSongs(data.song.list)).then((songs) => {
        ret = ret.concat(songs)
        return ret
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    getIconCls(item) {
      if(item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if(item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    }
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        return
      }
      this._getSearch(newQuery)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height 100%
    overflow hidden
    .suggest-list
      padding 0 30px
      .suggest-item
        display flex
        align-items center
        padding-bottom 20px
        .icon
          flex 0 0 30px
          width 30px
          [class^="icon-"]
            font-size 14px
            color $color-text-d
        .name
          flex 1
          font-size $font-size-medium
          color $color-text-d
          overflow hidden
          .text
            no-wrap()
</style>
