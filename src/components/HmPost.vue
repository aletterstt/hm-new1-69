<template>
  <div>
     <!-- 视频 -->
    <div class="video-post" v-if="post.type===2">
     <div class="title line1">
       {{post.title}}
        </div>
        <div class="imgs">
          <img :src="fixeUrl(post.cover[0].url)" alt="">
          <div class="play">
            <div class="iconfont iconshipin"></div>
          </div>
        </div>
      <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span> {{post.comments?post.comments.length:post.comment_length}} 跟帖</span>
        </div>
    </div>
    <!--单张图片  -->
    <div class="sing-img-post" v-if="post.cover.length<3">
      <div class="left">
        <div class="title line2">
          {{post.title}}
        </div>
        <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span> {{post.comments?post.comments.length:post.comment_length}} 跟帖</span>
        </div>
      </div>
    
      <div class="right">
        <img :src="fixeUrl(post.cover[0].url)" alt="">
      </div>
    </div>

    <!-- 多张图片 -->
    <div class="multi-img-post" v-else>
      <div class="title line1">
        {{post.title}}
        </div>
        <div class="imgs">
          <img :src="fixeUrl(post.cover[0].url)" alt="">
          <img :src="fixeUrl(post.cover[1].url)" alt="">
          <img :src="fixeUrl(post.cover[2].url)" alt="">
          
        </div>
      <div class="bottom">
          <span>{{post.user.nickname}}</span>
          <span>{{post.comments?post.comments.length:post.comment_length}}  跟帖</span>
        </div>
    </div>
   
  </div>
</template>

<script>
export default {
props:["post"],
methods:{
  fixeUrl(url){
    if(url.startsWith('http')){
      return url
    }
    else{
      return this.$axios.defaults.baseURL+url
    }
  }
}
}
</script>

<style scoped lang="less">
title{
  font-size: 14px;
      line-height: 20px;
    }
    span{
      color: #999;
    }
.sing-img-post{
  padding: 10px;
  border-bottom: 1px solid #cccccc;
  display: flex;
  .left{
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    justify-content: space-between;
    
  }
  .right{
    width: 110px;
    img{
      width: 110px;
      height: 75px;
      object-fit: cover;
    }
  }
}
.multi-img-post{
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .imgs{
    img{
      width: 110px;
      height: 75px;
      object-fit: cover;
    }
  }
}
.video-post{
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #cccccc;
  .imgs{
  img{
      padding: 10px;
    width: 340px;
    height: 170px;
    object-fit: cover;
  }
  .play{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 60px;
    height: 60px;
    background-color: rgba(0,0,0,0.5);
    border-radius: 50%;
    text-align: center;
    line-height: 60px;
    .iconfont{
      font-size: 34px;
      color: #ffffff;
    }
  }
  }
}
</style>