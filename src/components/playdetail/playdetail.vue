<template>
  <div class="container">
    <div class="lrc col-md-8">
      <img :src="song.image" alt="song.name" class="col-md-4 img-responsive center-block">
      <scroll class="right col-md-8" :data="lrcdata" @scroll="scroll">
        <div class="showsrc">
          <h2>{{song.name}}</h2>
          <p v-for="item in lrc">{{item}}</p>
        </div>
      </scroll>
    </div>
    <scroll class="list col-md-4">
      <ul class="list">
        <!-- {{playlist}} -->
        <li v-for="item in playlist" :key="item.id">{{item.name}}</li>
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
    song (newval) {
      let lrc = newval.getLyric().then((res) => {
        this.lyric = res
      })
    },
    lyric (str) {
      this.lrc = str.split('\n')
    }
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
      'currentIndex'
    ])
  },

  mounted () {
    this.getlrc(this.song)
  },

  methods: {
    getlrc (song) {
      let lrc = song.getLyric().then((res) => {
        this.lyric = res
      })
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
}
</style>
