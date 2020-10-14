<template>
  <div class="hm-header">
    <div class="left"  @click="$route.path !=='/login' ? $router.back() : ''">
      <i  class="iconfont iconjiantou2"></i>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.hm-header {
  display: flex;
  height: 40px;
  text-align: center;
  /* background-color: pink; */
  align-items: center;
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