<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="song in songs" :key="song.name">
        <div class="content">
          <h1 class="name">{{ song.name }}</h1>
          <p class="desc">{{ song.name }} <span class="dot">.</span> {{ song.album }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  }
  // methods: {
  //   getDesc(song) {
  //     return `${song.name} . ${song.album}`
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height 64px
      font-size $font-size-medium
      .content
        flex 1
        line-height 20px
        overflow hidden
        .name
          no-wrap()
          color $color-text
        .desc
          no-wrap()
          margin-top 4px
          color $color-text-d
          .dot
            position relative
            top -3px
</style>
