export * from './page/details/script'
export * from './page/field/script'
export * from './page/field/declare'
import PageProvider from "./page/provider.vue";
import PageDetails from "./page/details/index.vue";
import PageField from "./page/field/index.vue";
import PageFilter from "./page/filter.vue";
import PageView from "./page/view.vue";
import PageTable from "./page/table.vue";
import PageAction from "./page/action/index.vue";
import PageGrid from "./page/grid/index.vue";
import i18n from "./page/i18n.vue";
import Vue from 'vue';

Vue.component("i18nT", i18n);
Vue.component("PageProvider", PageProvider);
Vue.component("PageView", PageView);
Vue.component("PageFilter", PageFilter);
Vue.component("PageField", PageField);
Vue.component("PageDetails", PageDetails);
Vue.component("PageTable", PageTable);
Vue.component("PageAction", PageAction);
Vue.component("PageGrid", PageGrid);
