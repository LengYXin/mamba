<template>
  <div class="app-layout">
    <Nuxt
      :keep-alive="keepAlive"
      :keepAliveProps="keepAliveProps"
      class="app-layout-content"
      :class="pageClass"
    />
    <van-tabbar route :value="$route.name">
      <van-tabbar-item replace icon="home-o" to="/" name="“index”">瀑布</van-tabbar-item>
      <van-tabbar-item replace icon="search" to="/pagination" name="“pagination”">分页</van-tabbar-item>
      <van-tabbar-item replace icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item replace icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {}
})
export default class extends Vue {
  get pageClass() {
    return " xt-page-" + this.$route.name;
  }
  keepAlive = true;
  keepAliveProps = {
    // include: [
    // ],
    // exclude: [
    // ],
  };
  onClickLeft() { }
  onClickRight() { }
  mounted() {
  }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less" scoped>
body {
  padding-bottom: constant(safe-area-inset-bottom);
  /*兼容 IOS<11.2*/
  padding-bottom: env(safe-area-inset-bottom);
  /*兼容 IOS>11.2*/
  box-sizing: border-box;
}

.app-layout-content {
  padding-bottom: @tabbar-height + 30;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
<style lang="less">
@time: 0.2s;
.page-enter-active,
.page-leave-active {
  transition: opacity @time;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity @time;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}
</style>