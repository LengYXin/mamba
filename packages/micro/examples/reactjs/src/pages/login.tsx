import {
    AlipayCircleOutlined, LockOutlined, MobileOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined
} from '@ant-design/icons';
import ProFormCaptcha from '@ant-design/pro-form/es/components/Captcha';
import ProFormField from '@ant-design/pro-form/es/components/Field';
import LoginForm from '@ant-design/pro-form/es/layouts/LoginForm';
import { Checkbox, message, Space, Tabs, Button } from 'antd';
import { BindAll } from 'lodash-decorators';
import React, { CSSProperties } from 'react';
import { observer } from 'mobx-react';
import { SystemController } from '@mamba/clients';
const iconStyles: CSSProperties = {
    marginLeft: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

@observer
@BindAll()
export default class extends React.Component {
    get System(): SystemController {
        return this.state.System
    };
    state = {
        loginType: 'account',
        System: null
    }
    dataListener(baseData) {
        const { System } = baseData;
        if (!this.System) {
            this.setState({ System })
        }
        console.log('来自基座应用的数据', baseData)
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
    async onFinish(formData) {
        console.log("LENG ~ extends ~ onFinish ~ formData", formData)
        message.loading('认证中，请稍等~')
        await this.System.onLogin(formData)
        message.destroy()
        return true
    }
    componentWillUnmount() {
        // 解除绑定
        window.microApp?.removeDataListener(this.dataListener)
        // 清空所有当前应用的绑定函数
        window.microApp?.clearDataListener()
    }
    onChange(activeKey) {
        this.setState({ loginType: activeKey })
    }
    renderForm() {
        const { loginType } = this.state;

        if (loginType === 'account') {
            return (
                <>
                    <ProFormField
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={'用户名: admin or user'}
                        initialValue="admin"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <ProFormField
                        valueType="password"
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        initialValue="admin"
                        placeholder={'密码: ant.design'}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                </>
            )
        }
        if (loginType === 'phone') {
            return (
                <>
                    <ProFormField
                        fieldProps={{
                            size: 'large',
                            prefix: <MobileOutlined className={'prefixIcon'} />,
                        }}
                        name="mobile"
                        placeholder={'手机号'}
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机号格式错误！',
                            },
                        ]}
                    />
                    <ProFormCaptcha
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                        }}
                        captchaProps={{
                            size: 'large',
                        }}
                        placeholder={'请输入验证码'}
                        captchaTextRender={(timing, count) => {
                            if (timing) {
                                return `${count} ${'获取验证码'}`;
                            }
                            return '获取验证码';
                        }}
                        name="captcha"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码！',
                            },
                        ]}
                        onGetCaptcha={async () => {
                            message.success('获取验证码成功！验证码为：1234');
                        }}
                    />
                </>
            )
        }
    }
    render() {
        const { loginType } = this.state;
        if (this.System?.LoginIn) {
            return <div style={{ padding: 50 }}>
                <Button block type="dashed" size="large" onClick={this.System.onLoginOut}>退出登录</Button>
            </div>
        }
        return (
            <LoginForm
                title="Github"
                subTitle={JSON.stringify(this.System?.User.value)}
                onFinish={this.onFinish}
                actions={
                    <Space>
                        其他登录方式
                        <AlipayCircleOutlined style={iconStyles}></AlipayCircleOutlined>
                        <TaobaoCircleOutlined style={iconStyles}></TaobaoCircleOutlined>
                        <WeiboCircleOutlined style={iconStyles}></WeiboCircleOutlined>
                    </Space>
                }
            >
                <Tabs activeKey={loginType} onChange={this.onChange}>
                    <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                    <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
                </Tabs>
                {this.renderForm()}
                <div
                    style={{
                        marginBottom: 24,
                    }}
                >
                    <Checkbox name="autoLogin">
                        自动登录
                    </Checkbox>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        忘记密码
                    </a>
                </div>
            </LoginForm>
        )
    }
}
