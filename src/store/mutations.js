import * as types from './mutation-types'

const mutations = {
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_PLAYING_CURRENT_TIME] (state, time) {
    state.currenttime = time
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAYING_LIST] (state, list) {
    state.playlist = list
  },
  [types.SET_PLAYING_LIST_REALL] (state, list) {
    state.playlistreally = list
  },
  [types.SET_DISC] (state, list) {
    state.disc = list
  },
  [types.SET_SAVE_LIST] (state, list) { // 设置收藏的 歌曲的列表
    state.saveMyList = list
  },
  [types.SET_SAVE_SONG_LIST] (state, list) { // 设置收藏的 歌曲列表(收藏的歌单)
    state.saveSongList = list
  },
  [types.SET_SEARCH_HISTORY] (state, list) {
    state.searchHistory = list
  },
  [types.SET_PLAY_HISTORY] (state, list) {
    state.playHistory = list
  },
  [types.SET_TOTAL_TIME] (state, time) {
    state.totalTime = time
  },
  [types.SET_MY_FAVOURITE_SONGS] (state, list) {
    state.myFavouriteSongs = list
  }
}

export default mutations
