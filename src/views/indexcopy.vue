<template>
<div class="page">
  <div class="search clearfix">
    <div class="back lt">
      <img src="../assets/images/back.png" alt="">
    </div>
    <div class="box lt por">
      <img src="../assets/images/pic001.png" class="poa" alt="">
      <input @keypress="searchGoods" type="serch" v-model="search" placeholder=" 搜索">
    </div>
  </div>
  <div class="banner">
    <van-swipe class="my-swipe" :autoplay="none" indicator-color="white">
      <van-swipe-item v-for="(item,index) in datas.banner" :key="index">
        <van-image
          height="140"
          fit="cover"
          :src="item.image"
          @click="to('5')"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="content one">
    <p class="title">
      {{datas.cate[0].name}}
    </p>
    <div class="contentBox clearfix">
      <div class="box">
        <div class="item">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
          <div class="text">
            <span class="shen2">别在说了，我知道我是猪</span>
          </div>
        </div>
        <div class="item">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639729878730/%E7%BE%8E%E5%A5%B310.jfif"
          />
          <div class="text">
            <span class="shen2">别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪。别在说了，我知道我是猪</span>
          </div>
        </div>
        <div class="item">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
          <div class="text">
            <span class="shen2">别在说了，我知道我是猪</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="content two">
    <p class="title">
      {{datas.cate[1].name}}
    </p>
    <div class="contentBox clearfix">
      <div class="box">
        <div class="item">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="item">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639729878730/%E7%BE%8E%E5%A5%B310.jfif"
          />
        </div>
        <div class="item">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="item">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639729878730/%E7%BE%8E%E5%A5%B310.jfif"
          />
        </div>
      </div>
    </div>
  </div>
  <!--   -->
  <van-tabs v-model="active" @click="add">
    <van-tab title="主播养成班" name="a">
      <div class="vanItem clearfix">
        <div class="img lt">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="text">
          <span class="shen2">
            主播养成主要标题性文字最多 展示两行即可
          </span>
          <div class="smal clearfix">
            <div class="lt one div">
              <img src="../assets/images/pic003.png" alt="">
              2675浏览
            </div>
            <div class="lt two div">
              <img src="../assets/images/pic002.png" alt="">
              2675转发
            </div>
          </div>
        </div>
      </div>

      <div class="vanItem clearfix">
        <div class="img lt">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="text">
          <span class="shen2">
            主播养成111
          </span>
          <div class="smal clearfix">
            <div class="lt one div">
              <img src="../assets/images/pic003.png" alt="">
              2675浏览
            </div>
            <div class="lt two div">
              <img src="../assets/images/pic002.png" alt="">
              2675转发
            </div>
          </div>
        </div>
      </div>
      <div class="vanItem clearfix">
        <div class="img lt">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="text">
          <span class="shen2">
            主播养成主要标题性文字最多 展示两行即可
          </span>
          <div class="smal clearfix">
            <div class="lt one div">
              <img src="../assets/images/pic003.png" alt="">
              2675浏览
            </div>
            <div class="lt two div">
              <img src="../assets/images/pic002.png" alt="">
              2675转发
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="讲师训练课" name="b">
      <div class="vanItem clearfix">
        <div class="img lt">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="text">
          <span class="shen2">
            主播养成主要标题性文字最多 展示两行即可
          </span>
          <div class="smal clearfix">
            <div class="lt one div">
              <img src="../assets/images/pic003.png" alt="">
              2675浏览
            </div>
            <div class="lt two div">
              <img src="../assets/images/pic002.png" alt="">
              2675转发
            </div>
          </div>
        </div>
      </div>

      <div class="vanItem clearfix">
        <div class="img lt">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="text">
          <span class="shen2">
            主播养成2222
          </span>
          <div class="smal clearfix">
            <div class="lt one div">
              <img src="../assets/images/pic003.png" alt="">
              2675浏览
            </div>
            <div class="lt two div">
              <img src="../assets/images/pic002.png" alt="">
              2675转发
            </div>
          </div>
        </div>
      </div>
      <div class="vanItem clearfix">
        <div class="img lt">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="text">
          <span class="shen2">
            主播养成主要标题性文字最多 展示两行即可
          </span>
          <div class="smal clearfix">
            <div class="lt one div">
              <img src="../assets/images/pic003.png" alt="">
              2675浏览
            </div>
            <div class="lt two div">
              <img src="../assets/images/pic002.png" alt="">
              2675转发
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="线上招商课" name="c">
      <div class="vanItem clearfix">
        <div class="img lt">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="text">
          <span class="shen2">
            主播养成主要标题性文字最多 展示两行即可
          </span>
          <div class="smal clearfix">
            <div class="lt one div">
              <img src="../assets/images/pic003.png" alt="">
              2675浏览
            </div>
            <div class="lt two div">
              <img src="../assets/images/pic002.png" alt="">
              2675转发
            </div>
          </div>
        </div>
      </div>

      <div class="vanItem clearfix">
        <div class="img lt">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="text">
          <span class="shen2">
            主播养成3333
          </span>
          <div class="smal clearfix">
            <div class="lt one div">
              <img src="../assets/images/pic003.png" alt="">
              2675浏览
            </div>
            <div class="lt two div">
              <img src="../assets/images/pic002.png" alt="">
              2675转发
            </div>
          </div>
        </div>
      </div>
      <div class="vanItem clearfix">
        <div class="img lt">
          <van-image
            fit="cover"
            src="http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639709941123/%E7%BE%8E%E5%A5%B31.jfif"
          />
        </div>
        <div class="text">
          <span class="shen2">
            主播养成主要标题性文字最多 展示两行即可
          </span>
          <div class="smal clearfix">
            <div class="lt one div">
              <img src="../assets/images/pic003.png" alt="">
              2675浏览
            </div>
            <div class="lt two div">
              <img src="../assets/images/pic002.png" alt="">
              2675转发
            </div>
          </div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
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
        banner:[{
          image:"http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639729878730/%E7%BE%8E%E5%A5%B310.jfif"
        },{
          image:"http://rcjujiao.oss-cn-hangzhou.aliyuncs.com/image/1639727065867/%E7%BE%8E%E5%A5%B31.jfif"
        }],
        cate:[
          {name:"如何做会销"},
          {name:"如何打造你的团队"}
        ]
      },
      loadingType:1,
      loadingBlean:false,
      active:"a",
      footerText:"",
      navPage:1,
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

    this.getOsInfo()
    // if(sessionStorage.getItem('system') == 'Android') { //安卓
    //   this.ios_show = false
    // }else {
    //   this.ios_show = true
    // }
  },

  methods: {
    searchGoods(event){
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
          this.$toast.fail('搜索')
          if(this.search != ''){
            this.$router.push({ path: "/list/serchList", query: { name:this.search } });
          }
      }
    },
    to(id){
      if(id != ''){
        this.$router.push({ path: "/list/serchList", query: { id:id } });
      }
    },
    navList(){
      console.log("到了底部");
      this.loadingBlean = true
    },
    add(){
      console.log(this.active)
    },
    getOsInfo(){
      console.log("fasdf")
      indexs({

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
    }
  }
}
</script>

<style lang="less" scoped>
.loading{
  font-size: 12px;
  color: #888888;
  line-height: 24px;
  margin: 20px 0 10px;
  text-align: center;
}
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
  /deep/.van-tabs__nav{
   background: transparent; 
  }
  .content{
    p.title{
      font-size:15px;
      color: #444;
      margin-bottom: 9px;
    }
    .contentBox{
      height: 175px;
      display: -webkit-box;
      overflow: auto;
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
  .content.two{
    height: 257px;
    .contentBox{
      height: 250px;
    }
    .item{
      width: 130px;
      background:transparent;
      /deep/.van-image{
        width: 100%;
        height: 232px;
      }
    }

  }
  background: #F2F2F2;
  min-height: 100vh;
  padding:7px 12px;
  .search{
    .back{
      width: 30px;
      height: 28px;
      img{
        width: 30px;
        transform:scale(0.7);
        margin: 0 auto;
        position: relative;
        bottom: 1px;
      }
    }
    .box{
      width: calc(100% - 30px);
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
        background: transparent;
        border: none;
        outline: none;
      }
      input::-webkit-input-placeholder{
          color:#B0997F;
      }
    }
    
  }
  .banner{
      margin:8px 0 20px;
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


</style>
