<template>
  <!-- 播放器组件 -->
  <div id="player" class="container">
    <div class="song col-md-10 col-md-offset-1 container">
      <!-- 左侧 控制 暂停 上下一首 歌 -->
      <div class="control1 col-md-2">
        <span>
          <i class="glyphicon glyphicon-step-backward lastsong"></i>
        </span>
        <span class="playing" @click="play">
          <i class="glyphicon glyphicon-play"></i>
          <!-- <i class="glyphicon glyphicon-pause"></i> -->
        </span>
        <span>
          <i class="glyphicon glyphicon-step-forward nextsong"></i>
        </span>
      </div>

      <!-- 显示 歌曲进度条,歌曲信息 -->
      <div class="show col-md-8">
        <!-- 歌曲图片 -->
        <div class="pic col-md-1 col-md-offset-1">
          <img src="http://p1.music.126.net/iSNyjV8B3gPLAJ0DExYUIA==/18825838092510573.jpg?param=34y34" alt="">
        </div>

        <!-- 播放信息 -->
        <div class="playinfo col-md-10">
          <!-- 歌曲信息 -->
          <div class="songinfo">
            <span class="songname">鱼中书</span>
            <span class="singer">KIYOIII</span>
          </div>

          <!-- 进度信息 -->
          <div class="playcurrent container">
              <!-- 进度条 -->
              <div class="jindutiao col-md-9">
                <div class="currenttimeshow">
                  <div class="dot"></div>
                </div>
              </div>

              <!-- 播放时间 -->
              <div class="currenttime col-md-3">
                <span class="currenttimenumber">01:25</span> / <span class="alltime"> 04:54</span>
              </div>
          </div>

        </div>
        <!-- 播放信息结束 -->

      </div>
      <!-- 右侧 控制 音量 播放模式 收藏 -->
      <div class="control2 col-md-2 container">
        <span class="fav col-md-4">
          <i class="glyphicon glyphicon-heart-empty"></i>
          <!-- <i class="glyphicon glyphicon-heart"></i> -->
        </span>
        <span class="vol col-md-4">
          <i class="glyphicon glyphicon-volume-up"></i>
          <!-- <i class="glyphicon glyphicon-volume-off"></i> -->
        </span>
        <span class="playmode col-md-4">
          <i class="glyphicon glyphicon-random"></i>
          <!-- <i class="glyphicon glyphicon-retweet"></i> -->
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetter, mapMutations } from 'vuex'
import { playMode } from 'assets/js/config'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      discList: [],
      recommends: [],
      listid: -1
    }
  },

  created () {
    // this._getDiscList('3812213538')

    // this._getRecommend()
  },

  // components: {},

  // computed: {

  // },

  // mounted: {},

  // watch: {
  //   listid () {
  //     this._getDiscList(this.listid)
  //   }
  // },

  methods: {
    play () {
      console.log(this.listid)
      this._getDiscList(this.listid)
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
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
          this.listid = res.data.slider[0].id
          console.log(res.data)
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
@import 'assets/css/variable.scss';
@import 'assets/css/mixin.scss';

#player {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: $color-background;
  color: #fff;
  .song {
    height: 100%;
    .control1 {
      line-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        flex: 1 1 auto;
        i {
          cursor: pointer;
        }
        .lastsong, .nextsong {
          @include circleborder(30px, 2px, #aaa);
          line-height: 26px;
          color: #aaa;
          &:hover {
            border-color: #fff;
            color: #fff;
            box-shadow: 0 0 1px 1px;
          }
        }
      }
      span.playing {
        i {
          @include circleborder(35px, 2px);
          line-height: 31px;
          &:hover {
            box-shadow: 0 0 1px 1px;
          }
        }
      }
    }
    .show {
      height: 100%;
      .pic {
        height: 100%;
        vertical-align: middle;
        img {
          margin-top: 10px;
          width: 30px;
          height: 30px;
        }
      }
      .playinfo {
        .songinfo {
          height: 20px;
          span {
            margin-right: 10px;
          }
          span.singer {
            color: #aaa;
          }
        }
        .playcurrent {
          width: 100%;
          padding: 0;
          .jindutiao {
            margin-top: 10px;
            padding: 0;
            // width: 70%;
            height: 8px;
            background-color: #aaa;
            border-radius: 4px;
            .currenttimeshow {
              position: relative;
              width: 38%;
              height: 100%;
              background-color: $color-theme-red;
              border-radius: 4px;
              .dot {
                position: absolute;
                right: 0;
                top: 0;
                margin-top: -3px;
                @include circleborder(14px, 3px, #fff);
                background-color: $color-theme-red;
              }
            }
          }
          .currenttime {
            color: #888;
            .currenttimenumber {
              color: #aaa;
            }
          }
        }

      }

    }
    .control2 {
      span {
        line-height: 50px;
      }
    }
  }
}
</style>
