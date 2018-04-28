<template>
  <div id="songdetail">
    <div v-for="item in discList" :key="item.id" @click="slecklist(item)">
      {{item}}
    </div>
  </div>
</template>

<script>
import { mapGetter, mapMutations } from 'vuex'
import { getRecommend, getDiscList, getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      recommends: [],
      discList: [],
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
      getSongList (item.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songlist = res.cdlist[0].songlist
          this.$router.push({
            path: `/songlist/${item.dissid}`
          })
        }
        console.log(res)
      })
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
        console.log(1)
        if (res.code === ERR_OK) {
          this.discList = res.data.list
          console.log(res.data.list)
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

</style>
