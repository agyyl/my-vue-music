<template>
  <div class="per">
    <div class="save">
      <h2>我的收藏</h2>
      <div class="lists">
        <h3>我的歌单</h3>
        <ul class="fav">
          <li click="chooseMyList(item)" v-for="item in myList" :key="item.id">{{item.name}}</li>
        </ul>
        <h3>收藏歌单</h3>
        <ul>
          <li click="chooseTheirList(item)" v-for="item in saveSongList" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="list">
      <!-- <div v-for="item in list" :key="item.id">
        <img :src="item.image" alt="item.name" width="25" height="25">
        <p class="songname">{{item.name}}</p>
      </div> -->
      <list-detail :disc="list"></list-detail>
    </div>
  </div>
</template>

<script>
import listDetail from 'components/listdetail/listdetail'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      list: []
    }
  },

  components: {
    listDetail
  },

  computed: {
    ...mapGetters([
      'saveSongList',
      'myList',
      'playHistory'
    ])
  },

  mounted () {
    this.list = this.myList[0].songs
    console.log(this.myList[0].songs)
  },

  methods: {
    chooseList (list) {
      // this.
    }
  }
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
    position: relative;
    float: left;
    padding: 30px;
    width: 40%;
    height: 100%;
    background-color: #9786d9;
    border: 1px solid #aaa;
    // .songname {
    //   display: inline-block;
    //   margin-left: 10px;
    // }
  }
}
</style>
