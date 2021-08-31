import { observer } from 'mobx-react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from 'router';
import Login from './login';
import './style.less';
const Layout = React.lazy<any>(() => import('./layout'));
// const Login = React.lazy<any>(() => import('./login'));
@observer
export default class extends React.Component {
    get locale() {
        return this.getAntdLocale(this.AppConfig.AppSettings.language)
    }
    renderPage() {
        if (this.$Store.System.LoginIn)
            return <BrowserRouter basename={window.__MICRO_APP_BASE_URL__}>
                <Layout route={{ routes: Routers.RouterConfig }} >
                    <React.Suspense fallback={<div className="app-content-full"> <React.Antd.Spin /></div>}>
                        {Routers.Routers}
                    </React.Suspense>
                </Layout>
            </BrowserRouter>
        return <Login />
    }
    render() {
        return (
            <React.Antd.ConfigProvider locale={this.locale}>
                <React.Suspense fallback={<div className="app-content-full"> <React.Antd.Spin /></div>}>
                    {this.renderPage()}
                </React.Suspense>
            </React.Antd.ConfigProvider>
        )
    }
}
const defaultProps = {
    route: {
        path: '/',
        routes: [
            {
                path: '/example',
                name: '示例页面',
                icon: <React.Icons.FormOutlined />,
                component: './Welcome',
            },
            {
                path: '/test',
                name: '欢迎2',
                icon: <React.Icons.FormOutlined />,
                component: './Welcome',
            },
            {
                path: '/admin',
                name: '管理页',
                icon: <React.Icons.FormOutlined />,
                access: 'canAdmin',
                component: './Admin',
                routes: [
                    {
                        path: '/admin/sub-page1',
                        name: '一级页面',
                        icon: <React.Icons.FormOutlined />,
                        component: './Welcome',
                    },
                    {
                        path: '/admin/sub-page2',
                        name: '二级页面',
                        icon: <React.Icons.FormOutlined />,
                        component: './Welcome',
                    },
                    {
                        path: '/admin/sub-page3',
                        name: '三级页面',
                        icon: <React.Icons.FormOutlined />,
                        component: './Welcome',
                    },
                ],
            },
            {
                name: '列表页',
                icon: <React.Icons.FormOutlined />,
                path: '/list',
                component: './ListTableList',
                routes: [
                    {
                        path: '/list/sub-page',
                        name: '一级列表页面',
                        icon: <React.Icons.FormOutlined />,
                        routes: [
                            {
                                path: 'sub-sub-page1',
                                name: '一一级列表页面',
                                icon: <React.Icons.FormOutlined />,
                                component: './Welcome',
                            },
                            {
                                path: 'sub-sub-page2',
                                name: '一二级列表页面',
                                icon: <React.Icons.FormOutlined />,
                                component: './Welcome',
                            },
                            {
                                path: 'sub-sub-page3',
                                name: '一三级列表页面',
                                icon: <React.Icons.FormOutlined />,
                                component: './Welcome',
                            },
                        ],
                    },
                    {
                        path: '/list/sub-page2',
                        name: '二级列表页面',
                        icon: <React.Icons.FormOutlined />,
                        component: './Welcome',
                    },
                    {
                        path: '/list/sub-page3',
                        name: '三级列表页面',
                        icon: <React.Icons.FormOutlined />,
                        component: './Welcome',
                    },
                ],
            },
            {
                path: 'https://ant.design',
                name: 'Ant Design 官网外链',
                icon: <React.Icons.FormOutlined />,
            },
        ],
    },
}