/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-16 18:31:40
 * @modify date 2021-08-16 18:31:40
 * @desc [description]
 */
import * as Mamba from '@mamba/clients';
import lodash from 'lodash';
import NProgress from 'nprogress';
import React from 'react';
Mamba.AjaxBasics.onStart = NProgress.start;
Mamba.AjaxBasics.onEndAll = NProgress.done;
lodash.set(React, '$Mamba', Mamba)
lodash.set(React, 'BasesController', Mamba.BasesController)
lodash.set(React, 'BasesDetails', Mamba.BasesDetails)
lodash.set(React, 'BasesPagination', Mamba.BasesPagination)
lodash.set(React, 'BaseModel', Mamba.BaseModel)
declare module 'react' {
    /** Dayjs */
    const $Mamba: typeof Mamba;
    /** 基础 控制器 */
    class BasesController extends Mamba.BasesController { }
    /** 基础 状态管理 */
    class BaseModel extends Mamba.BaseModel { }
    /** 基础 数据详情 */
    class BasesDetails extends Mamba.BasesDetails { }
    /** 基础 分页列表数据管理 */
    class BasesPagination extends Mamba.BasesPagination { }
    
}