<template>
  <div id="header" class="container">
    <div class="log col-md-2"></div>
    <div class="mymusic col-md-2">
      我的歌单
    </div>
    <div class="player col-md-4">
      播放列表
    </div>
  </div>
</template>

<script>
export default {
  // name: 'MHeader',
  data () {
    return {
    }
  }

  // components: {},

  // computed: {},

  // mounted: {},

  // methods: {}
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
}
</style>
