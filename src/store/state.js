import { playMode } from 'assets/js/config'

const state = {
  playing: false,
  currenttime: 0,
  mode: playMode.sequence,
  currentIndex: -1,
  playlist: [],
  playlistreally: [],
  disc: [] // 显示的歌单
}

export default state
