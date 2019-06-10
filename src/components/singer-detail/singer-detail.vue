<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong, processSongsUrl } from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    setTimeout(() => {
      this._getSingerDetail()
    }, 20)
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
            this.songs = songs
            // console.log('songs:' + this.songs)
          })
        }
      })
    },
    // 处理获取到的数据
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let { musicData } = item // 解构赋值
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      // console.log(ret)
      return ret
    }
  },
  // vuex中的getters里面的方法，相当于计算属性
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
