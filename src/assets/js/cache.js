import storage from 'good-storage'

const SEARCH_KEY = '__search__' // 搜索历史
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__' // 播放历史
const PLAY_MAX_LEN = 200

const PLAYLIST_KEY = '__playlist__' // 播放列表
const PLAYLIST_MAX_LEN = 200

const PLAYLIST_REAL_KEY = '__playlistreal__' // 实际播放列表
const PLAYLIST_REAL_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__' // 收藏歌曲列表
const FAVORITE_MAX_LEN = 200

const FAVORITELIST_KEY = '__favoritelist__' // 收藏歌单
const FAVORITELIST_MAX_LEN = 50

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

// 收藏列表
export function saveFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite () {
  return storage.get(FAVORITE_KEY, [])
}

// 收藏歌单列表
export function saveFavoriteList (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavoriteList (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavoriteList () {
  return storage.get(FAVORITE_KEY, [])
}
