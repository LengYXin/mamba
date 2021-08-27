import {
    UserOutlined,
    MobileOutlined,
    LockOutlined,
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import { message, Tabs, Space } from 'antd';
import React, { CSSProperties } from 'react';
import { BindAll } from 'lodash-decorators';
const iconStyles: CSSProperties = {
    marginLeft: '16px',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};
@BindAll()
export default class extends React.Component {
    state = {
        loginType: 'account'
    }
    onChange(activeKey) {
        this.setState({ loginType: activeKey })
    }
    render() {
        const { loginType } = this.state;
        return (
            <React.Antd.Spin spinning={this.$Store.System.User.loading} style={{ height: '100vh', maxHeight: '100vh' }}>
                <React.Antd.LoginForm
                    title="Github"
                    subTitle="副标题"
                    onFinish={this.$Store.System.onLogin}
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
                    {loginType === 'account' && (
                        <>
                            <React.Antd.ProFormField
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
                            <React.Antd.ProFormField
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
                    )}
                    {loginType === 'phone' && (
                        <>
                            <React.Antd.ProFormField
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
                            <React.Antd.ProFormCaptcha
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
                    )}
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <React.Antd.Checkbox name="autoLogin">
                            自动登录
                        </React.Antd.Checkbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                            忘记密码
                        </a>
                    </div>
                </React.Antd.LoginForm>
            </React.Antd.Spin>
        )
    }
}
