<template>
  <div class="container">
    <div class="lrc col-md-8">
      <img :src="song.image" alt="song.name" class="col-md-4 img-responsive center-block">
      <scroll class="right col-md-8" :data="lrcdata" @scroll="scroll" ref="lyricList">
        <div class="showsrc">
          <h2>{{song.name}}</h2>
          <p v-for="item in lyric.lines"
            :key="item.name"
            ref="lyricLine"
            class="lrcline"
            :class="{currentline: currentLineNum === item.index}"
          >
            {{item.txt}}
          </p>
        </div>
      </scroll>
    </div>
    <scroll class="list col-md-4">
      <ul class="listshow">
        <li v-for="item in playlist"
          :key="item.id"
          class="list-style"
        >{{item.name}}</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Song from 'assets/js/song'
import Scroll from 'base/scroll/scroll'
import Lyric from 'assets/js/lyrparse'

export default {
  data () {
    return {
      lyric: '',
      lrcdata: [],
      lrc: '',
      currentLineNum: ''
    }
  },

  components: {
    Scroll
  },

  watch: {
    playing (newval) {
      if (newval) {
        this.play()
      } else {
        this.stop()
      }
    }
  },

  computed: {
    song () {
      let newSong = new Song(this.playlistreally[this.currentIndex])
      this.getlrc(newSong)
      return newSong
    },
    ...mapGetters([
      'playing',
      'currenttime',
      'playlist',
      'playlistreally',
      'currentIndex',
      'totalTime'
    ])
  },

  mounted () {
    // this.getlrc(this.song)
  },

  methods: {
    getlrc (song) {
      song.getLyric().then((res) => {
        if (res) {
          this.lyric = new Lyric(res, this.handleLyric)
          if (this.playing) {
            this.play()
          }
        }
      })
    },
    scroll () {
      console.log(1)
    },
    handleLyric (lineNum) {
      if (!this.$refs.lyricLine) {
        return
      }
      if (lineNum > 5 && this.currentLineNum !== lineNum) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else if (lineNum < 5 && this.currentLineNum !== lineNum) {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.currentLineNum = lineNum
    },
    play () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.lyric.setTime(this.currenttime)
      }, 30)
    },
    stop () {
      clearInterval(this.timer)
    }
  }
}

</script>
<style lang='scss' scoped type="stylesheet/scss">
@import 'assets/css/variable.scss';

.container {
  position: absolute;
  top: $header-height;
  left: 0;
  right: 0;
  bottom: $player-height;
  // height: 100%;
  border: 3px solid green;
  .lrc {
    height: 100%;
    .right {
      height: 100%;
      border: 1px solid red;
      overflow: hidden;
      .showsrc {
        text-align: center;
        p {
          padding: 3px;
          &.currentline {
            color: #ff3e3e;
          }
        }
      }
    }
  }
  .list {
    height: 100%;
    overflow: hidden;
    border: 1px solid #aaa;
    .listshow {
      // height: 100px;
    }
  }
}
</style>
