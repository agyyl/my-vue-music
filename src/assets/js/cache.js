import storage from 'good-storage'

const SEARCH_KEY = '__search__' // 搜索历史
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__' // 播放历史
// const PLAY_MAX_LEN = 200

const PLAYLIST_KEY = '__playlist__' // 播放列表
// const PLAYLIST_MAX_LEN = 200

const PLAYLIST_REAL_KEY = '__playlistreal__' // 实际播放列表
// const PLAYLIST_REAL_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__' // 收藏歌曲列表
// const FAVORITE_MAX_LEN = 200

const FAVORITELIST_KEY = '__favoritelist__' // 收藏歌单
// const FAVORITELIST_MAX_LEN = 50

const CURRENT_INDEX_KEY = '__currentIndex__' // 歌曲播放索引

const PLAYVOL_KEY = '__playVol__' // 歌曲播放音量

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 搜索列表
export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

// 播放历史列表

export function loadPlay () {
  return storage.get(PLAY_KEY, [])
}

// 当前播放列表
export function savePlaylist (list) {
  storage.set(PLAYLIST_KEY, list)
  return list
}

export function savePlayReal (list) {
  storage.set(PLAYLIST_REAL_KEY, list)
  return list
}

export function loadPlayList () {
  return storage.get(PLAYLIST_KEY, [])
}

export function loadPlayListReal () {
  return storage.get(PLAYLIST_REAL_KEY, [])
}

export function saveIndex (index) {
  storage.set(CURRENT_INDEX_KEY, index)
}

export function loadIndex () {
  return storage.get(CURRENT_INDEX_KEY, 0)
}

// 收藏列表
export function saveFavorite (songs) {
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite () {
  return storage.get(FAVORITE_KEY, [])
}

// 收藏歌单列表
export function saveFavoriteList (lists) {
  storage.set(FAVORITELIST_KEY, lists)
  return lists
}

export function loadFavoriteList () {
  return storage.get(FAVORITELIST_KEY, [])
}

export function savePlayVol (vol) {
  storage.set(PLAYVOL_KEY, vol)
  return vol
}

export function loadVol () {
  return storage.get(PLAYVOL_KEY, 1)
}
