import * as types from './mutation-types'
import { playMode } from 'assets/js/config'
import { shuffle } from 'assets/js/util'

let findIndex = function (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const chooseSong = function ({commit, state}, {list, song}) {
  let playlist = [...list]
  let playlistreally = playlist
  if (state.playMode === playMode.random) {
    playlistreally = shuffle(list)
  }
  let index = findIndex(playlistreally, song)

  console.log(index)
  commit(types.SET_PLAYING_LIST, playlist)
  commit(types.SET_PLAYING_LIST_REALL, playlistreally)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_PLAYING_CURRENT_TIME, 0)
}
