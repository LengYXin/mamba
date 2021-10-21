<template>
  <van-skeleton title avatar :row="3" :loading="PageController.loading">
    <van-card
      :desc="PageController.entity.introduce"
      :title="PageController.entity.name"
      :thumb="PageController.entity.avatar"
    />
  </van-skeleton>
</template>
<script lang="ts">
import { Observer } from "mobx-vue";
import { Component, Vue } from "vue-property-decorator";
@Observer
@Component({
  layout: 'navBar',
  components: {}
})
export default class extends Vue {
  get PageController() {
    return this.$Store.Example.Details
  }
  created() {
    this.PageController.onLoad(this.$route.query)
  }
  mounted() { }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less">
</style>
