import { playMode } from 'assets/js/config'

const state = {
  playing: false,
  currenttime: 0, // 当前播放时间
  mode: playMode.sequence,
  currentIndex: -1, // 播放歌曲的索引
  playlist: [], // 播放歌单
  playlistreally: [], // 随机播放时的歌单(打乱顺序后)
  disc: [], // 推荐的歌单
  saveList: [], // 收藏歌曲
  saveSongList: [], // 收藏歌单
  searchHistory: [] // 搜索历史
}

export default state
