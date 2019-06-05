/* eslint-disable no-sequences */
import { getSongUrl } from 'api/song'
import { ERR_OK } from 'api/config'

/* eslint-disable no-unused-expressions */
export default class Song {
  constructor({id, mid, singer, name, duration, image, url, album}) {
    this.id = id,
    this.mid = mid,
    this.singer = singer,
    this.name = name,
    this.duration = duration,
    this.image = image,
    this.url = url,
    this.album = album
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: musicData.url,
    album: musicData.albumname
  })
}

// 处理付费歌曲
export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  return getSongUrl(songs).then((res) => {
    if (res.code === ERR_OK) {
      let midUrlInfo = res.url_mid.data.midurlinfo
      midUrlInfo.forEach((info, index) => {
        let song = songs[index]
        song.url = `http://dl.stream.qqmusic.qq.com/${info.purl}`
      })
    }
    return songs
  })
}

// 处理singer数据
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}