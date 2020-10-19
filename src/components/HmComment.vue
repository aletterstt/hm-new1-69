<template>
  <div class="hm-comment">
    <!-- 头部 -->
  <div class="header">
      <div class="left">
      <img :src="$axios.defaults.baseURL+comment.user.head_img" alt="">
    </div>
    <div class="center">
      <div class="name">{{comment.user.nickname}}</div>
      <div class="date">{{comment.create_date | date}}</div>
    </div>
    <div class="right">
      回复
    </div>
  </div>
  <!-- 楼层 -->
  <hm-floor :count="getCount(0,comment)" v-if="comment.parent" :parent="comment.parent"></hm-floor>
  <!-- 内容 -->
  <div class="content">
{{comment.content}}
  </div>
  </div>
</template>

<script>
export default {
props:['comment'],
methods:{
  //递归
  getCount(num,parent){
    if(parent.parent){
      return this.getCount(num+1,parent.parent)
    }
    else{
      return num
    }
  }
}
}
</script >

<style scoped lang="less">
.hm-comment{
  padding: 20px;
  border-bottom: 1px solid #ccc;

  .header{
     display: flex;
     align-items: center;
    .left{
      img{
         
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        }
    }
    .center{
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 50px;
      line-height: 25px;
      justify-content: space-around;
      .date{
        color: #999;
      }
    }
    .right{
      width: 40px;
       color: #999;
    }
  }
  .content{
    margin: 5px 0;
  }
}
</style>