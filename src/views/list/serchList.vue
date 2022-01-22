<template>
  <div class="page">
    <div class="head clearfix">
      <img src="../../assets/images/pic004.png" class="lt" alt="" @click="back">
      <div class="lt div">{{name}}</div>
    </div>
    <div class="heads">
    
    </div>
    <div class="box">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height:100%">
        <div class="item" v-for="(item,index) in datas" :key="index" @click="to(item.id)">
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
      </van-pull-refresh>
    </div>
    <div class="loading" v-if="loadingBlean">
      没有更多了~
    </div>
  </div>
</template>

<script>
import { article_search } from '../../assets/js/api'
export default {
  
  data(){
    return{
      loadingBlean:false,
      name:"",
      datas:{},
      isLoading:false
    }
  },

  created(){
    if(this.$route.query.name){
      console.log(this.$route.query.name)
      this.name = this.$route.query.name
      article_search({
        search:this.name,
        ticket:sessionStorage.getItem('token')
      }).then(res => {
        console.log(res)
        if(res.data.err_code == 0) {
          this.datas = res.data.err_msg.list
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
  },

  methods: {
    onRefresh() {
      article_search({
        search:this.name
      }).then(res => {
        console.log(res)
        if(res.data.err_code == 0) {
          this.datas = res.data.err_msg.list
          this.isLoading = false
          this.loadingBlean = false
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
    back(){
      this.$router.go(-1)
    },
    to(id){
      if(id != ''){
        this.$router.push({ path: "/list/info", query: { id:id } });
      }
    },
    navList(){
      console.log("到了底部");
      this.loadingBlean = true
    },
    fen(id){
      console.log(id)
      this.showShare = true
    }
  }
}
</script>

<style lang="less" scoped>
.heads{
    height: 66px;
  }
.loading{
  font-size: 12px;
  color: #888888;
  line-height: 24px;
  margin: 20px 0 0;
  padding-bottom: 10px;
  text-align: center;
}
.page{
  background: #F2F2F2;
  min-height: 100vh;
  
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
    padding-left: 13px;
    padding-right: 13px;
  }
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

</style>
