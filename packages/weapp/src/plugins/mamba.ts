import * as Mamba from '@mamba/clients';
import taro from '@tarojs/taro';
import lodash from 'lodash';
import React from 'react';
import Storage from './storage';
import { from } from 'rxjs';
lodash.set(React, '$Mamba', Mamba)
lodash.set(React, 'BasesController', Mamba.BasesController)
lodash.set(React, 'BasesDetails', Mamba.BasesDetails)
lodash.set(React, 'BasesPagination', Mamba.BasesPagination)
lodash.set(React, 'BaseModel', Mamba.BaseModel)
Mamba.AjaxBasics.createAjax = function (AjaxConfig) {
    return from(taro.request({
        // @ts-ignore
        url: AjaxConfig.url,
        data: AjaxConfig.body,
        // @ts-ignore
        method: AjaxConfig.method,
        header: AjaxConfig.headers,
        timeout: AjaxConfig.timeout,
        // @ts-ignore
        responseType: AjaxConfig.responseType,
    }))
};
Mamba.AjaxBasics.onError = function (error, AjaxConfig) {
    taro.showToast({ title: '网络开小差了,请稍后再试~', icon: 'none' })
};
Mamba.AjaxBasics.onStart = function (AjaxConfig) {
    taro.showLoading({ title: 'Loading...' })
};
Mamba.AjaxBasics.onEndAll = function () {
    taro.hideLoading()
};
Mamba.basesOptions.createStorage = function () {
    return Storage
}
declare module 'react' {
    const $Mamba: typeof Mamba;
    /** 基础 控制器 */
    class BasesController<T = any> extends Mamba.BasesController<T> { }
    /** 基础 状态管理 */
    class BaseModel<T = any> extends Mamba.BaseModel<T> { }
    /** 基础 数据详情 */
    class BasesDetails<T = any> extends Mamba.BasesDetails<T> { }
    /** 基础 分页列表数据管理 */
    class BasesPagination<T = any> extends Mamba.BasesPagination<T> { }
    interface Component {
        /** 路由参数 */
        readonly $Router: taro.RouterInfo;
    }

}