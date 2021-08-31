import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import createRouters from '@mamba/clients/utils/createRouters';

const routes: Array<RouteRecordRaw> = createRouters({
  rc: require.context('./pages', true, /\.vue$/, 'sync'),
  filter: (fileName) => !/[\\/](view|views|children)[\\/]/.test(fileName),
  component: (file) => file.default
});
let base = process.env.BASE_URL
if (window.__MICRO_APP_BASE_URL__) {
  base = window.__MICRO_APP_BASE_URL__
}
const router = createRouter({
  history: window.__MICRO_APP_BASE_URL__ ? createWebHashHistory() : createWebHistory(base),
  routes
})
console.log("LENG ~ routes", routes)

export default router
