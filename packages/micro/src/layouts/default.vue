<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="[$route.name]"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="item in $router.options.routes" :key="item.name">
          <router-link :to="{ name: item.name }">{{ item.name }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', minHeight: '100vh' }">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
@Options({
  components: {}
})
export default class extends Vue {
  get pageClass() {
    return " xt-page-" + String(this.$route.name);
  }
  menu = []
  mounted() {
    console.log("LENG ~ extends ~ mounted ~ this", this.$router.options.routes)
  }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less" scoped>
</style>
