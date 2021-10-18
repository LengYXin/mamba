<template>
  <div class="app-layout">
    <a-config-provider :locale="getAntdLocale(AppConfig.AppSettings.language)">
      <ProLayout v-bind="layoutMerge(AppConfig.AppSettings)">
        <template #rightContentRender>
          <ViewRight />
        </template>
        <SettingDrawer :settings="AppConfig.AppSettings" @change="AppConfig.onChangeAppSettings" />
        <Nuxt
          :keep-alive="keepAlive"
          :keepAliveProps="keepAliveProps"
          class="app-layout-content"
          :class="pageClass"
        />
      </ProLayout>
    </a-config-provider>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import lodash from 'lodash';
import { observer } from "mobx-vue";
import ViewRight from "./views/rightContentRender.vue";
@observer
@Component({
  components: { ViewRight }
})
export default class extends Vue {
  Layout = {
    menus: [],
    collapsed: true,
    autoHideHeader: false,
    fixedHeader: true, // sticky header
    fixSiderbar: true, // sticky siderbar
    query: {},
    layout: 'sidemenu',
    contentWidth: 'Fluid',
    theme: 'dark',
    isMobile: false,
    i18nRender: (event) => { return event },
    handleMediaQuery: (event) => { },
    handleCollapse: (event) => {
      this.Layout.collapsed = event
    },
  }
  layoutMerge(AppSettings) {
    return lodash.merge({}, this.Layout, AppSettings)
  }
  get pageClass() {
    return " xt-page-" + this.$route.name;
  }
  get languages() {
    return lodash.keys(this.$i18n.messages)
  }
  keepAlive = true;
  keepAliveProps = {
    // include: [
    // ],
    // exclude: [
    // ],
  };
  onChangeLanguage(event) {
    this.AppConfig.onChangeAppSettings({ type: 'language', value: event.key })
  }
  onClickLeft() { }
  onClickRight() { }
  toMenu(page) {
    return {
      path: page.path,
      name: page.name,
      meta: { title: page.name, icon: 'menu-fold' },
      children: page.children && lodash.map(page.children, this.toMenu)
    }
  }
  mounted() {
    this.Layout.menus = lodash.map(lodash.filter(this.$router.options.routes, item => {
      if (item.name === 'index' || ['views', 'controller', 'locales'].some(inc => lodash.includes(item.name, inc))) {
        return false
      }
      return true
    }), this.toMenu)
  }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less" scoped>
.app-layout {
  &-content {
    box-sizing: border-box;
  }
  .ant-pro-basicLayout-content {
    margin: 10px;
  }
  .ant-layout-footer {
    display: none;
  }
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
