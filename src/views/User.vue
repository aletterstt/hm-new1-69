<template>
  <div>
    <hm-header>个人中心</hm-header>
    <!-- 信息 -->
  <div class="info">
    <div class="left">
      <img :src="$axios.defaults.baseURL+info.head_img" alt="">
    </div>
    <div class="center">
     <div class="nickname">
       <i v-if="info.gender===1" class="iconfont iconxingbienan"></i>
       <i v-else class="iconfont iconxingbienv"></i>
      {{info.nickname}}
       </div>
     <div class="date">{{info.create_date | date}}</div>
    </div>
   
  </div>
  <!-- 引入Cell -->
  <van-cell title="我的关注" is-link value="关注的用户" @click="$router.push('/my-follow')" />
  <van-cell title="我的跟帖" is-link value="跟帖/回复" @click='$router.push("/my-comment")'/>
  <van-cell title="我的收藏" is-link value="文档/视频" @click='$router.push("/my-star")'/>
  <van-cell title="设置" is-link @click="$router.push('/edit')" />
  <van-cell title="退出" is-link @click="logout" />
  </div>

</template>

<script>

export default {
  data(){
  return {
    info:{}
  }
  },
created(){
  let token=localStorage.getItem('token')
  let user_id=localStorage.getItem('user_id')
  this.$axios
  .get(`/user/${user_id}`).then(res=>{
    //获取用户详情
    console.log(res.data);
    const {statusCode,data,message}=res.data
    if(statusCode===200){
      this.info=data
    }
  })
},
methods:{
async logout(){
 await this.$dialog.confirm({
  title: '温馨提示',
  message: '您确定要退出账户吗',
})
try{
  console.log('确订');
  localStorage.removeItem('token')

    //2.提示退出功能
    this.$toast.success('退出成功')

    //3.跳转login
    this.$router.push('/login')
}
catch(error){
console.log('取消');
}
  /* .then(() => {
    // 1.删除token
    localStorage.removeItem('token')

    //2.提示退出功能
    this.$toast.success('退出成功')

    //3.跳转login
    this.$router.push('/login')
  })
  .catch(() => {
    // on cancel
  }); */
}
}
}
</script>

<style scoped lang="less">
.info {
  height: 100px;
  border-bottom: 2px solid #cccccc;

  display: flex;
  padding: 0 20px;
  align-items: center;

  .left {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .center {
    flex: 1;
    padding-left: 30px;
    height: 50px;
    line-height: 25px;
    font-size: 14px;
    .name {
      color: #000;
    }
  }
}
</style>