import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { configure } from 'mobx';
import { createApp } from 'vue';
import App from './App.vue';
import components from './components';
import { EnumMicroApp } from './microApp';
import router from './router';
import { SystemController } from "@mamba/clients";
import { reactive, isReactive } from "vue";
configure({ enforceActions: "observed" });
const RootApp = createApp(App);
RootApp.config.globalProperties.MicroApp = EnumMicroApp;
// RootApp.config.globalProperties.System = reactive(new SystemController());
RootApp.use(components)
    .use(router)
    .use(Antd);
RootApp.mount('#app');
RootApp.config.warnHandler = () => { }
// RootApp.config.isCustomElement = tag => tag.startsWith('micro-')
// RootApp.config.compilerOptions.isCustomElement = (tag) => lodash.includes(['micro-app'], tag)
// declare module '@vue/runtime-core' {
//     interface ComponentCustomProperties {
//         System: SystemController
//     }
// }