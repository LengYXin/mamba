import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import createRouters from '@mamba/clients/utils/createRouters';
import lodash from 'lodash';

const routes: Array<RouteRecordRaw> = createRouters({
  rc: require.context('./pages', true, /\.vue$/, 'sync'),
  filter: (fileName) => !/[\\/](view|views|children)[\\/]/.test(fileName),
  component: (file) => {
    // if (this.lazy) {
    //   return React.lazy(() => {
    //     return new Promise<{ default }>(async (res, rej) => {
    //       // await waitTime(1000)
    //       const defaultPage = await file
    //       res(defaultPage)
    //     })
    //   })
    // }
    return file.default
  }
}).map((item: any) => {
  if (lodash.includes(['reactjs', 'vuejs2', 'vuejs3'], item.name)) {
    item.path += '/:page*'
  }
  return item
});
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  // console.warn("LENG ~ router.beforeEach ~ to", to)
})
console.log("LENG ~ routes", routes)

export default router
