import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { configure } from 'mobx';
import { createApp } from 'vue';
import App from './App.vue';
import components from './components';
import { EnumMicroApp } from './microApp';
import router from './router';
configure({ enforceActions: "observed" });
const RootApp = createApp(App);
RootApp.config.globalProperties.MicroApp = EnumMicroApp;
RootApp.use(components)
    .use(router)
    .use(Antd);
RootApp.mount('#app');
RootApp.config.warnHandler = () => { }
// RootApp.config.isCustomElement = tag => tag.startsWith('micro-')
// RootApp.config.compilerOptions.isCustomElement = (tag) => lodash.includes(['micro-app'], tag)
