<template>
  <!-- <div v-drag="changePercent" ref="dragable"> -->
  <div ref="dragable">
    <slot></slot>
  </div>
</template>

<script>
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  data () {
    return {
    }
  },

  props: {
    direction: {
      type: String,
      default: DIRECTION_V
    }
  },

  mounted () {
    let oDiv = this.$refs.dragable.children[0] // 当前元素
    let self = this // 上下文
    oDiv.onmousedown = function (e) {
      let oTop = self.getTop(oDiv)
      let t = e.clientY - oTop
      let oLeft = self.getLeft(oDiv)
      let l = e.clientX - oLeft
      let getPercent = null
      if (self.direction === DIRECTION_V) {
        getPercent = () => {
          let per = t / oDiv.offsetHeight
          if (per >= 1) {
            per = 1
          } else if (per <= 0) {
            per = 0
          }
          return per
        }
      } else if (self.direction === DIRECTION_H) {
        getPercent = () => {
          let per = l / oDiv.offsetWidth
          if (per >= 1) {
            per = 1
          } else if (per <= 0) {
            per = 0
          }
          return per
        }
      }
      self.changePercent(getPercent())
      document.onmousemove = function (e) {
        t = e.clientY - oTop
        l = e.clientX - oLeft
        self.changePercent(getPercent())
        return false
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
        return false
      }
      return false
    }
  },

  methods: {
    changePercent (percent) {
      this.$emit('changePercent', percent)
    },
    getTop (ele) {
      let hei = parseInt(ele.offsetTop)
      if (ele.offsetParent) {
        let suphei = this.getTop(ele.offsetParent)
        if (!isNaN(suphei)) {
          hei += suphei
        }
      }
      return hei
    },
    getLeft (ele) {
      let left = parseInt(ele.offsetLeft)
      if (ele.offsetParent) {
        let supLeft = this.getLeft(ele.offsetParent)
        if (!isNaN(supLeft)) {
          left += supLeft
        }
      }
      return left
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
