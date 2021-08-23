import lodash from 'lodash';
import React from 'react';
import './style.less';
export * from './image';
export * from './loadingOverlayComponent';
export * from './noRowsOverlayComponent';
const GridFrameworks = {
    image: "ImageComponent",
    loadingOverlayComponent: "loadingOverlayComponent",
    noRowsOverlayComponent: "noRowsOverlayComponent",
}
lodash.set(React, 'AgGridFrameworks', GridFrameworks)
declare module 'react' {
    /**
     * AgGrid 组件列表
     */
    const AgGridFrameworks: typeof GridFrameworks;
}