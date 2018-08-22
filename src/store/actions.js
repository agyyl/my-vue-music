import * as types from './mutation-types'
import {
  playMode
} from 'assets/js/config'
import {
  shuffle
} from 'assets/js/util'
import {
  savePlaylist,
  savePlayReal,
  saveIndex,
  saveMyFavorite
} from 'assets/js/cache'

let findIndex = function (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

// 选择歌单中的一首歌,
export const chooseSong = function ({ commit, state }, { disc, item }) {
  // 需要动作:
  // 1 将歌单保存为正在播放歌单
  // 2 如果播放模式为 随机播放, 打乱歌单
  // 3 保存选中歌曲的索引为当前播放歌曲的索引
  // 4 将 播放状态 改为 true
  let playlist = disc
  let index = findIndex(disc, item)
  let playlistreally = playlist
  if (state.playMode === playMode.random) {
    playlistreally = shuffle(playlist)
    index = findIndex(playlistreally, item)
  }

  commit(types.SET_PLAYING_LIST, savePlaylist(playlist))
  commit(types.SET_PLAYING_LIST_REALL, savePlayReal(playlistreally))
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_PLAYING_CURRENT_TIME, 0)
}

// 播放歌曲索引 +1
export const indexPlus = function ({ commit, state }) { // index 加一
  let index = state.currentIndex
  index += 1
  let flag = false
  if (index >= state.playlist.length) { // 列表播放完
    index = 0
    flag = true
  }
  saveIndex(index)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)

  return flag
}

// 播放歌曲索引 -1
export const indexSubstraction = function ({ commit, state }) {
  // index 减一
  let index = state.currentIndex
  index -= 1
  if (index < 0) { // 列表播放完
    if (state.mode === playMode.sequence) {
      index = 0
    } else {
      index = state.playlist.length - 1
    }
  }
  saveIndex(index)
  commit(types.SET_CURRENT_INDEX, index)
}

export const toggleSaveSong = function ({ commit, state }, song) {
  let newObj = state.myFavouriteSongs || {
    name: '我喜欢的音乐'
  }
  newObj.songs = state.myFavouriteSongs ? state.myFavouriteSongs.songs || [] : []
  let newList = newObj.songs.slice(0)
  let index = newList.findIndex((item) => {
    return item.id === song.id
  })
  console.log(index, 'index')
  if (index === -1) {
    newList.push(song)
  } else {
    newList.splice(index, 1)
  }
  console.log(newList)
  newObj.songs = newList
  commit(types.SET_MY_FAVOURITE_SONGS, saveMyFavorite(newObj))
}
