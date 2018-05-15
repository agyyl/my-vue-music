<template>
  <div>
    <div class="save"></div>
    <div class="list"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  // components: {},

  computed: {
    ...mapGetters([
      'saveSongList'
    ])
  },

  // mounted: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
