<template>
  <div>
    <hm-header>我的收藏</hm-header>

   <hm-post v-for="post in listPost" :key="post.id" :post="post"></hm-post>
  </div>
</template>

<script>
export default {
  data(){
    return {
      listPost:[]
    }
  },
async created(){
  let res=await this.$axios.get('/user_star')
  console.log(res.data);
  this.listPost=res.data.data
}
}
</script>

<style>

</style>