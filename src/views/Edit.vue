<template>
 <div>
    <hm-header>编辑资料</hm-header>

  <!-- 头像 -->

  <div class="avatar">
    <img :src="$axios.defaults.baseURL+info.head_img" alt="">
    <van-uploader class="uploader" :after-read="afterRead" :before-read="beforeRead" />
  </div>

  <!-- 列表 -->

  <van-cell-group>
  <van-cell title="昵称" :value="info.nickname" is-link @click="showNickname"/>
  <van-cell title="密码" value="****" is-link />
   <van-cell @click="showGender" title="性别" :value="info.gender ===1 ? '男':'女'" is-link />
</van-cell-group>


<!-- //修改昵称的弹框 -->
<van-dialog @confirm="confirmNickname" v-model="isShowNickname"  title="修改昵称" show-cancel-button>
 <van-field v-model="nickname"  placeholder="请输入新的昵称" />
</van-dialog>

<!-- //修改性别的弹框 -->
<van-dialog @confirm="confirmGender"  v-model="isShowGender"  title="修改昵称" show-cancel-button>
<van-radio-group v-model="gender">
  <van-cell-group>
    <van-cell title="男" clickable @click="gender = 1">
      <template #right-icon>
        <van-radio :name="1" />
      </template>
    </van-cell>
    <van-cell title="女" clickable @click="gender = 0">
      <template #right-icon>
        <van-radio :name="0" />
      </template>
    </van-cell>
  </van-cell-group>
</van-radio-group>
</van-dialog>
 </div>

</template>

<script>
export default {
  data(){
  return {
    info:{},
    isShowNickname:false,
    nickname:"",
    isShowGender:false,
    gender:1
  }
},
created(){
this.getInfo()
},

methods:{
  //获取用户信息
async getInfo(){
  // let token=localStorage.getItem('token')
  let user_id=localStorage.getItem('user_id')
 let res=await this.$axios.get(`/user/${user_id}`)
  console.log(res.data);
    if(res.data.statusCode==200){
    this.info=res.data.data
    }
},
showNickname(){
      // 显示 
      this.isShowNickname = true
      // 给 nickname 赋值
      this.nickname = this.info.nickname
    },
confirmNickname(){
    // console.log(111);
    if(this.nickname===this.info.nickname){
      this.$toast("新旧昵称一样")
      return
    }
    else{
      //发送请求修改昵称
      this.ml_editUser({
       nickname:this.nickname
     })
    }
},
showGender(){
  this.isShowGender=true,
  this.gender=this.info.gender
},

confirmGender(){
  if(this.gender===this.info.gender){
      this.$toast("新旧性别一样")
      return
    }
    else{
      //发送请求修改昵称
     this.ml_editUser({
       gender:this.gender
     })
    //  this.$toast.success("修改性别成功")
    }
},
async  ml_editUser(data){
      let user_id=localStorage.getItem('user_id')
     
    let res=await this.$axios.post(`/user_update/${user_id}`,data)
   
    this.getInfo()
    this.$toast.success(res.data.message)
   /* .then(res=>{
        // console.log(res.data);
        this.getInfo()
        this.$toast.success(res.data.message)
      }) */

      
},
//读取图片前的回调
beforeRead(data){
//限制图片的大小
if(data.size/1024>50){
this.$toast.fail('图片不能超过5kb')
return false
}
/* if(data.type!=='images/png'){
  this.$toast.fail('图片只能是png类型')
  return false
} */
},
//读取图片后的回调
async afterRead(data){
console.log('图片',data.file);
let formdata=new FormData()
formdata.append('file',data.file)
let res= this.$axios.post('/upload',formdata)
   this.ml_editUser({
    head_img:res.data.data.url
  })
/* .then(res=>{
  this.ml_editUser({
    head_img:res.data.data.url
  })
}) */
}  
}
}
</script>

<style scoped lang="less">
.avatar{
  position: relative;
  text-align: center;
  margin: 20px 0;
  img{
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
  }
  .uploader{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    opacity: 0;

  }
}

</style>