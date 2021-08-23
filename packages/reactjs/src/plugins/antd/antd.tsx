import { Avatar, Form,Checkbox, Popconfirm, Button, Divider, Dropdown, Empty, Menu, Pagination, Space, Transfer, Upload, Image } from 'antd';
import ConfigProvider, { ConfigProviderProps } from 'antd/es/config-provider';
import Spin, { SpinProps } from 'antd/es/spin';
import React, { PropsWithChildren } from 'react';
import Icon from './icons';
Spin.setDefaultIndicator(<Icon.LoadingOutlined style={{ fontSize: 40 }} spin />)
export default {
    ConfigProvider: function (props: Partial<ConfigProviderProps>) {
        return <ConfigProvider {...props} />
    },//: React.lazy<typeof ConfigProvider>(() => import('antd/es/config-provider')),
    Divider,//: React.lazy<typeof Divider>(() => import('antd/es/divider')),
    Avatar: React.lazy<typeof Avatar>(() => import('antd/es/avatar')),
    Spin: function (props: PropsWithChildren<SpinProps>) {
        return <Spin tip='Loading...' {...props} >{props.children}</Spin>
    },
    Form,
    Popconfirm,
    Space,
    Checkbox,
    Dropdown: React.lazy<typeof Dropdown>(() => import('antd/es/dropdown')),
    Menu,//: React.lazy<typeof Menu>(() => import('antd/es/menu')),
    Empty,//: React.lazy<typeof Empty>(() => import('antd/es/empty')),
    Pagination: React.lazy<typeof Pagination>(() => import('antd/es/pagination')),
    Transfer: React.lazy<typeof Transfer>(() => import('antd/es/transfer')),
    Upload: React.lazy<typeof Upload>(() => import('antd/es/upload')),
    Button,//: React.lazy<typeof Button>(() => import('antd/es/button')),
    Image,//: React.lazy<typeof Image>(() => import('antd/es/image')),
}