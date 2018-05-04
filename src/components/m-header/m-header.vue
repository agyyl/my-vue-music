<template>
  <div id="header" class="container">
    <div class="log col-md-3">
      <img src="./logo.jpg" alt="" class="img-responsive center-block">
    </div>
    <router-link tag="div" class="mymusic col-md-3 routeritem" to="/mylist">
      我的歌单
    </router-link>
    <router-link tag="div" class="lrc col-md-3 routeritem" to="/lrc">
      歌词
    </router-link>
    <router-link tag="div" class="playlist col-md-3 routeritem" to="/songlist">
      歌单
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>
<style lang='scss' scoped type="stylesheet/scss">
@import 'assets/css/variable.scss';

#header {
  height: 70px;
  width: 100%;
  background-color: $color-background;
  border-bottom: 4px solid $color-theme-red;
  font-size: $font-size-large;
  color: #fff;
  .log {
    height: 100%;
    img {
      height: 100%;
    }
  }
  .routeritem {
    border-left: 4px solid #fff;
    height: 100%;
    line-height: 70px;
    text-align: center;
  }
}
</style>
