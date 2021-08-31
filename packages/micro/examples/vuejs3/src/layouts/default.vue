<template>
  <div class="app-layout">
    <a-layout style="min-height: 50vh">
      <a-layout-sider >
        <a-menu mode="inline" theme="dark">
          <a-menu-item v-for="item in $router.options.routes" :key="item.name">
            <router-link :to="item.path">{{ item.name }}</router-link>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0" />
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">Ant Design ©2018 Created by Ant UED</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
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
