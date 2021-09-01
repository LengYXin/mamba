declare global {
    interface Window {
        __MICRO_APP_ENVIRONMENT__: boolean;
        __MICRO_APP_PUBLIC_PATH__: string;
        __MICRO_APP_BASE_URL__: string;
        microApp: any;
    }
}
if (window.__MICRO_APP_ENVIRONMENT__) {
    console.log("LENG ~ window", window)
    __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__

    /**
     * 绑定监听函数
     * dataListener: 绑定函数
     * autoTrigger: 在初次绑定监听函数时有缓存数据，是否需要主动触发一次，默认为false
     */
    window.microApp?.addGlobalDataListener(dataListener, true)
    // 解除绑定
    // window.microApp?.removeGlobalDataListener(dataListener)
    // 清空所有全局数据绑定函数
    // window.microApp?.clearGlobalDataListener()
}
function dataListener(data) {
    console.warn('全局数据 Reactjs', data)
}
export { }