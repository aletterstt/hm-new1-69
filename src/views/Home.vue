<template>
  <div>
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>搜索新闻
      </div>
      <div class="right" @click="$router.push('/user')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
<!-- 小三角 -->


<van-sticky z-index='999'>
 <div class="container"  @click="$router.push('/tabsedit')">
  <i class="iconfont iconjiantou1"></i>
</div>
</van-sticky>

    <!--tab栏  -->
    <van-tabs v-model="active" sticky>
      <!-- <p v-for="i in 100" :key="i">喜喜</p> -->
  <van-tab v-for="item in tabList" :key="item.id" :title=item.name>
    <!-- <hm-post ></hm-post> -->
   <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
 

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" offset="20" :immediate-check="false" @load="onLoad">



   <hm-post 
   @click.native="$router.push(`/detail/${post.id}`)"
   v-for="(post,index) in postList" :key="index" :post="post"></hm-post>
</van-list>
</van-pull-refresh>
  </van-tab>
    </van-tabs>

  </div>
</template>

<script>
export default {
   name:"home",
data(){
  return {
    active:1 ,//tab栏当前激活的索引值
    tabList:[],
    postList:[],
    pageIndex:1,
    pageSize:5,
    loading:false,
    finished:false,
    isLoading:true
  }
},created(){
this.getTabList()
},
activated(){
let activeTabs=JSON.parse(localStorage.getItem('activeTabs')
)
if(activeTabs){
  this.tabList = activeTabs
  this.active=1 //回到默认
  this.getPostList(this.tabList[1].id)
  return 
}
},
methods:{
 async getTabList(){
//从本地获取

let activeTabs=JSON.parse(localStorage.getItem('activeTabs')
)
if(activeTabs){
  this.tabList = activeTabs
  this.active=1 //回到默认
  this.getPostList(this.tabList[1].id)
  return 
}




   let res=await this.$axios.get('/category')
   console.log('tabList',res.data.data);
   if(res.data.statusCode==200){
     this.tabList=res.data.data
   }
     this.getPostList(this.tabList[1].id)

  },
  async  getPostList(id){
    if(this.postList.length>0 && this.pageIndex===1){
      this.postList=[];
    }
    let res=await this.$axios.get('/post',{
      params:{
        category:id,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }
    })
    console.log('文章列表',res.data.data);
    this.loading=false;
    if(res.data.data.length<this.pageSize){
      this.finished=true
    }
    this.postList=[...this.postList,...res.data.data]
  },
 onLoad(){
   this.pageIndex++
    this.getPostList(this.tabList[this.active].id)
   console.log('触底了');
 },
 onRefresh(){
   //异步操作
   //1.处理之前的数据
   this.postList=[],
   this.pageIndex=1;
   this.finished=false
   this.isLoading=false
   this.getPostList(this.getTabList(this.active).id)
   console.log('下拉刷新');
 }
},
 watch:{
    active(newValue){
      this.pageIndex=1
      this.finished=false;
      this.loading=true
      this.getPostList(this.tabList[newValue].id)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-tabs__nav{
  background-color: #dddddd;
  margin-right: 40px;

}
// 小三角
.container{
  background-color: #dddddd;
  width: 40px;
  height: 44px;
  // background-color: pink;
  text-align: center;
  line-height: 44px;
  position: absolute;
  right: 0;
  z-index: 999;
}
.header{
  display: flex;
  height: 40px;
  background-color: red;
  justify-content: center;
  align-items: center;
  color: #fff;
  .left,.right{
    width: 50px;
    // line-height: 40px;

  }
    .iconnew{
      font-size: 50px;
    }
    .iconwode{
      font-size: 30px;
    }
  .center{
    flex: 1;
    background-color: rgba(255,255,255,0.5);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    font-size: 12px;
    .iconsearch{
      padding-right: 10px;
    }
  }
}
</style>