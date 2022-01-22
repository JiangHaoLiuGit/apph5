<template>
  <div>
    <video class="video-js vjs-big-play-centered" ref="videoPlayer"></video>
  </div>
</template>

<script>
  import videojs from 'video.js'

  export default {
    name: 'VideoPlayer',
    props: {
      options: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        player: null
      }
    },
    mounted() {
      this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
        console.log('onPlayerReady', this)
        this.on('fullscreenchange', function() {
          if (this.isFullscreen()) {
            this.enterFullWindow()
          } else {
            this.exitFullWindow()
          }
        })
      })
    },
    beforeDestroy() {
      if (this.player) {
        this.player.dispose()
      }
    }
  }
</script>
<style lang="less" scoped>
  .video-js {
    margin: 0px auto;
  }
</style>