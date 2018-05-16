<template>
  <div id="listdetail">
    <scroll class="listshow" v-if="disc">
      <div class="song">
        <!-- <div>{{disc[0]}}</div> -->
         <div v-for="item in disc" :key="item.id" @click="choosesSong({disc,item})">{{item.name}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { getSongList } from 'api/recommend'
// import { ERR_OK } from 'api/config'
// import { createSong, isValidMusic, processSongUrl, getSongsUrl } from 'assets/js/song'
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

  watch: {
  },

  computed: {
    ...mapGetters([
      'disc'
    ])
  },

  // mounted: {},

  created () {
    if (this.disc.length) {
      this.$router.push(`/songlist`)
      console.log(this.disc[0])
    }
  },

  methods: {
    choosesSong ({disc, item}) {
      // 将这首歌添加到 播放器 当前播放列表
      // 跳转到 播放页面
      this.$router.push({
        path: '/playdetail'
      })
      this.chooseSong({disc, item})
    },
    ...mapActions([
      'chooseSong'
    ])
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
    .song {
      margin: 5px;
      padding-left: 5px;
      cursor: pointer;
    }
  }
}
</style>
