import microApp from '@micro-zoe/micro-app';
microApp.start({
    lifeCycles: {
        created() {
            console.info('created 全局监听')
        },
        beforemount() {
            console.info('beforemount 全局监听')
        },
        mounted() {
            console.info('mounted 全局监听')
        },
        unmount() {
            console.info('unmount 全局监听')
        },
        error() {
            console.info('error 全局监听')
        }
    },
    plugins: {
        modules: {
            reactjs: [{
                loader(code: string, url: string) {
                    if (code.indexOf('sockjs-node') > -1) {
                        console.log('react16插件', url)
                        code = code.replace('window.location.port', '3000')
                    }
                    return code
                }
            }],
            // react17: [{
            //     loader(code: string, url: string) {
            //         if (code.indexOf('sockjs-node') > -1) {
            //             console.log('react17插件', url)
            //             code = code.replace('window.location.port', '3002')
            //         }
            //         return code
            //     }
            // }],
        }
    },
    /**
     * 自定义fetch
     * @param url 静态资源地址
     * @param options fetch请求配置项
     * @returns Promise<string>
     */
    // fetch(url: string, options: any, appName: string) {
    //     if (url === 'http://localhost:3001/error.js') {
    //         return Promise.resolve('')
    //     }

    //     let config = null
    //     if (url === 'http://localhost:3001/micro-app/react16/') {
    //         config = {
    //             headers: {
    //                 'custom-head': 'custom-head',
    //             }
    //         }
    //     }

    //     return fetch(url, Object.assign(options, config)).then((res) => {
    //         return res.text()
    //     })
    // }
})
microApp.setGlobalData({ type: '全局数据' })
function dataListener(data) {
    console.log('全局数据', data)
}
export enum EnumMicroApp {
    Vue2 = 'http://localhost:8081/',
    Vue3 = 'http://localhost:8082/',
    React = 'http://localhost:8083/',
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        MicroApp: typeof EnumMicroApp
    }
}
/**
 * 绑定监听函数
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时有缓存数据，是否需要主动触发一次，默认为false
 */
// microApp.addGlobalDataListener(dataListener, true)
// 解除绑定
// microApp.removeGlobalDataListener(dataListener)

// 清空所有全局数据的绑定函数
// microApp.clearGlobalDataListener()