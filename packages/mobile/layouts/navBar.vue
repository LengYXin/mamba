<template>
  <div class="app-layout">
    <van-nav-bar
      v-show="show"
      title="标题"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <Nuxt
      :keep-alive="keepAlive"
      :keepAliveProps="keepAliveProps"
      class="app-layout-content"
      :class="pageClass"
    />
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
  get show() {
    return !this.AppConfig.userAgent.isWechatBowser
  }
  keepAlive = true;
  keepAliveProps = {
    include: [
    ],
    exclude: [

    ],
  };
  onClickLeft() {
    this.$router.back()
  }
  onClickRight() { }
  mounted() {
  }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less">
</style>
