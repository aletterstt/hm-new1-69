<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div v-if="detail.has_follow" @click="unfollow" class="follow">已关注</div>
        <div v-else class="follow" @click="follow">关注</div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="container">
      <div class="title line2">{{detail.title}}</div>
      <div class="name">
        <span>新华网</span>
        <span>2020-10-10</span>
      </div>
      <div v-if="detail.type==1" class="content" v-html="detail.content">

      </div>
      <video v-if="detail.type==2" :src="detail.content" controls>
      </video>
      <div class="bottom">
        <div @click="like" class="like" :class="{active:detail.has_like}">
          <i class="iconfont icondianzan"></i>
          <i>{{detail.like_length}}</i>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comments">
     <hm-comment v-for="comment in commentList " :key="comment.id" :comment="comment"></hm-comment>
     
    </div>
    <!-- 底部 -->
    <div class="footer">
      <!-- input  -->
      <div class="input" v-if="!isShow">
        <div class="left">
          <input type="text" placeholder="写跟帖" ref="input" @focus="handleFocus">
        </div>
        <div class="center">
          <van-icon name="chat-o" badge="9" />
        </div>
        <div class="right">
          <van-icon name="star-o" />
          </div>
      </div>
      <!-- textarea -->
      
      <div class="textarea" v-else>
         <div class="left">
          <textarea
           ref="handleBlur"
           @blur="handleBlur"
            placeholder="请输入内容"
          ></textarea>
        </div>
        <div class="right">
          <div class="send">发送</div>
        </div>
      </div>
    </div>
    <div ref="aa">aa</div>
    <div ref="bb">bb</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      detail:{},
      commentList:[],
      isShow:false
    }
  },
created(){
  // console.log('详情页',this.$route.params.id);
  this.getDetail()
  this.getComments()

},
methods:{
  async getDetail(){
    let res=await this.$axios.get(`/post/${this.$route.params.id}`)
    console.log(res.data.data);
    this.detail=res.data.data
  },
  // 取消关注
  async unfollow(){
    let token=localStorage.getItem('token')
   if(!token){
     this.$toast('请先登录')
     this.$router.push({
       name:"login",
       params:{
         back:true
       }
     })
     return 
   }
     let res = await this.$axios.get(`user_unfollow/${this.detail.user.id}`)
   const {message}=res.data
   this.$toast.success(res.data.message)
   this.getDetail()
  },
  // 关注
 async follow(){
   let token=localStorage.getItem('token')
   if(!token){
     this.$toast('请先登录')
     this.$router.push({
       name:"login",
       params:{
         back:true
       }
     })
     return 
   }
   let res = await this.$axios.get(`user_follows/${this.detail.user.id}`)
   const {statusCode,message}=res.data
   if(statusCode==200){
    this.$toast.success(res.data.message)
    this.getDetail()
   }
  
 },
 async like(){
 let token=localStorage.getItem('token')
 if(!token){
   this.$toast('请登录')
   this.$router.push({
     name:"login",
     params:{
       back:true
     }
   })
   return 
 }
 let res =await this.$axios.get(`/post_like/${this.detail.id}`)
 this.$toast.success(res.data.message)
 this.getDetail()
 },

async getComments(){
let res = await this.$axios.get(`/post_comment/${this.$route.params.id}`)
console.log('评论列表',res.data);
this.commentList=res.data.data
},
handleFocus(){
  this.isShow=true
},
handleBlur(){
  this.isShow=false
}
 
}
}
</script>

<style scoped lang="less">
/deep/ img{
  width: 100%;
}
video{
  width: 100%;
}
.header{
  display: flex;
  height: 50px;
  border-bottom: 1px solid #000;
  align-items: center;
  .left{
    width: 40px;
    text-align: center;
    i{
      font-size: 20px;
    }
  }
  .center{
    flex: 1;
    padding-left: 10px;
    i{
      font-size: 50px;
    }
  }
  .right{
    width: 80px;
    .follow{
      border: 1px solid #000;
      width: 46px;
      height: 20px;
      // line-height: 10px;
      text-align: center;
      padding: 5px;
      border-radius: 10px;
    }
  }
}
.container{
  padding: 10px;
  .title{
    font-size: 20px;
    font-weight: 700;
    margin: 10px 0;  
  }
  .name{
    color: #999;
    span{
      margin-right: 20px;
    }
  }
}
.bottom{
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  .like{
    height: 30px;
    width: 80px;
    border: 1px solid #000;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    i{
      margin: 0 5px;
    }
  }
  .like.active{
    border: 1px solid #f00;
    i{
      color: #f00;
    }
  }
}
.comments{
  border-top: 2px solid #aaaaaa;
  padding-bottom: 40px;
}
.footer{
  position: fixed;
  width: 100%;
  bottom: 0;
  border-top: 1px solid #ccc;
  .input{
      height: 40px;
      display: flex;
      .left{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        input{
          height: 30px;
          width: 80%;
          border: none;
          border-radius: 15px;
          background-color: #ddd;
          text-indent: 1em;
        }
      }
      .center,.right{
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .van-icon-chat-o{
        font-size: 30px;
      }
      .van-icon-star-o{
        font-size: 30px;
      }
  }
 .textarea {
    height: 70px;
    display: flex;
    .left {
      flex: 1;
      // background: pink;
      display: flex;
      justify-content: center;
      align-items: center;
      textarea {
        border: none;
        width: 90%;
        height: 75%;
        border-radius: 8px;
        resize: none;
        background: #ddd;
        text-indent: 1em;
        padding-top: 5px;
      }
    }
    .right {
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .send {
        background: #f00;
        color: #fff;
        width: 40px;
        height: 30px;
        border-radius: 5px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
</style>