import lodash from 'lodash';
import React from 'react';
import * as components from './export';
lodash.set(React, 'Cts', components)
declare module 'react' {
    /**
     * 组件列表
     */
    const Cts: typeof components;

}
