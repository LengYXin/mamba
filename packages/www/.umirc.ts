import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
  // layout: {},
  mfsu: {},
  exportStatic: {
    // htmlSuffix: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  webpack5: {
    // lazyCompilation: { entries: true, imports: true } 
  },
});
