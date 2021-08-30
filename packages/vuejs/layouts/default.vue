<template>
  <div class="app-layout">
    <a-config-provider :locale="getAntdLocale(AppConfig.AppSettings.language)">
      <ProLayout v-bind="{ ...Layout, ...AppConfig.AppSettings }">
        <template v-slot:rightContentRender>
          <a-dropdown>
            <a class="ant-dropdown-link">
              <span v-text="$i18n.locale"></span>
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay" @click="onChangeLanguage">
              <a-menu-item v-for="item in languages" :key="item">
                <span v-text="item"></span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
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
@observer
@Component({
  components: {}
})
export default class extends Vue {
  Layout = {
    menus: [],
    collapsed: false,
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
    handleCollapse: (event) => { }
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
      meta: { title: page.name },
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

.app-layout{
  width: 100vw;
}
.app-layout-content {
  // min-height: 100vh;
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
