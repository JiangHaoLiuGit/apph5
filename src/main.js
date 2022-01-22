import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.css'
import './utils/rem.js'
import deploy from './assets/js/constant'

import Vant , {Lazyload}  from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Lazyload);

//引入视频
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)
require('vue-video-player/src/custom-theme.css')

import 'video.js/dist/video-js.css'

Vue.config.productionTip = false
Vue.prototype.deploy = deploy // 配置项

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
