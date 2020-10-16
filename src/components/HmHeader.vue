<template>
  <div class="hm-header">
    <div class="m">
      <div class="left"  @click="$route.path !=='/login' ? $router.back() : ''">
      <i  class="iconfont iconjiantou2"></i>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
    </div>
  </div>
</template>

<script >
export default {};
</script>

<style scoped lang="less">
.hm-header {
  height: 40px;
 .m{
    position: fixed;
  width: 100%;
  display: flex;
  z-index: 999;
  height: 40px;
  text-align: center;
  /* background-color: pink; */
  align-items: center;
 }
}
.left,
.right {
  width: 40px;

  text-align: center;
}
.center {
  flex: 1;
  font-size: 18px;
  font-weight: 700;
}
</style>