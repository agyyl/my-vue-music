<template>
  <div id="header" class="container">
    <div class="log col-md-2">
      <img src="./logo.jpg" alt="" class="img-responsive center-block">
    </div>
    <router-link tag="div" class="playlist col-md-2 col-md-offset-1 routeritem" to="/songlist">
      歌曲推荐
    </router-link>
    <router-link tag="div" class="playdetail col-md-2 routeritem" to="/playdetail">
      正在播放
    </router-link>
    <router-link tag="div" class="mymusic col-md-2 routeritem" to="/personal">
      个人中心
    </router-link>
    <div class="search col-md-2 col-md-offset-1 ">
      <p class="search">
        <i class="glyphicon glyphicon-search"></i>
      </p>
    </div>
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
    cursor: pointer;
  }
  div.search {
    line-height: $header-height;
    background-color: #2264dd;
    height: $header-height;
    p.search {
      line-height: $header-height / 2;
      margin: 0 auto;
      border-bottom: 2px solid #fff;
    }
  }
}
</style>
