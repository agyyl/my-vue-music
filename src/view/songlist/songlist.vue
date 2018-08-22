<template>
  <div id="songlist">
    <scroll class="listshow">
      <div>
        <div v-for="item in discList" :key="item.dissid" @click="slecklist(item)" class="listName" :class="{active: item.dissid === activeId}">
          <img :src="item.imgurl" alt="item.dissnae" width="35" height="35">
          <p>{{item.dissname}}</p>
        </div>
      </div>
    </scroll>
    <div class="songListDetail">
      <keep-alive>
        <router-view :disc="chooseList"></router-view>
      </keep-alive>
    </div>
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
      songlist: [],
      activeId: undefined, // 激活的歌单名称
      chooseList: [] // 选中的歌曲列表
    }
  },

  created () {
    this._getRecommend()

    this._getDiscList()
  },

  components: {
    Scroll
  },

  mounted () {

  },

  methods: {
    slecklist (item) {
      if (!item.dissid) {
        return
      }
      getSongList(item.dissid)
        .then((res) => {
          if (res.code === ERR_OK) {
            this.songlist = res.cdlist[0].songlist
            this.$router.push({
              path: `/songlist/${item.dissid}`
            })
            console.log(this._normalizeSongs(this.songlist))
            processSongsUrl(this._normalizeSongs(this.songlist))
              .then(songs => {
                this.setDisc(songs)
                this.chooseList = songs
              })
              .catch(e => {
                console.log(e)
              })
          }
        })
        .catch(e => {
          console.log(e)
        })
      this.activeId = item.dissid
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
          this.slecklist(this.discList[0])
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
  // border: 3px solid green;
  overflow: hidden;
  .listshow {
    width: 50%;
    height: 100%;
    padding-left: 40px;
    .listName {
      height: 40px;
      margin: 5px;
      padding-left: 30px;
      cursor: pointer;
      &:hover {
        background: #e0fcb8;
      }
      img {
        width: 35px;
        height: 35px;
      }
      p {
        display: inline-block;
        margin-left: 5px;
      }
    }
    .active {
      background-color: #c7f5d7;
      color: origin;
      border: 1px solid #aaa;
    }
  }
  .songListDetail {
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
  }
}
</style>
