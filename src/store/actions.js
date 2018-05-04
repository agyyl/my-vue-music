import * as types from './mutation-types'
import { playMode } from 'assets/js/config'
import { shuffle } from 'assets/js/util'
import { savePlaylist, savePlayReal } from 'assets/js/cache'

let findIndex = function (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const chooseSong = function ({commit, state}, song) {
  // 选择歌单中的一首歌,需要动作: 1 将歌曲添加至播放列表最后 2 如果播放模式为 随机播放, 打乱歌单 3 保存选中歌曲的索引为当前播放歌曲的索引 4 将 播放状态 改为 true
  let playlist = [...state.playlist]
  let index = findIndex(playlist, song)
  if (index === -1) {
    playlist.push(song)
    index = playlist.length - 1
  }
  let playlistreally = playlist
  if (state.playMode === playMode.random) {
    playlistreally = shuffle(playlist)
    index = findIndex(playlistreally, song)
  }
  console.log(playlist)
  console.log(index)
  console.log(song)
  console.log(playlistreally[index] === song)
  commit(types.SET_PLAYING_LIST, savePlaylist(playlist))
  commit(types.SET_PLAYING_LIST_REALL, savePlayReal(playlistreally))
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_PLAYING_CURRENT_TIME, 0)
}
