import { Route } from '@ant-design/pro-layout/lib/typings';
import { TabsProps } from 'antd/es/tabs';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { observer } from 'mobx-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
@withRouter
@observer
@BindAll()
export default class extends React.Component<{ route?: Route }> {
    menuItemRender(item, dom) {
        return <React.Antd.Link to={item.path} >{dom}</React.Antd.Link>
    }
    rightContentRender() {
        return <RightContentRender />
    }
    render() {
        return (
            <React.Fragment>
                <React.Antd.ProLayout
                    className="wt-layout"
                    menuItemRender={this.menuItemRender}
                    route={this.props.route}
                    rightContentRender={this.rightContentRender}
                    {...this.AppConfig.LayoutSettings}
                >
                    <PageContainer>
                        {this.props.children}
                    </PageContainer>
                </React.Antd.ProLayout>
                <React.Antd.SettingDrawer
                    hideHintAlert
                    disableUrlParams
                    settings={this.AppConfig.LayoutSettings}
                    onSettingChange={(layoutSettings) => this.AppConfig.onChangeAppSettings(layoutSettings)}
                />
            </React.Fragment>
        )
    }
}
@BindAll()
class PageContainer extends React.Component {
    readonly tabProps: TabsProps = {
        type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => console.log(e, action),
    }
    get tabList() {
        if (this.AppConfig.userAgent.isMobile) {
            return []
        }
        return [
            {
                tab: '基本信息',
                key: 'base',
                closable: false,
            },
            {
                tab: '详细信息',
                key: 'info',
            },
        ]
    }
    render() {
        return (
            <React.Antd.PageContainer
                fixedHeader
                tabList={this.tabList}
                tabProps={this.tabProps}
                header={{ title: '' }} >
                {this.props.children}
            </React.Antd.PageContainer>
        )
    }
}
@BindAll()
class RightContentRender extends React.Component {
    get languages() {
        return lodash.keys(this.$i18n.options.resources)
    }
    onChangeLanguage(event) {
        this.AppConfig.onChangeAppSettings({ language: event.key })
    }
    overlayLanguage() {
        return <React.Antd.Menu onClick={this.onChangeLanguage}>
            {this.languages.map(x => <React.Antd.Menu.Item key={x} icon={<React.Icons.UserOutlined />} >
                {x}
            </React.Antd.Menu.Item>)}
        </React.Antd.Menu>
    }
    overlayUser() {
        return <React.Antd.Menu onClick={event => {
            if (event.key === '4') {
                this.$Store.System.onLoginOut()
            }
        }} >
            <React.Antd.Menu.Item key='1' icon={<React.Icons.UserOutlined />}>
                <React.Antd.I18n i18nKey={this.$Enumlocales.action_user_codeGenerator} />
            </React.Antd.Menu.Item>
            <React.Antd.Menu.Item key='2' icon={<React.Icons.UserOutlined />}>
                <React.Antd.I18n i18nKey={this.$Enumlocales.action_user_apiDocument} />
            </React.Antd.Menu.Item>
            <React.Antd.Menu.Item key='3' icon={<React.Icons.UserOutlined />}>
                <React.Antd.I18n i18nKey={this.$Enumlocales.action_user_changePassword} />
            </React.Antd.Menu.Item>
            <React.Antd.Menu.Item key='4' icon={<React.Icons.UserOutlined />}>
                <React.Antd.I18n i18nKey={this.$Enumlocales.action_user_logout} />
            </React.Antd.Menu.Item>
        </React.Antd.Menu>
    }
    render() {
        return (
            <React.Antd.Space >
                <React.Antd.Dropdown overlay={this.overlayUser()} >
                    <div className="wt-layout-space">
                        <React.Antd.Space>
                            <React.Antd.Avatar size="small" icon={<React.Icons.UserOutlined />} />
                            <span>用户名称</span>
                        </React.Antd.Space>
                    </div>
                </React.Antd.Dropdown>
                <React.Antd.Dropdown overlay={this.overlayLanguage()} >
                    <React.Antd.Button className="wt-layout-space" block type="link">{this.$i18n.language}</React.Antd.Button>
                </React.Antd.Dropdown>
            </React.Antd.Space>
        )
    }
}
