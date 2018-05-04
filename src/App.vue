<template>
<div id="app">
  <m-header></m-header>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <player></player>
</div>
</template>

<script>

import MHeader from 'components/m-header/m-header'
import Player from 'components/player/player'

export default {
  components: {
    MHeader,
    Player
  }
}
</script>

<style>

</style>
