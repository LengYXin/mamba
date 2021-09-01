<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <!-- <div class="logo" /> -->
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="[$route.name]"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="item in $router.options.routes" :key="item.name">
          <router-link :to="tolink(item)">{{ item.name }}</router-link>
        </a-menu-item>
      </a-menu>
      <AppUser />
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
import { Options, Vue, Provide } from "vue-property-decorator";
import { SystemController } from "@mamba/clients";
import { reactive, isReactive } from "vue";
import { reaction } from "mobx";
const System = new SystemController();

@Options({
  components: {},
})
export default class extends Vue {
  @Provide({ reactive: true })
  System = reactive(System);
  get pageClass() {
    return " xt-page-" + String(this.$route.name);
  }
  menu = [];
  tolink(item) {
    if (item.name === "login") {
      return { name: item.name, hash: "#/login" };
    }
    return { name: item.name };
  }
  created() {
    reaction(
      () => System.User.value,
      (data) => {
        this.$forceUpdate();
      }
    );
  }
  mounted() {
    console.log("");
    console.log("");
    console.log("LENG ~ extends ~ mounted ~ this", this.System);
    console.log("");
    console.log("");
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.user {
  position: absolute;
  top: 0;
  right: 20px;
  color: #fff;
}
</style>
