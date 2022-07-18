import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];
let base = process.env.BASE_URL
if (window.__MICRO_APP_BASE_URL__) {
  base = window.__MICRO_APP_BASE_URL__
}
const router = new VueRouter({
  mode: window.__MICRO_APP_BASE_URL__ ? 'hash' : 'history',
  // mode: 'hash',
  base: base,
  routes,
});

export default router;
