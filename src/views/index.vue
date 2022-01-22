<template>
<div class="page">
  <div class="search clearfix">
    <div class="back lt">
      <img src="../assets/images/pic004.png" alt="" @click="back">
    </div>
    <div class="box lt por">
      <img src="../assets/images/pic001.png" class="poa" alt="">
      <input @keypress="searchGoods" type="serch" v-model="search" placeholder=" 搜索">
    </div>
  </div>
  <div class="heads">

  </div>
  <van-pull-refresh v-model="isLoading" @refresh="getOsInfo('1')" style="height:100%;min-height: calc(100vh - 70px);">
    <div class="banner" v-if="datas.banner.length > 0">
      <van-swipe class="my-swipe" :autoplay="none" indicator-color="white">
        <van-swipe-item v-for="(item,index) in datas.banner" :key="index">
          <van-image
            height="140"
            fit="cover"
            :src="item.image"
            @click="to(item.relation_id)"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 第一个 -->
    <div class="content two" v-if="datas.cate[0].son[0] && datas.cate[0].son[0].son.length > 0">
      <p class="title">
        {{datas.cate[0].son[0].name}}
      </p>
      <div class="boxs">
        <div class="contentBox clearfix">
          
            <div class="box">
              <div class="item" @click="to(item.article_id)" v-for="(item , index) in datas.cate[0].son[0].son" :key="index">
                <van-image
                  fit="cover"
                  :src="item.image_url"
                />
                <span class="shen1">{{item.title}}</span>
              </div>
            </div>
          
        </div>
      </div>
    </div>
    
    <!-- 第二个 -->
    <div class="content one" v-if="datas.cate[0].son[1] && datas.cate[0].son[1].son.length > 0">
      <p class="title">
        {{datas.cate[0].son[1].name}}
        <span class="span" @click="list(datas.cate[0].son[1].id,datas.cate[0].son[1].name,1)">
          查看全部
          <img src="../assets/images/pic005.png" alt="">
        </span>
      </p>
      <div class="contentBox clearfix">
          <div class="item" @click="to(item.article_id)" v-for="(item , index) in datas.cate[0].son[1].son" :key="index">
            <van-image
              fit="cover"
              :src="item.image_url"
            />
            <div class="text">
              <span class="shen2">{{item.title}}</span>
              <div class="smal clearfix">
                <div class="lt one div">
                  <img src="../assets/images/pic003.png" alt="">
                  {{Number(item.actual_browse) + Number(item.start_browse)}}浏览
                </div>
                <div class="rt two div">
                  <img src="../assets/images/pic002.png" alt="">
                  {{Number(item.actual_forward) + Number(item.start_forward)}}转发
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!-- 第三个 -->
    <div class="content three" style="margin-top:20px" v-if="datas.cate[0].son[2] && datas.cate[0].son[2].son.length > 0">
      <p class="title">
        {{datas.cate[0].son[2].name}}
        <span class="span" @click="list(datas.cate[0].son[2].id,datas.cate[0].son[2].name,2)">
          查看全部
          <img src="../assets/images/pic005.png" alt="">
        </span>
      </p>
      <div class="vanItem clearfix" @click="to(item.article_id)"  v-for="(item , index) in datas.cate[0].son[2].son" :key="index">
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
            <div class="smal">
              <div class="one div">
                <img src="../assets/images/pic003.png" alt="">
                <!--  -->
                {{Number(item.actual_browse) + Number(item.start_browse)}}浏览
              </div>
              <div class="two div">
                <img src="../assets/images/pic002.png" alt="">
                <!--  -->
                {{Number(item.actual_forward) + Number(item.start_forward)}}转发
              </div>
            </div>
          </div>
        </div>

    </div>
  </van-pull-refresh>
  
  <div class="loading" v-if="loadingBlean">
    没有更多了~
  </div>
</div>
</template>

<script>
import { indexs } from '../assets/js/api'
export default {
  
  data(){
    return{
      search:"",
      datas:{
        banner:[],
        cate:[]
      },
      loadingType:1,
      loadingBlean:false,
      active:"a",
      footerText:"",
      navPage:1,
      isLoading:false,
      token:"",
    }
  },

  created(){
    let _this = this;
    window.onscroll = function(){
    //变量scrollTop是滚动条滚动时，距离顶部的距离
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    //变量windowHeight是可视区的高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
      //滚动条到底部的条件
      if(scrollTop+windowHeight == scrollHeight){
      //到了这个就可以进行业务逻辑加载后台数据了
        _this.navList()
        
      } 
    }
    
    this.phoneInfo()
    // this.getOsInfo()
    console.log()
    let me = this;
    window['getToken'] = (url) => {
        me.getToken(url); // 这个也就是我定义的方法
    }
  },
  methods: {
    getToken(str){
      this.token = str
      sessionStorage.setItem('token',str)
    },
    
    //获取系统信息
    phoneInfo() {
      var userAgent = navigator.userAgent.toLowerCase();
      var name = 'Unknown';
      var version = 'Unknown';
      if (userAgent.indexOf('win') > -1) {
        name = 'Windows';
        if (userAgent.indexOf('windows nt 5.0') > -1) {
          version = 'Windows 2000';
        } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
          version = 'Windows XP';
        } else if (userAgent.indexOf('windows nt 6.0') > -1) {
          version = 'Windows Vista';
        } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
          version = 'Windows 7';
        } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
          version = 'Windows 8';
        } else if (userAgent.indexOf('windows nt 6.3') > -1) {
          version = 'Windows 8.1';
        } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
          version = 'Windows 10';
        } else {
          version = 'Unknown';
        }
      } else if (userAgent.indexOf('iphone') > -1) {
        name = 'Iphone';
      } else if (userAgent.indexOf('mac') > -1) {
        name = 'Mac';
      } else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {
        name = 'Unix';
      } else if (userAgent.indexOf('linux') > -1) {
        if (userAgent.indexOf('android') > -1) {
          name = 'Android';
        } else {
          name = 'Linux';
        }
      } else {
        name = 'Unknown';
      }
      console.log(name,version)
      if(name == 'Iphone' || name == 'Mac') {
        // window.webkit.messageHandlers.getStatusBarHeight();
        // this.getToken()
        // this.getToken()
        // window.webkit.messageHandlers.getToken.getMessage()
        // this.$toast(window.webkit.messageHandlers.getToken());
        sessionStorage.setItem('system','Iphone')
        
      } else if (name == 'Android') {
        this.token = window.android.getTicket()
        sessionStorage.setItem('token',window.android.getTicket())
        sessionStorage.setItem('system','Android')
      }else if(name == 'Windows'){
        sessionStorage.setItem('token',"")
      } else {
        this.token = window.android.getTicket()
        sessionStorage.setItem('token',window.android.getTicket())
        sessionStorage.setItem('system','Android')
      }
      
      this.getOsInfo()
      // return { name, version };
    },
    list(id,name,num){
      this.$router.push({ path: "/list/list",query:{id:id,name:name,num:num}});
    },
    searchGoods(event){
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
          if(this.search != ''){
            this.$router.push({ path: "/list/serchList", query: { name:this.search } });
          }
      }
    },
    to(id){
      if(id != ''){
        this.$router.push({ path: "/list/info", query: { id:id } });
      }
    },
    navList(){
      console.log("到了底部");
      // this.loadingBlean = true
    },
    back(){
      if (sessionStorage.getItem('system') == 'Android') {
        // this.$toast.fail('卷哥说没到这里!');
        window.android.finish()
      }else{
        // this.$toast.fail('怎么回到这里啊!');
        var back = "back";
        window.webkit.messageHandlers.finish.postMessage(back);
      }
    },
    add(){
      console.log(this.active)
    },
    getOsInfo(name){
      indexs({
        ticket:this.token
      }).then(res => {
        console.log(res)
        if(res.data.err_code == 0) {
          console.log(res.data.err_msg.info.banner)
          console.log(typeof res.data.err_msg.info.banner)
          this.datas = res.data.err_msg.info
          // this.datas.banner = []
          if(this.datas.cate[0].son[1] && this.datas.cate[0].son[1].son.length > 6){
            this.datas.cate[0].son[1].son = this.datas.cate[0].son[1].son.splice(0,6)
          }
          if(this.datas.cate[0].son[2] && this.datas.cate[0].son[2].son.length > 3){
            this.datas.cate[0].son[2].son = this.datas.cate[0].son[2].son.splice(0,3)
          }
          if(name == '1'){
            this.isLoading = false
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
  }
}
</script>

<style lang="less" scoped>

.page{
  .vanItem{
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
        display: flex;
        justify-content:space-between;
        padding-right: 10px;
        .div{
          font-size: 10px;
          color: #888888;
          height: 16px;
          line-height: 20px;
          position: relative;
          padding-left: 16px;
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
  }
  /deep/.van-tabs__nav{
   background: transparent; 
  }
  .content{
    p.title{
      font-size:15px;
      color: #444;
      margin-bottom: 9px;
      position: relative;
      font-weight: 500;
      .span{
        font-size: 12px;
        color: #888888;
        position: absolute;
        right: 0;
        top: 5px;
        img{
          width: 13px;
          float: right;
          position: relative;
          top: 2px;

        }
      }
    }
    .contentBox{
      height: 175px;
      display: -webkit-box;
      overflow-x: scroll;
      /*适应苹果*/
      -webkit-overflow-scrolling:touch;
      .box{
        width: max-content;
        // height: 152px;
      }
      .item{
        width: 226px;
        border-radius: 10px;
        height:100%;
        overflow: hidden;
        // height: 152px;
        background: #fff;
        border-radius: 10px;
        float: left;
        margin-right:10px;
        /deep/.van-image{
          width: 100%;
          height: 100px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .text{
          padding: 6px 12px 6px 10px;
          .shen2{
            height: 40px;
          }
        }
      }
    }
    .contentBox:-webkit-scrollbar{
      width: 10px;
      height: 1px;
    }
  }
  .content.one{
    margin-top: 20px;
    .box{
      width: 100%;
    }
    .contentBox{
      overflow:inherit;
      height: auto;
      display: block;
    }
    .item{
      width: calc(50% - 7px);
      border-radius: 10px;
      height:100%;
      overflow: hidden;
      // height: 152px;
      background: #fff;
      border-radius: 10px;
      float: left;
      margin-right:14px;
      margin-top: 10px;
      /deep/.van-image{
        width: 100%;
        height: 100px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .text{
        padding: 6px 12px 6px 10px;
        .shen2{
          height: 40px;
        }
      }
      .smal{
        margin: 10px 0 8px;
        .div{
          font-size: 10px;
          color: #888888;
          height: 16px;
          line-height: 20px;
          position: relative;
          padding-left: 16px;
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
    .item:nth-of-type(2n){
      margin-right: 0;
    }
  }
  .content.two{
    margin-top: 20px;
    .boxs{
        height: 91px;
        overflow: hidden;
      }
    .contentBox{
      height: 108px;
      .box{
        height: 91px;
      }
      
    }
    .item{
      overflow: hidden;
      width: 160px;
      background:transparent;
      position: relative;
      border-radius: 5px;
      /deep/.van-image{
        width: 100%;
        height: 90px;
      }
      .shen1{
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #fff;
        background: rgba(0,0,0,.7);
        padding: 0 10px;
      }
    }

  }
  background: #F2F2F2;
  min-height: 100vh;
  padding:7px 12px;
  .heads{
    height: 80px;
  }
  .search{
    position: fixed;
    padding-right: 10px;
    padding: 0 12px;
    top: 0;
    left: 0;
    width: 100%;
    padding-bottom: 8px;
    z-index: 999;
    // background: #f2f2f2;
    background: linear-gradient(to right,#AF987E,#E4D6C6);
    padding-top: 40px;
    .back{
      width: 25px;
      height: 28px;
      img{
        width: 10px;
        margin: 5px auto;
        position: relative;
        bottom: 1px;
      }
    }
    .box{
      width: calc(100% - 25px);
      background: #C8C8C8;
      border-radius: 28px;
      height: 28px;
      img{
        width:15px;
        top:7px;
        left: 10px;
      }
      input{
        width: 100%;
        padding-left: 30px;
        height: 100%;
        background: #fff;
        border: none;
        outline: none;
        border-radius: 28px;

      }
      input::-webkit-input-placeholder{
          color:#B0997F;
      }
    }
    
  }
  .banner{
      height: 140px;
      /deep/.van-image{
        width: 100%;
        img{
          width: 100%;
        }
      }
    }
}

/*隐藏滚动条     测试谷歌浏览器没有下面这一条也会自动隐藏*/
.box:-webkit-scrollbar{
	width: 10px;
	height: 1px;
}
::-webkit-scrollbar{
  width: auto;
}
/deep/ .van-tabs--line .van-tabs__wrap{
  margin-top:28px;
  height: 25px;
}
/deep/.van-tab__text--ellipsis{
  color: #AA8457;
}
/deep/ .van-tabs__line{
  background: #AA8457;
}

/deep/.van-tab{
  display: block;
  flex: inherit;
  margin-right: 23px;
}
.loading{
  font-size: 12px;
  color: #888888;
  line-height: 24px;
  margin: 20px 0 10px;
  text-align: center;
}

</style>
