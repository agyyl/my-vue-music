const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

const tagRegMap = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by'
}

function noop () {}

export default class Lyric {
  constructor (lrc, hanlder = noop) {
    this.lrc = lrc // 歌词文本
    this.tags = {}
    this.lines = []
    this.handler = hanlder
    this.curLine = 0

    this._init()
  }

  _init () {
    this._initTag()

    this._initLines()
  }

  _initTag () { // 初始化 属性
    for (let tag in tagRegMap) {
      const matches = this.lrc.match(new RegExp(`\\[${tagRegMap[tag]}:([^\\]]*)]`, 'i'))
      this.tags[tag] = (matches && matches[1]) || ''
    }
  }

  _initLines () { // 初始化行数组 lines
    const lines = this.lrc.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let result = timeExp.exec(line)
      if (result) {
        const txt = line.replace(timeExp, '').trim() // 歌词文本
        if (txt) {
          this.lines.push({
            time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10, // 歌词播放事件
            txt,
            index: this.lines.length - 1
          })
        }
      }
    }

    this.lines.sort((a, b) => {
      return a.time - b.time
    })
  }

  _findCurNum (time) { // 找出正在播放哪一行
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i - 2
      }
    }
    return this.lines.length - 1
  }

  _callHandler (i) { // 调用回调函数
    if (i < 0) {
      return
    }
    this.handler(i)
  }

  setTime (time) {
    time *= 1000
    if (this.offset) {
      time += this.offset
    }
    if (!this.lines.length) {
      return
    }
    this.curNum = this._findCurNum(time)
    this._callHandler(this.curNum)
  }
}
