import { playMode } from 'assets/js/config'
import { loadPlayList, loadPlayListReal, loadIndex, loadFavorite } from 'assets/js/cache'

const state = {
  playing: false,
  currenttime: 0, // 当前播放时间
  mode: playMode.sequence,
  currentIndex: loadIndex(), // 播放歌曲的索引
  playlist: loadPlayList(), // 播放列表
  playlistreally: loadPlayListReal(), // 随机播放时的歌单(打乱顺序后)
  disc: [], // 推荐的歌单
  saveList: [], // 收藏的歌曲的列表
  saveSongList: loadFavorite(), // 收藏的歌单

  searchHistory: [], // 搜索历史
  playHistory: [], // 播放历史
  totalTime: 0
}

export default state
