<template>
  <div class="per">
    <div class="save">
      <h2>我的收藏</h2>
      <div class="lists">
        <p class="fav">
          收藏歌曲
        </p>
        <h3>收藏歌单</h3>
        <ul>
          <li>我的歌单</li>
        </ul>
      </div>
    </div>
    <div class="list">
      <div v-for="item in list" :key="item.id">
        <img :src="item.image" alt="item.name" width="25" height="25">
        <p class="songname">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      list: []
    }
  },

  // components: {},

  computed: {
    ...mapGetters([
      'saveSongList',
      'saveList',
      'playHistory'
    ])
  },

  mounted () {
    this.list = this.saveList
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
@import 'assets/css/variable.scss';

.per {
  position: absolute;
  top: $header-height;
  bottom: $player-height;
  overflow: hidden;
  width: 100%;
  .save {
    padding-left: 35px;
    width: 40%;
    height: 100%;
    float: left;
  }
  .list {
    float: left;
    padding: 30px;
    .songname {
      display: inline-block;
      margin-left: 10px;
    }
  }
}
</style>
