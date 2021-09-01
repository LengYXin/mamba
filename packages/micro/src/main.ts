import { SystemController } from "@mamba/clients";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { Debounce } from "lodash-decorators";
import { configure, observable } from 'mobx';
import { createApp } from 'vue';
import App from './App.vue';
import components from './components';
import { EnumMicroApp } from './microApp';
import router from './router';
class Text {
    @Debounce(500)
    ontest() {

    }
    @observable
    a = 1
    b = observable({ a: 1 })
}
const System = new SystemController()
console.log("LENG ~ System", System, new Text())
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
