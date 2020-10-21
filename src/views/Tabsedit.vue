<template>
  <div>
    <hm-header>栏目管理</hm-header>
    <!-- 点击删除 -->
   <div class="container">
      <div class="title">点击删除一些频道</div>
      <div class="list">
        <div class="item" v-for="tab in activeTabs" :key="tab.id">
          <div @click="del(tab.id)" >{{tab.name}}</div>
          </div>
        
      </div>
    <!-- 点击添加 -->
    <div class="title">点击添加一些频道</div>
    <div class="list">
        <div class="item" v-for="tab in deactiveTabs" :key="tab.id">
          <div @click="add(tab.id)"> {{tab.name}} </div>
          </div>
      </div>
   </div>

  </div>
</template>

<script>
export default {
data(){
  return {
    activeTabs:[],
    deactiveTabs:[],
  }
},
created(){
  this.getActiveTabs()
},
watch:{
  activeTabs(newVal){
    // console.log();
    //数组转化为字符串 JSON.stringify
    localStorage.setItem('activeTabs',JSON.stringify(newVal))
    localStorage.setItem('deactiveTabs',JSON.stringify(this.deactiveTabs))
  }
},
methods:{
//获取栏目列表
async getActiveTabs(){
  //先尝试从本地获取
  //字符串转化为数组 JSON.parse()
let activeTabs =JSON.parse(localStorage.getItem('activeTabs'))
let deactiveTabs =JSON.parse(localStorage.getItem('deactiveTabs'))
if(activeTabs &&deactiveTabs){
  this.activeTabs=activeTabs
  this.deactiveTabs=deactiveTabs
  return 
}
let res=await this.$axios.get('/category')
this.activeTabs=res.data.data
},
 del(id){
let tab=this.activeTabs.find(v => v.id == id)  
this.deactiveTabs.push(tab)
this.activeTabs=this.activeTabs.filter(v=>v.id !==id)
},
add(id){
  let tab=this.deactiveTabs.find(v=>v.id==id)
  this.activeTabs.push(tab)
  this.deactiveTabs=this.deactiveTabs.filter(v=>v.id!==id)
}
}
}
</script>

<style scoped lang="less">
.container{
  padding: 20px;
  .title{
    font-size: 20px;
    line-height: 35px;
    height: 35px;
    font-weight: 700;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    .item{
      height: 40px;
     width: 20%;
     display: flex;
     justify-content: center;
     align-items: center;
     div{
       height: 80%;
       width: 80%;
       background-color: #ddd;
      display: flex;
      justify-content: center;
     align-items: center;
     }
    }
  }
}
</style>