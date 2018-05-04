<template>
  <div id="songlist">
    <div class="listshow">
      <div v-for="item in discList" :key="item.dissid" @click="slecklist(item)">
        {{item.dissname}}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetter, mapMutations, mapActions } from 'vuex'
import { getRecommend, getDiscList, getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { addClass } from 'assets/js/dom'
import { createSong, isValidMusic, processSongsUrl } from 'assets/js/song'

export default {
  data () {
    return {
      recommends: [], // QQ音乐 推荐 轮播图
      discList: [], // QQ音乐 首页 推荐歌单
      songlist: []
    }
  },

  created () {
    this._getRecommend()

    this._getDiscList()
  },

  // components: {},

  // computed: {},

  // mounted: {},

  methods: {
    slecklist (item) {
      getSongList(item.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songlist = res.cdlist[0].songlist
          this.$router.push({
            path: `/songlist/${item.dissid}`
          })
          processSongsUrl(this._normalizeSongs(this.songlist)).then(songs => {
            this.setDisc(songs)
          })
          // console.log(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach(musicData => {
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
          // console.log(res.data.list)
        }
      })
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}

</script>
<style lang='scss' scoped>
#songlist {
  position: absolute;
  top: 70px;
  bottom: 50px;
  left: 0;
  right: 0;
  border: 3px solid green;
  // height: 100%;
  .listshow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 9;
  }
}
</style>
