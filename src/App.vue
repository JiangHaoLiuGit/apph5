<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import remFN from './utils/rem'
export default {
  name: 'App',
  data () {
    return {
      
    }
  },
  mounted () {
    document.getElementById('app').style.display = 'block';
    document.getElementById('appLoading').style.display = 'none';
    // remFN()
    (function (doc, win) {
      var remFull = 3.75 // 3.75rem全屏
      var docEl = doc.documentElement
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
      var recalc = function () {
        var clientWidth = docEl.clientWidth
        if (!clientWidth) return;

        var fontSize = clientWidth / (remFull * 100) * 100
        docEl.style.fontSize = fontSize + 'px'

        var eDivWidth = 0
        var eDiv = document.createElement('div')

        eDiv.style.width = remFull + 'rem'
        eDiv.style.height = '1px'
        eDiv.style.position = 'fixed'
        eDiv.style.boxSizing = 'border-box'
        document.body.appendChild(eDiv)
        eDivWidth = eDiv.clientWidth
        // eDivWidth = 375
        if (clientWidth !== eDivWidth) {
          var timer = setInterval((function () {
            clientWidth = docEl.clientWidth
            eDivWidth = eDiv.clientWidth
            if (clientWidth !== eDivWidth) {
              docEl.style.fontSize = fontSize * (clientWidth / eDivWidth) + 'px'
              console.log('111111111111111111111',docEl.style.fontSize)
            } else {
              clearInterval(timer)
              document.body.removeChild(eDiv)
            }
            return arguments.caller
          })(), 100)
        } else {
          document.body.removeChild(eDiv)
        }
      };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false)
      doc.addEventListener('DOMContentLoaded', recalc, false)
    })(document, window);
  },

  methods: {
    
  }
}
</script>


<style lang="less">

  *{
    padding: 0;
    margin:0;
    box-sizing:border-box;
    font-size: 14px;
  }
  .clearfix::after{
    clear:both;
    content:"";
    display: table;
  }

  .lt{
    float:left;
  }
  .rt{
    float:right;
  }
  .por{
    position: relative;
  }
  .poa{
    position: absolute;
  }
  .shen1{
    white-space:nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .shen2{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}


</style>
