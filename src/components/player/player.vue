<template>
  <!-- 播放器组件 -->
  <div id="player" class="container">
    <div class="song col-md-10 col-md-offset-1 container">
      <!-- 左侧 控制 暂停 上下一首 歌 -->
      <div class="control1 col-md-2">
        <audio :src="currentsong.url"
          ref="aud" @ended="playEnd"
          @loadedmetadata="getTotalTime"
          @canplay="playSong"
          @timeupdate="timechange"
        >
          您的浏览器不支持 audio 标签
        </audio>
        <span @click="lastSong">
          <i class="glyphicon glyphicon-step-backward lastsong"></i>
        </span>
        <span class="playing" @click="playtoggle">
          <!-- <i class="glyphicon" :class="{'glyphicon-play' :playing, 'glyphicon-pause': !playing}"></i> -->
          <i class="glyphicon" ref="pause" :class="{'glyphicon-play': !playing, 'glyphicon-pause': playing}"></i>
          <!-- <i class="glyphicon glyphicon-pause"></i> -->
        </span>
        <span @click="nextSong">
          <i class="glyphicon glyphicon-step-forward nextsong"></i>
        </span>
      </div>

      <!-- 显示 歌曲进度条,歌曲信息 -->
      <div class="show col-md-8">
        <!-- 歌曲图片 -->
        <div class="pic col-md-1 col-md-offset-1">
          <a href=""><img :src="currentsong.image" alt=""></a>
        </div>

        <!-- 播放信息 -->
        <div class="playinfo col-md-10">
          <!-- 歌曲信息 -->
          <div class="songinfo">
            <a class="songname">{{currentsong.name}}</a>
            <a class="singer">{{currentsong.singer}}</a>
          </div>

          <!-- 进度信息 -->
          <div class="playcurrent container">
              <!-- 进度条 -->
              <div class="jindutiao col-md-9" v-drag="changeCurrentTime">
                <div class="currenttimeshow"
                  ref="currenttimeshow"
                >
                  <div class="dot"></div>
                </div>
              </div>

              <!-- 播放时间 -->
              <div class="currenttime col-md-3">
                <span class="currenttimenumber">{{parsedCurrentTime}}</span> / <span class="alltime">{{parsedTotalTime}}</span>
              </div>
          </div>

        </div>
        <!-- 播放信息结束 -->

      </div>
      <!-- 右侧 控制 音量 播放模式 收藏 -->
      <div class="control2 col-md-2 container">
        <span class="fav col-md-4 item" @click="toggleSaveSong(currentsong)">
          <i class="glyphicon" :class="[saved ? 'glyphicon-heart' : 'glyphicon-heart-empty']"></i>
          <!-- <i class="glyphicon glyphicon-heart"></i> -->
        </span>
        <div class="vol col-md-4 item">
          <drag class="volshow" direction="vertical" @changePercent="changeVol" v-show="showVol">
            <div class="dragable">
              <span class="dotOut"></span>
              <span class="douIn"></span>
            </div>
          </drag>
          <i class="glyphicon glyphicon-volume-up" @click.left="toggleVol"></i>
          <!-- <i class="glyphicon glyphicon-volume-off"></i> -->
        </div>
        <span class="playmode col-md-4 item">
          <i class="glyphicon glyphicon-random"></i>
          <!-- <i class="glyphicon glyphicon-retweet"></i> -->
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'assets/js/config'
import { removeClass, addClass, hasClass } from 'assets/js/dom'
import Drag from 'base/drag/drag'

export default {
  data () {
    return {
      lyric: '',
      per: 0,
      showVol: false
    }
  },

  computed: {
    currentsong: function () {
      let list = (this.mode === playMode.random) ? this.playinglist : this.playlistreally
      return list[this.currentIndex] || {}
    },

    buffered () {
      return this.$refs.aud ? this.$refs.aud.buffered : 0
    },

    saved () {
      return this.isSaved(this.currentsong)
    },

    parsedTotalTime () {
      return this.parsetime(this.totalTime)
    },

    parsedCurrentTime () {
      return this.parsetime(this.currenttime)
    },

    ...mapGetters([
      'playlist',
      'playlistreally',
      'mode',
      'currentIndex',
      'playing',
      'currenttime',
      'saveList',
      'totalTime'
    ])
  },

  watch: {
    playing (newval) {
      this.$nextTick(() => {
        this.testPlaying()
      })
      if (newval === hasClass(this.$refs.pause, 'glyphicon-play')) {
        this._toggleClass(this.$refs.pause, 'glyphicon-play')
        this._toggleClass(this.$refs.pause, 'glyphicon-pause')
      }
    }
  },

  methods: {
    toggleVol () {
      this.showVol = !this.showVol
    },
    changeVol (per) {
      if (!this.$refs.aud) {
        return
      }
      per = 1 - per
      this.$refs.aud.volume = per
    },
    changeCurrentTime (percent, bool) {
      this.testPlaying()
      let time = this.totalTime * percent
      this.setPer(time) // 设置播放百分比
      time = parseInt(time * 10) / 10
      if (time !== this.currenttime) {
        if (this.currentChangeTimer) {
          clearTimeout(this.currentChangeTimer)
        }
        this.currentChangeTimer = setTimeout(() => {
          this.setCurrentTime(time)
          this.testPlaying()
        }, 60)
      }
    },
    playSong () {
      if (this.$refs.aud.timer) {
        clearTimeout(this.$refs.aud.timer)
      }
      this.$refs.aud.timer = setTimeout(this.testPlaying, 300)
    },

    timechange () {
      let time = this.$refs.aud ? this.$refs.aud.currentTime : 0 // 获得已播放时长
      this.setPer(time) // 设置播放百分比
      time = parseInt(time * 10) / 10
      if (time !== this.currenttime) {
        this.setCurrentTime(time)
      }
    },

    setPer (time) {
      let per = parseInt(time / parseInt(this.totalTime) * 1000) / 10
      if (this.$refs.currenttimeshow) {
        this.$refs.currenttimeshow.style.width = per + '%'
      }
    },

    parsetime (time) {
      time = parseInt(time)
      let min = (time % 60 < 10 ? '0' : '') + time % 60
      return parseInt(time / 60) + ':' + min
    },
    getTotalTime () {
      let time = parseInt(this.$refs.aud.duration)
      this.setTotalTime(time)
    },

    testPlaying () {
      if (this.playing) {
        if (parseInt(this.currenttime) !== parseInt(this.$refs.aud.currentTime)) {
          this.$refs.aud.currentTime = this.currenttime
        }
        this.$refs.aud.play()
      } else {
        this.$refs.aud.pause()
      }
    },
    nextSong () {
      let flag = false
      this.indexPlus().then((res) => {
        flag = res
      })
      if (flag) {
        this.setPlaying(false)
      }
    },
    lastSong () {
      this.indexSubstraction()
    },
    playEnd () { // 一首歌播放结束
      this.nextSong()
    },

    _toggleClass (el, cla) {
      if (hasClass(el, cla)) {
        removeClass(el, cla)
      } else {
        addClass(el, cla)
      }
    },

    playtoggle () {
      if (!this.playing) {
        this.$refs.aud.play()
      } else {
        this.$refs.aud.pause()
      }
      this.setPlaying(!this.playing)
    },

    isSaved (song) {
      return this.saveList && this.saveList.some((item) => {
        return item.id === song.id
      })
    },

    ...mapActions([
      'indexPlus',
      'indexSubstraction',
      'toggleSaveSong'
    ]),
    ...mapMutations({
      setPlaying: 'SET_PLAYING_STATE',
      setTotalTime: 'SET_TOTAL_TIME',
      setCurrentTime: 'SET_PLAYING_CURRENT_TIME'
    })
  },

  directives: {
    drag: {
      bind: function (el, binding) {
        let oDiv = el // 当前元素
        let getLeft = function (ele) {
          let left = parseInt(ele.offsetLeft)
          if (ele.offsetParent) {
            let supLeft = getLeft(ele.offsetParent)
            if (!isNaN(supLeft)) {
              left += supLeft
            }
          }
          return left
        }
        // let self = this // 上下文
        oDiv.onmousedown = function (e) {
          let left = getLeft(oDiv)
          // 鼠标按下，计算当前元素距离可视区的距离
          let l = e.clientX - left
          let getPer = function () {
            let per = l / oDiv.offsetWidth
            if (per >= 1) {
              per = 1
            } else if (per <= 0) {
              per = 0
            }
            return per
          }
          // binding.value(getPer())
          document.onmousemove = function (e) {
            l = e.clientX - left
            binding.value(getPer())
          }
          document.onmouseup = function (e) {
            l = e.clientX - left
            binding.value(getPer(), true)
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },

  components: {
    Drag
  }
}

</script>
<style lang='scss' scoped>
@import 'assets/css/variable.scss';
@import 'assets/css/mixin.scss';

#player {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: $color-background;
  color: #fff;
  .song {
    height: 100%;
    .control1 {
      line-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        flex: 1 1 auto;
        i {
          cursor: pointer;
        }
        .lastsong, .nextsong {
          @include circleborder(30px, 2px, #aaa);
          line-height: 26px;
          color: #aaa;
          &:hover {
            border-color: #fff;
            color: #fff;
            box-shadow: 0 0 1px 1px;
          }
        }
      }
      span.playing {
        i {
          @include circleborder(35px, 2px);
          line-height: 31px;
          &:hover {
            box-shadow: 0 0 1px 1px;
          }
        }
      }
    }
    .show {
      user-select:none;
      height: 100%;
      .pic {
        height: 100%;
        vertical-align: middle;
        img {
          margin-top: 10px;
          width: 30px;
          height: 30px;
        }
      }
      .playinfo {
        .songinfo {
          height: 20px;
          font-size: 0;
          a {
            font-size: 14px;
            margin-right: 10px;
            color: #fff;
            cursor: pointer;
            &:hover {
              text-decoration: none;
            }
            &.singer {
              color: #aaa;
            }
          }
        }
        .playcurrent {
          width: 100%;
          padding: 0;
          .jindutiao {
            margin-top: 10px;
            padding: 0;
            height: 8px;
            background-color: #aaa;
            border-radius: 4px;
            .currenttimeshow {
              position: relative;
              width: 0%;
              height: 100%;
              background-color: $color-theme-red;
              border-radius: 4px;
              .dot {
                position: absolute;
                right: -12px;
                top: 0;
                margin-top: -3px;
                @include circleborder(14px, 3px, #fff);
                background-color: $color-theme-red;
              }
            }
          }
          .currenttime {
            color: #888;
            .currenttimenumber {
              color: #aaa;
            }
          }
        }

      }

    }
    .control2 {
      .item {
        line-height: 50px;
        .glyphicon-heart {
          color: #ff0000
        }
      }
      .vol {
        position: relative;
        .volshow {
          position: absolute;
          top: -65px;
          left: 14px;
          width: 15px;
          height: 80px;
          background-color: #b10f0f;
          // z-index: 9;
          // background-color: #000000;
          .dragable {
            width: 5px;
            height: 80%;
            background-color: #fff;
            margin: 3px auto;
          }
        }
      }
    }
  }
}
</style>
