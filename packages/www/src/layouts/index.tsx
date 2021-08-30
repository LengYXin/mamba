import { SettingDrawer } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { Route } from '@ant-design/pro-layout/lib/typings';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'umi';
@withRouter
export default class extends React.Component<{ route?: Route }> {
    menuItemRender(item, dom) {
        return <Link to={item.path} >{dom}</Link>
    }
    render() {
        return (
            <React.Fragment>
                <ProLayout
                    className="wt-layout"
                    menuItemRender={this.menuItemRender}
                    route={this.props.route}
                >
                    {this.props.children}
                </ProLayout>
                <SettingDrawer
                    hideHintAlert
                    disableUrlParams
                />
            </React.Fragment>
        )
    }
}

