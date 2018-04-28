import * as types from './mutation-types'

const mutations = {
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_PLAYING_CURRENT_TIME] (state, time) {
    state.currenttime = time
  },
  [types.SET_PLAYING_LIST] (state, list) {
    state.playlist = list
  },
  [types.SET_PLAYING_LIST_REALL] (state, list) {
    state.playlistreally = list
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  }
}
