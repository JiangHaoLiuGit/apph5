<template>
  <div class="page" ref="personDom">
    <div class="head clearfix">
      <img src="../../assets/images/pic004.png" class="lt" alt="" @click="back">
      <div class="lt div">{{name}}</div>
    </div>
    <div class="heads">

    </div>
    <div class="box" ref="box">
      
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :style="'min-height:' + boxHiehgt + 'px'">
        <!--  @scroll="handlerScroll($event)" -->
        <div class="item1" v-if="num == 1">
          <div class="item" v-for="(item,index) in datas" :key="index">
            <div class="video por" @click="changePlay(index)">
              <video controls="controls"
                @play="handlePlay(index)"
              v-if="item.type == 1" :poster="item.image_url" controlsList="nodownload" :src="item.video_url" :id="'id' + index">
                您的浏览器不支持H5播放器
              </video>
              <van-image
                fit="cover"
                v-else-if="item.type == 2"
                :src="item.image_url"
              />
              <img src="../../assets/images/pic006.png" class="poa" @click="fen(item)" alt="">
            </div>
            <div class="div">
              <span class="shen2">{{item.title}}</span>
              <div class="bom clearfix">
                <div class="smal lt clearfix">
                  <div class="lt one divs">
                    <img src="../../assets/images/pic003.png" alt="">
                    {{Number(item.actual_browse) + Number(item.start_browse)}}浏览
                  </div>
                  <div class="lt two divs">
                    <img src="../../assets/images/pic002.png" alt="">
                    {{Number(item.actual_forward) + Number(item.start_forward)}}转发
                  </div>
                </div>
                <div class="rt" @click="to(item.article_id)">
                  立即查看
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="item2" v-else-if="num == 2">
          <div class="item" v-for="(item,index) in datas" :key="index" @click="to(item.article_id)">
            <div class="img lt">
              <van-image
                fit="cover"
                :src="item.image_url"
              />
            </div>
            <div class="text">
              <span class="shen2">
                {{item.title}}
              </span>
              <div class="smal clearfix">
                <div class="lt one div">
                  <img src="../../assets/images/pic003.png" alt="">
                  {{Number(item.actual_browse) + Number(item.start_browse)}}浏览
                </div>
                <div class="lt two div">
                  <img src="../../assets/images/pic002.png" alt="">
                  {{Number(item.actual_forward) + Number(item.start_forward)}}转发
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
    <div class="loading" v-if="loadingBlean">
      没有更多了~
    </div>
    <div class="loading" v-else>
      <img src="../../assets/images/loading.png" class="lt" alt="">正在加载~
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
import { second_list } from '../../assets/js/api'
export default {
  data(){
    return{
      video:"http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639653689795/jujiao.mp4",
      title:"我是标题",
      vice_title:"别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪",
      datas:[],
      search:"",
      showShare:false,
      options: [
        { name: '微信', icon: 'wechat' }
      ],
      name:"",
      id:"",
      page:1,
      pageSize:10,
      loadingBlean:false,
      maxPage:"",
      isLoading:false,
      num:"",
      boxHiehgt:""
    }
  },

  created(){
    
    if(this.$route.query.id){
      this.id = this.$route.query.id
      second_list({
        cate_id:this.id,
        page:this.page,
        page_size:this.pageSize,
        ticket:sessionStorage.getItem('token')
      }).then(res => {
        if(res.data.err_code == 0) {
          this.datas = res.data.err_msg.list
          this.boxHiehgt = this.$refs.box.clientHeight
          // if( > )
          // console.log(Math.ceil(res.data.err_msg.total_number / this.pageSize))
          this.maxPage = Math.ceil(res.data.err_msg.total_number / this.pageSize)
          console.log(this.maxPage)
          if(this.page == this.maxPage){
            this.loadingBlean = true
          }
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
    
    if(this.$route.query.name){
      this.name = this.$route.query.name
    }
    if(this.$route.query.num){
      this.num = this.$route.query.num
    }
    // let _this = this;
    // window.onscroll = function(){
    // //变量scrollTop是滚动条滚动时，距离顶部的距离
    // var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    // //变量windowHeight是可视区的高度
    // var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // //变量scrollHeight是滚动条的总高度
    // var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
    //   //滚动条到底部的条件
    //   if(scrollTop+windowHeight == scrollHeight){
        
    //   } 
    // }
  },
  mounted(){
    this.$refs.personDom.addEventListener('scroll',this.handleScroll,true);
  },
  methods: {
    handleScroll(){
      var scrollTop = this.$refs.personDom.scrollTop; //滑入屏幕上方的高度
      var windowHeitht = this.$refs.personDom.clientHeight; //能看到的页面的高度
      var scrollHeight = this.$refs.personDom.scrollHeight; //监控的整个div的高度（包括现在看到的和上下隐藏起来看不到的）
      
      //2735.70
      //1380

      let total = scrollTop + windowHeitht
      // this.$toast.fail(total)
      //  || total -  == scrollHeight
      //  || (total - 200) == scrollHeight
      if(Math.round(total) == scrollHeight){
          // this.$toast.fail('触底')
          //到了这个就可以进行业务逻辑加载后台数据了
          if(this.datas.length >= this.pageSize){
            this.navList()
          }
      }
    },
    handlePlay(index){
      for(let i = 0 ; i < this.datas.length ; i ++ ){
        let video = document.getElementById("id" + i)
        if(i != index){
          video.pause()
        }
      }
    },
    onRefresh() {
      this.page = 1
      second_list({
        cate_id:this.id,
        page:this.page,
        page_size:this.pageSize
      }).then(res => {
        console.log(res)
        if(res.data.err_code == 0) {
          
          this.datas = res.data.err_msg.list
          this.maxPage = Math.ceil(this.pageSize / res.data.err_msg.total_number)+1
          console.log(this.maxPage)
          if(this.page == this.maxPage){
            this.loadingBlean = true
            console.log("大哥")
          }
          this.isLoading = false;
        } else {
          this.$toast.clear();
          this.$toast.fail(res.data.err_msg);
        }
      }).catch((error) => {
        console.log(error)
        this.$toast.clear();
        this.$toast.fail('网络错误 , 请稍后再试 ');
      })
    },
    onSelect(option) {
      if(option.name == '微信'){
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
    to(id){
      if(id != ''){
        this.$router.push({ path: "/list/info", query: { id:id } });
      }
    },
    navList(){
      console.log("到了底部");
      this.page++;
      second_list({
        cate_id:this.id,
        page:this.page,
        page_size:this.pageSize
      }).then(res => {
        console.log(res)
        if(res.data.err_code == 0) {
          if(this.page == 1){
            this.datas = res.data.err_msg.list
          }else{
            this.datas = this.datas.concat(res.data.err_msg.list)
          }
          if(this.page == this.maxPage){
            console.log(this.maxPage)
            console.log(this.page)
            this.loadingBlean = true
            console.log("大哥")
          }
        } else {
          this.$toast.clear();
          this.$toast.fail(res.data.err_msg);
        }
      }).catch((error) => {
        console.log(error)
        this.$toast.clear();
        this.$toast.fail('网络错误 , 请稍后再试 ');
      })
    },
    fen(item){
      this.fen = item
      this.showShare = true
    },
    back(){
      this.$router.go(-1)
    },
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
.loading{
  font-size: 12px;
  color: #888888;
  line-height: 24px;
  margin: 20px 0 0;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 20px;
    margin-right: 10px;
    animation: dong 1s linear infinite;
  }
}
@keyframes dong{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.heads{
    height: 66px;
  }
.page{
  overflow-y: scroll;
  background: #F2F2F2;
  height: 100vh;
  
  .head{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    padding: 40px 13px 15px;
    background: linear-gradient(to right,#AF987E,#E4D6C6);
    img{
      width: 8px;
    }
    .div{
      width: calc(100% - 8px);
      font-size: 18px;
      color: #fff;
      text-align: center;
      line-height: 17px;
    }
    
  }
  .box{
    padding-bottom: 20px;
    min-height: calc(100vh - 66px);
  }
  .item1{
    
    .item{
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      .video{
        height: 230px;
        position: relative;
        video{
          height: 100%;
          width: 100%;
          background: #000;
        }
        img{
          top: 10px;
          right: 10px;
          width: 14px;
        }
      }
      .div{
        padding: 15px 12px 7px;
        background: #fff;
        .shen2{
          height: 38px;
        }
      }
      .bom{
        .smal{
          margin-top: 7px;
          .divs{
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
        .rt{
          height: 22px;
          width: 75px;
          border-radius: 22px;
          background: linear-gradient(to right,#AF987E,#E4D6C6);
          text-align: center;
          line-height: 22px;
          color: #fff;
          margin-top: 7px;
        }
      }
    }
  }
  .item2{
    .item{
      margin-top: 10px;
      background: #fff;
      border-radius: 10px;
      height: 114px;
      overflow: hidden;
      .img{
        height: 100%;
        /deep/.van-image{
          width: 148px;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .text{
        width: calc(100% - 148px);
        float: left;
        padding: 26px 8px 16px 13px;
        height: 100%;
        .shen2{
          font-size:14px;
          height: 38px;
          margin-bottom: 10px;
        }
        .smal{
          .div{
            margin-right: 12px;
            font-size: 10px;
            color: #888888;
            height: 16px;
            line-height: 20px;
            img{
              width:12px;
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
}



</style>
