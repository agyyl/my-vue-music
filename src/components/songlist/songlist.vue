<template>
  <div id="songlist">
    <scroll class="listshow">
      <div>
        <div v-for="item in discList" :key="item.dissid" @click="slecklist(item)" class="listName">
          <img :src="item.imgurl" alt="item.dissnae" width="35" height="35">
          <p>{{item.dissname}}</p>
        </div>
      </div>
    </scroll>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getRecommend, getDiscList, getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
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

  components: {
    Scroll
  },

  methods: {
    slecklist (item) {
      if (!item.dissid) {
        return
      }
      getSongList(item.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songlist = res.cdlist[0].songlist
          this.$router.push({
            path: `/songlist/${item.dissid}`
          })
          processSongsUrl(this._normalizeSongs(this.songlist)).then(songs => {
            this.setDisc(songs)
          })
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
  overflow: hidden;
  .listshow {
    width: 100%;
    height: 100%;
    .listName {
      height: 40px;
      margin: 5px;
      padding-left: 30px;
      cursor: pointer;
      img {
        width: 35px;
        height: 35px;
      }
      p {
        display: inline-block;
        margin-left: 5px;
      }
    }
  }
}
</style>
