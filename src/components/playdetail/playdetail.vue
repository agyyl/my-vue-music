<template>
  <div class="container">
    <div class="lrc col-md-8">
      <img :src="song.image" alt="song.name" class="col-md-4 img-responsive center-block">
      <scroll class="right col-md-8" :data="lrcdata" @scroll="scroll">
        <div class="showsrc">
          <h2>{{song.name}}</h2>
          <p v-for="item in lrc"
            :key="item.name"
            ref="lyr"
          >
            {{item}}
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
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      lyric: '',
      lrc: [],
      lrcdata: []
    }
  },

  components: {
    Scroll
  },

  watch: {
    // song (newval) {
    //   let lrc = newval.getLyric().then((res) => {
    //     this.lyric = res
    //     console.log(this.lyric = res)
    //   })
    // }

    // currenttime (newval) {
    //   let min = newval / 60 >= 10 ? newval / 60 : '0' + newval / 60
    //   let sec = newval % 60 >= 10 ? newval % 60 : '0' + newval % 60
    //   let str = '/' + min + ':' + sec + '/'
    //   // let index = this.$refs.lyr.findIndex((item) => {
    //   //   return str.test(item)
    //   // })
    //   // console.log(this.$refs.lyr.findIndex[index])
    //   console.log(this.$refs.lyr)
    // }
  },

  computed: {
    song () {
      return new Song(this.playlistreally[this.currentIndex])
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
    this.getlrc(this.song)
  },

  methods: {
    getlrc (song) {
      console.log(song)
      let lrc = song.getLyric().then((res) => {
        this.lyric = res
        console.log(res)
      })
      // this.lyric = song.lyric.split('/n')
    },
    scroll () {
      console.log(1)
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
