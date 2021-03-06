/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-23 11:21:00
 * @modify date 2021-08-23 11:21:00
 * @desc [实体数据管理]
 */
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { concatMap, filter, map, of } from 'rxjs';
import { AjaxBasics, IAjaxConfig } from "../../helpers";
import { BaseModel } from './baseModel';
import { IBasesDetailsOptions } from './basesInterface';
import { BasesOptions, EnumActionKeys, EnumBasesKeys } from './basesOptions';
import { BasesUtils } from './basesUtils';
import { computed } from 'mobx';
/**
 * 基础 数据详情
 */
@BindAll()
export class BasesDetails<T = any> {
    /**
     * 基础 数据详情
     * @param {IBasesDetailsOptions} [options={}]
     * @memberof BasesDetails
     */
    constructor(options: IBasesDetailsOptions = {}) {
        this.Model = new BaseModel<T>(lodash.merge({ type: "object" }, options?.entityModel))
        this.reset(options)
    }
    /**
     * 默认配置
     * @type {IBasesDetailsOptions}
     * @memberof BasesDetails
     */
    readonly defaultOptions: IBasesDetailsOptions = {
        dataKey: BasesOptions.dataKey,
        details: BasesOptions.details,
        detailsParams: {}
    };
    /**
     * 配置
     * @type {IBasesDetailsOptions}
     * @memberof BasesDetails
     */
    options: IBasesDetailsOptions = {};
    /**
     * 详情数据模型
     * @memberof BasesDetails
     */
    readonly Model: BaseModel<T>;
    /**
     * 详情数据
     * @readonly
     * @memberof [Model.value]
     */
    @computed
    get entity(): T {
        return this.Model.value
    }

    /**
     * AjaxConfig
     * @readonly
     * @memberof lodash.assign(basesOptions.details,this.options.details)
     */
    get AjaxConfig() {
        let { details } = this.options;
        if (lodash.isString(details)) {
            details = { url: this.options.details } as IAjaxConfig
        }
        return lodash.assign({ target: this.options.target }, BasesOptions.details, details)
    }
    /**
    * details 参数配置
    * @readonly
    * @memberof lodash.assign(...)
    */
    get detailsParams() {
        return lodash.merge({}, this.defaultOptions.detailsParams, this.options.detailsParams)
    }
    /**
     * 当前请求的 生成时间戳
     * @readonly
     * @memberof [Model.getStorage(timestamp])]
     */
    @computed
    get timestamp() {
        return this.Model.getStorage(EnumBasesKeys.timestamp)
    }
    /**
    * 请求出错
    * @readonly
    * @memberof BasesPagination
    */
    @computed
    get requestError() {
        return this.Model.getStorage(EnumBasesKeys.requestError, false)
    }
    /**
     * 当前请求的 加载状态
     * @readonly
     * @memberof [Model.loading)]
     */
    @computed
    get loading() {
        return this.Model.loading
    }
    /**
     * 重置 配置
     * @param options 
     */
    reset(options: IBasesDetailsOptions = lodash.cloneDeep(this.options)) {
        // if (this.loading) {
        //     return BasesUtils.warning(`Details reset loading 未完成`);
        // }
        lodash.assign(this.options, this.defaultOptions, options);
        this.clear()
        return this
    };
    /**
     * 加载数据
     * @param {(string | { [key: string]: any })} body
     * @param {IAjaxConfig} [AjaxConfig]
     * @default body:string > { [this.options.dataKey]: body }
     */
    async onLoad(body?: string | number | { [key: string]: any }, AjaxConfig?: IAjaxConfig) {
        try {
            const timestamp = Date.now();
            this.Model.toggleLoading(true);
            this.Model.setStorage(EnumBasesKeys.timestamp, timestamp);
            AjaxConfig = this.createAjaxConfig(body, AjaxConfig);
            lodash.set(AjaxConfig, 'headers.timestamp', timestamp);
            BasesUtils.log(`Details onLoad ${timestamp}`, AjaxConfig);
            const obs = AjaxBasics
                .requestObservable<T>(AjaxConfig)
                .pipe(
                    // 过滤过期请求
                    filter(() => {
                        if (lodash.eq(timestamp, this.timestamp)) {
                            return true
                        }
                        BasesUtils.warning(EnumActionKeys.details + ` ${timestamp} 过期 > ${this.timestamp} 最新 `);
                    }),
                    concatMap(response => {
                        const { valueGetter, dataSource } = this.detailsParams;
                        if (lodash.isFunction(valueGetter)) {
                            const res = valueGetter(response, AjaxConfig);
                            if (res instanceof Promise) {
                                return res
                            }
                            return of(res)
                        }
                        if (lodash.isString(dataSource) && lodash.has(response, dataSource)) {
                            return of(lodash.get(response, dataSource));
                        }
                        return of(response)
                    }),
                );
            const response = await AjaxBasics.toPromise<T>(obs, AjaxConfig)
            this.set(response)
            return response
        } catch (error) {
            BasesUtils.error(EnumActionKeys.details, error, this);
            this.Model.setStorage(EnumBasesKeys.requestError, true);
            throw error
        }
    }
    /**
     * 设置 response 数据
     * @param {*} response
     * @memberof BasesDetails
     */
    set(response: T): T {
        if (response) {
            BasesUtils.log(`Details Set ${this.timestamp}`, response, this);
            this.Model.setStorage(EnumBasesKeys.response, response);
            this.Model.set(response);
        }
        this.Model.toggleLoading(false);
        return response
    }
    /**
     * 清理数据
     */
    clear() {
        this.Model.set({})
        this.Model.clearStorage()
    }
    /**
     * 创建 onLoad AjaxConfig
     * @param AjaxConfig 
     * @returns 
     */
    private createAjaxConfig(body: string | number | { [key: string]: any }, AjaxConfig?: IAjaxConfig) {
        if (!lodash.isObject(body)) {
            body = { [this.options.dataKey]: body }
        }
        AjaxConfig = lodash.merge({}, { body }, this.AjaxConfig, AjaxConfig);
        this.Model.setStorage(EnumBasesKeys.request, lodash.cloneDeep(AjaxConfig))
        return AjaxConfig
    }

}