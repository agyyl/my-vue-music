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
      <p v-for="item in list" :key="item.id">{{item.name}}</p>
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
    width: 40%;
    float: left;
    border: 1px solid #aaa;
  }
  .list {
    width: 40%;
    float: right;
    border: 1px solid #aaa;
  }
}
</style>
