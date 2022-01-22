<template>
  <div class="page">
    <div class="video">
      <!--  -->
      <!-- controlsList="nodownload" -->
      <video controls="controls" webkit-playsinline="true" playsinline="true" x5-playsinline v-if="datas.type == 1" :poster="datas.image_url"  id="video">
        您的浏览器不支持H5播放器
        <!-- http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1640085022150/%E5%85%8D%E7%96%AB%E5%8A%9B%E4%B9%8B%E7%8E%8B-1.mp4 -->
        <source :src="datas.video_url" type="video/mp4" />
        <!-- <source src="/example/html5/mov_bbb.ogg" type="video/ogg" /> -->
        Your browser does not support HTML5 video.
      </video>
      <van-image
        fit="cover"
        v-else-if="datas.type == 2"
        :src="datas.image_url"
      />
      <div class="img1 poa" @click="back" >
        <img src="../../assets/images/pic004.png" class="img" alt="">
      </div>
      <div class="img2 poa" @click="fens(datas)">
        <img src="../../assets/images/pic006.png" class="img" alt="">
      </div>
    </div>
    <div class="cen">
      <span class="shen2">{{datas.title}}</span>
      <div class="smal clearfix">
          <div class="lt one div">
            <img src="../../assets/images/pic003.png" alt="">
            {{Number(datas.actual_browse) + Number(datas.start_browse)}}浏览
          </div>
          <div class="lt two div">
            <img src="../../assets/images/pic002.png" alt="">
            {{Number(datas.actual_forward) + Number(datas.start_forward)}}转发
          </div>
        </div>
    </div>
    <div class="bom">
      <div v-html="datas.info"></div>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { article_info,browsing_history,transmit_history } from '../../assets/js/api'
export default {
  data(){
    return{
      datas:{},
      id:"",
      html:"<h2>老师介绍</h2><p>我不是老师，你去找别人吧</p>",
      showShare:false,
      options: [
        { name: '微信', icon: 'wechat' },
      ],
      fen:{},
      video:"http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639653689795/jujiao.mp4",
      title:"我是标题",
      vice_title:"别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪",
      time:0,
      tim:{},
    }
  },
  created(){
    
    if(this.$route.query.id){
      console.log(this.$route.query.id)
      this.id = this.$route.query.id
      article_info({
        article_id:this.id,
        ticket:sessionStorage.getItem('token')
      }).then(res => {
        console.log(res)
        if(res.data.err_code == 0) {
          this.datas = res.data.err_msg.info
          // ticket
        } else {
          this.$toast.clear();
          this.$toast.fail(res.data.err_msg);
        }
      }).catch((error) => {
        console.log(error)
        this.$toast.clear();
        this.$toast.fail('网络错误 , 请稍后再试 ');
        
      })
    }
    this.tim = setInterval(() => {
      this.time++
      console.log(this.time)
    },1000)
  },
  destroyed(){
    console.log("结束")
    console.log(this.time)
    clearInterval(this.tim)
    let data = {
      article_id:this.id,
      duration:this.time,
      ticket:sessionStorage.getItem('token')
    }
    if(this.time > 0){
      browsing_history(
        data
      ).then(res => {
          console.log(res)
          if(res.data.err_code == 0) {
            this.datas = res.data.err_msg.info
          } else {
            this.$toast.clear();
            this.$toast.fail(res.data.err_msg);
          }
        }).catch((error) => {
          console.log(error)
          this.$toast.clear();
          this.$toast.fail('网络错误 , 请稍后再试 ');
          
        })
    }
    
  },
  methods: {
    onSelect(option) {
      
      if(option.name == '微信'){
        transmit_history({
          article_id:this.id,
          type:1,
          ticket:sessionStorage.getItem('token')
        }).then(res => {
          console.log(res)
          if(res.data.err_code == 0) {
            this.datas = res.data.err_msg.info
          } else {
            this.$toast.clear();
            this.$toast.fail(res.data.err_msg);
          }
        }).catch((error) => {
          console.log(error)
          this.$toast.clear();
          this.$toast.fail('网络错误 , 请稍后再试 ');
          
        })
        if (sessionStorage.getItem('system') == 'Android') {
          window.android.share(this.fen.image_url,this.fen.title,window.location.href,this.fen.vice_title)
        }else{
          let obj = {
            image:this.fen.image_url,
            title:this.fen.title,
            url:window.location.href,
            subTitle:this.fen.vice_title,
          }
          window.webkit.messageHandlers.share.postMessage(obj);
        }
        
      }
      this.showShare = false;
    },
    back(){
      console.log("fasdf")
      this.$router.go(-1)
    },
    fens(item){
      this.fen = item
      this.showShare = true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-image{
  width: 100%;
  height: 230px;
  img{
    width: 100%;
    height: 100%;
  }
}
.page{
  .video{
    height: 230px;
    position: relative;
    #video{
      width: 100%;
      height: 100%;
      background: #000;
    }
    img{
      width: 14px;
      top: 40px;
    }
    .img1{
      left: 15px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(0,0,0,.8);
      top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 8px;
      }
    }
    .img2{
      right: 15px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(0,0,0,.8);
      top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 14px;
      }
    }
  }
  .cen{
    padding: 15px 13px 17px;
    border-bottom: 1px solid #DEDEDE;
    .shen2{
      height: 38px;
      margin-bottom: 13px;
    }
    .smal{
      .div{
          font-size: 10px;
          color: #888888;
          height: 16px;
          line-height: 20px;
          position: relative;
          padding-left: 16px;
          margin-right:20px;
          img{
            width:12px;
            margin-right: 4px;
            position: absolute;
            bottom: 0;
            left: 0;
          }
        }
    }
  }
  /deep/ .bom{
    padding: 17px 12px;
    img{
      width: 100%;
    }
  }
}

</style>
