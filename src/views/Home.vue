<template>
  <div>
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>搜索新闻
      </div>
      <div class="right">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
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
    text-align: center;
    font-size: 12px;
    .iconsearch{
      padding-right: 10px;
    }
  }
}
</style>