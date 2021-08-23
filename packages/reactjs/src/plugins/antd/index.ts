import { message } from 'antd';
import lodash from 'lodash';
import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import antd from './antd';
import icons from './icons';
import pro from './pro';
const Ant = {
    /** 路由导航 */
    Link,
    I18n:Trans,
    message,
    ...antd,
    ...pro,
}
lodash.set(React, 'Antd', Ant)
lodash.set(React, 'Icons', icons)
declare module 'react' {
    /**
     * ant 组件列表
     */
    const Antd: typeof Ant;
    /**
     * 图标
     */
    const Icons: typeof icons;

   
}
