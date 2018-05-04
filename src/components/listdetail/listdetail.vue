<template>
  <div id="listdetail">
    <scroll class="listshow">
      <div class="song" v-if="this.disc">
        <div>{{disc[0]}}</div>
        <div v-for="item in this.disc" :key="item.albumid">{{item.albumname}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { createSong, isValidMusic, processSongUrl } from 'assets/js/song'
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      list: []
    }
  },

  components: {
    Scroll
  },

  computed: {
    ...mapGetters([
      'disc'
    ])
  },

  // mounted: {},

  // created () {
  //   this.list = this.disc()
  // },

  methods: {
  }
}

</script>
<style lang='scss' scoped>
#listdetail {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #FFF;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 99;
  .listshow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
