/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-16 18:31:33
 * @modify date 2021-08-16 18:31:33
 * @desc [description]
 */
import * as Mamba from '@mamba/clients';
import lodash from 'lodash';
import React from 'react';
import './global';
const Store = {
    System: new Mamba.SystemController()
};
lodash.set(React, '$Store', Store)
Object.defineProperty(React.Component.prototype, '$Store', {
    get: () => Store
})
export default Store
declare module 'react' {
    const $Store: typeof Store;
    interface Component {
        /** 全局状态 */
        readonly $Store: typeof Store
    }

}