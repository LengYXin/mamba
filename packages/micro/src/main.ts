import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { EnumMicroApp } from './microApp';
const RootApp = createApp(App)
    .use(router)
    .use(Antd);
RootApp.mount('#app');
RootApp.config.warnHandler = () => { }
RootApp.config.globalProperties.MicroApp = EnumMicroApp;
// RootApp.config.isCustomElement = tag => tag.startsWith('micro-')
// RootApp.config.compilerOptions.isCustomElement = (tag) => lodash.includes(['micro-app'], tag)
