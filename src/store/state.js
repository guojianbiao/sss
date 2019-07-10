import { playMode } from 'common/js/config'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1, // 当前播放歌曲的索引
  disc: {},
  topList: {},
  searchHistory: []
}

export default state