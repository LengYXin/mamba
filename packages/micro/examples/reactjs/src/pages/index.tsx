import { BindAll } from 'lodash-decorators';
import * as React from 'react';

export interface IAppProps {
}
@BindAll()
export default class App extends React.Component<IAppProps> {
    state = { baseData: {} }
    dataListener(baseData) {
        console.log('来自基座应用的数据', baseData)
        this.setState({ baseData })
    }
    onSend() {
        window.microApp?.dispatch({ type: `子应用发送的数据${Date.now()}` })
    }
    componentDidMount() {
        /**
         * 绑定监听函数
         * dataListener: 绑定函数
         * autoTrigger: 在初次绑定监听函数时有缓存数据，是否需要主动触发一次，默认为false
         * 补充: autoTrigger主要是为子应用提供的，因为子应用是异步渲染的，如果在子应用还没渲染时基座应用发送数据，子应用在初始化后不会触发绑定函数，但这个数据会放入缓存中，此时可以设置autoTrigger为true主动触发一次监听函数来获取数据。
         */
        window.microApp?.addDataListener(this.dataListener, true)
    }
    componentWillUnmount() {
        // 解除绑定
        window.microApp?.removeDataListener(this.dataListener)
        // 清空所有当前应用的绑定函数
        window.microApp?.clearDataListener()
    }
    public render() {
        return (
            <div>
                <img src="/logo192.png" />
                <div>{JSON.stringify(this.state.baseData, null, 4)}</div>
            </div>
        );
    }
}
