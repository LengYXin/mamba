import lodash from 'lodash';
import { renderRoutes, RouteConfig } from "react-router-config";
import React from 'react';
import createRouters from '@mamba/clients/utils/createRouters';
class Router {
  lazy = false;
  readonly PageFiles = require.context('./pages', true, /\.tsx$/, 'sync') // 根据目录结构去搜索文件
  /**
   * 参考 https://zh.nuxtjs.org/docs/2.x/features/file-system-routing
   * @memberof Router
   */
  RouterConfig: RouteConfig[] = createRouters({
    rc: this.PageFiles,
    filter: (fileName) => !/[\\/](view|views|children)[\\/]/.test(fileName),
    component: (file) => {
      if (this.lazy) {
        return React.lazy(() => {
          return new Promise<{ default }>(async (res, rej) => {
            // await waitTime(1000)
            const defaultPage = await file
            res(defaultPage)
          })
        })
      }
      return file.default
    }
  });
  Routers = renderRoutes(this.RouterConfig);
}
export default new Router()