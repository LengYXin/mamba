/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-23 11:20:15
 * @modify date 2021-08-23 11:20:15
 * @desc [列表数据管理 分页&非分页&瀑布流]
 */
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { toJS } from 'mobx';
import { catchError, delay, filter, map } from 'rxjs';
import { AjaxBasics, IAjaxConfig } from "../../helpers";
import { BaseModel } from "./baseModel";
import { IBasesPaginationIAjaxConfig, IBasesPaginationOptions, IBasesResponse } from './basesInterface';
import { basesOptions, EnumActionKeys, EnumBasesKeys } from './basesOptions';
import { basesUtils } from './basesUtils';

/**
 * 基础 分页管理
 */
@BindAll()
export class BasesPagination<T = any> {
    /**
     * 基础 分页列表数据
     * @param {IBasesPaginationOptions} [options]
     * @memberof BasesPagination
     */
    constructor(options?: IBasesPaginationOptions) {
        this.Model = new BaseModel<Array<T>>(lodash.merge({ type: 'list' }, options?.listModel))
        this.reset(options)
    }
    /**
     * 默认的分页参数配置
     * @type {IBasesPaginationOptions}
     * @memberof BasesPagination
     */
    get defaultOptions(): IBasesPaginationOptions {
        return {
            pagination: basesOptions.pagination,
            paginationParams: basesOptions.paginationParams,
            infinite: basesOptions.infinite,
        }
    };
    /**
     * 配置信息
     * @type {IBasesPaginationOptions}
     * @memberof BasesPagination
     */
    readonly options: IBasesPaginationOptions = {};
    /**
     * 分页数据模型
     * @memberof Array<T>
     */
    readonly Model: BaseModel<Array<T>>;
    /**
     * AjaxConfig
     * @readonly
     * @memberof lodash.assign(basesOptions.pagination,this.options.pagination)
     */
    get AjaxConfig() {
        let { pagination } = this.options;
        if (lodash.isString(pagination)) {
            pagination = { url: this.options.pagination } as IAjaxConfig
        }
        return lodash.assign({ target: this.options.target }, this.defaultOptions.pagination, pagination)
    }
    /**
     * Pagination 参数配置
     * @readonly
     * @memberof lodash.assign(...)
     */
    get PaginationParams() {
        return lodash.assign({}, this.defaultOptions.paginationParams, this.options.paginationParams)
    }
    /**
     * 当前请求的 生成时间戳
     * @readonly
     * @memberof [Model.getStorage(timestamp])]
     */
    // @computed
    get timestamp() {
        return this.Model.getStorage(EnumBasesKeys.timestamp)
    }
    /**
     * 当前请求的 加载状态
     * @readonly
     * @memberof [Model.loading)]
     */
    // @computed
    get loading() {
        return this.Model.loading
    }
    /**
     * 请求的参数值 [AjaxConfig]
     * @readonly
     * @memberof [Model.getStorage(request])]
     */
    // @computed
    get request() {
        return this.Model.getStorage(EnumBasesKeys.request)
    }
    /**
     * 是否已加载完成，加载完成后不再触发
     * @readonly
     * @memberof BasesPagination
     */
    get finished() {
        return !!(this.Model.size && this.Model.getStorage(EnumBasesKeys.finished, false))
    }
    /**
     * 请求出错
     * @readonly
     * @memberof BasesPagination
     */
    get requestError() {
        return this.Model.getStorage(EnumBasesKeys.requestError, false)
    }
    /**
     * 当前请求的 数据总数
     * @readonly
     * @memberof [Model.getStorage(response[PaginationParams.response.total])]
     */
    // @computed
    get total() {
        const PaginationParams = this.PaginationParams;
        return this.Model.getStorage(`${EnumBasesKeys.response}.${PaginationParams.response.total}`, 0)
    }
    /**
     * 当前请求的 页码索引
     * @readonly
     * @memberof [Model.getStorage(request.body[PaginationParams.currentKey])]
     */
    // @computed
    get current() {
        const PaginationParams = this.PaginationParams;
        return this.Model.getStorage(`${EnumBasesKeys.request}.body.${PaginationParams.currentKey}`, PaginationParams.defaultCurrent)
    }
    /**
     * 分页请求的 每页条数
     * @readonly 
     * @memberof [Model.getStorage(request.body[PaginationParams.pageSizeKey])]
     */
    // @computed
    get pageSize() {
        const PaginationParams = this.PaginationParams;
        return this.Model.getStorage(`${EnumBasesKeys.request}.body.${PaginationParams.pageSizeKey}`, PaginationParams.defaultPageSize)
    }
    /**
     * 分页数据 value 
     * @readonly
     * @memberof [Model.value]
     */
    // @computed
    get dataSource() {
        return this.Model.value
    }
    /** 第一个元素 */
    get firstData() {
        return toJS(lodash.head(this.Model.obsValue));
    }
    /** 最后一个元素 */
    get lastData() {
        return toJS(lodash.last(this.Model.obsValue));
    }
    /**
     * 选择的行 
     * @readonly
     * @memberof BasesPagination
     */
    get selectedRowKeys(): Array<T | string> {
        return this.Model.getStorage('selectedRowKeys', [])
    }
    /**
     * 重置 配置
     * @param options 
     */
    reset(options: IBasesPaginationOptions = lodash.cloneDeep(this.options)) {
        lodash.assign(this.options, this.defaultOptions, options);
        this.clear()
        return this
    };
    /**
     * 加载数据
     * @param AjaxConfig 
     */
    async onLoad(AjaxConfig?: IBasesPaginationIAjaxConfig) {
        try {
            if (this.loading) {
                throw "loading"
            }
            if (this.options.infinite && this.finished) {
                throw 'finished'
            }
            const timestamp = Date.now();
            this.Model.toggleLoading(true);
            this.Model.setStorage(EnumBasesKeys.timestamp, timestamp);
            AjaxConfig = this.createAjaxConfig(AjaxConfig);
            basesUtils.log(`Pagination onLoad ${timestamp}`, AjaxConfig);
            const obs = AjaxBasics
                .requestObservable<IBasesResponse<T>>(AjaxConfig)
                .pipe(
                    // 过滤过期请求
                    filter(() => lodash.eq(timestamp, this.timestamp)),
                    // 错误处理
                    catchError((err) => {
                        throw err
                    }),
                    map<any, any>(response => {
                        const { valueGetter, dataSource, total, current, pageSize } = this.PaginationParams.response;
                        if (lodash.isFunction(valueGetter)) {
                            return valueGetter(response);
                        }
                        return {
                            current: lodash.get(response, current),
                            pageSize: lodash.get(response, pageSize),
                            total: lodash.get(response, total),
                            dataSource: lodash.get(response, dataSource),
                        }
                    }),
                    map(this.set)
                );
            return await AjaxBasics.toPromise<IBasesResponse<T>>(obs)
        } catch (error) {
            if (!lodash.includes(['loading', 'finished'], error)) {
                this.Model.toggleLoading(false);
                this.Model.setStorage(EnumBasesKeys.finished, true);
                this.Model.setStorage(EnumBasesKeys.requestError, true);
                basesUtils.error(EnumActionKeys.pagination, error);
            }
            // throw error
        }
    }
    /**
     * 设置 response 数据
     * @param {IBasesResponse} response
     * @memberof BasesPagination
     */
    set(response: IBasesResponse<T>) {
        basesUtils.log(`Pagination Set ${this.timestamp}`, response);
        this.Model.setStorage(EnumBasesKeys.requestError, false);
        this.Model.setStorage(EnumBasesKeys.response, response);
        const size = lodash.size(response.dataSource);
        this.Model.setStorage(EnumBasesKeys.finished, size < this.pageSize);
        if (this.options.infinite) {
            this.Model.insert(response.dataSource);
        } else {
            this.Model.set(response.dataSource);
        }
        this.Model.toggleLoading(false);
        return response
    }
    /**
    * 清理数据
    */
    clear() {
        this.Model.set([])
        this.Model.clearStorage()
    }
    /**
     * 选择行数据
     * @param selectedRowKeys 
     */
    onSelectChange(selectedRowKeys) {
        basesUtils.log(`Pagination selectedRowKeys`, selectedRowKeys)
        this.Model.setStorage('selectedRowKeys', selectedRowKeys)
    }
    /**
     * 创建 onLoad AjaxConfig
     * @param AjaxConfig 
     * @returns 
     */
    private createAjaxConfig(AjaxConfig: IBasesPaginationIAjaxConfig) {
        const Pagination = this.PaginationParams;
        AjaxConfig = lodash.merge({}, this.AjaxConfig, AjaxConfig);
        let currentKey = `body.${this.PaginationParams.currentKey}`,
            pageSizeKey = `body.${this.PaginationParams.pageSizeKey}`,
            current = lodash.head(lodash.compact([
                // body 中的 current
                lodash.get(AjaxConfig, currentKey),
                // AjaxConfig 中的 current
                lodash.get(AjaxConfig, 'current'),
                // 当前使用 中的 current
                this.current,
                // 默认 的 current
                Pagination.defaultCurrent
            ])),
            pageSize = lodash.head(lodash.compact([
                // body 中的 pageSize
                lodash.get(AjaxConfig, pageSizeKey),
                // AjaxConfig 中的 pageSize
                lodash.get(AjaxConfig, 'pageSize'),
                // 当前使用 中的 pageSize
                this.pageSize,
                // 默认 的 pageSize
                Pagination.defaultPageSize
            ]));
        // 无限滚动模式
        if (this.options.infinite) {
            const infiniteKey = `body.${this.PaginationParams.infiniteKey}`;
            const lastKey = this.getDataKey(this.lastData);
            lodash.set(AjaxConfig, infiniteKey, lastKey);
            // 存在参数 页码加一
            if (lastKey) {
                current += 1;
            }
        }
        lodash.set(AjaxConfig, currentKey, lodash.toInteger(current));
        lodash.set(AjaxConfig, pageSizeKey, lodash.toInteger(pageSize));
        lodash.unset(AjaxConfig, 'current');
        lodash.unset(AjaxConfig, 'pageSize');
        this.Model.setStorage(EnumBasesKeys.request, lodash.cloneDeep(AjaxConfig))
        return AjaxConfig
    }
    /**
     * 获取 当前数据的 Key
     * @param entity 数据对象
     * @param predicate lodash predicate 参数 [dataKey,**]
     * @returns dataKey
     */
    getDataKey(entity: any, predicate = false) {
        if (!lodash.isObject(entity)) {
            return entity
        }
        const { dataKey } = this.options;
        const key = lodash.get(entity, this.options.dataKey);
        if (predicate) {
            return [dataKey, key]
        }
        return key
    }
    /**
     * 解析 Array<entity...> 为 对应的 Array<dataKey...>
     * @param entitys 
     * @returns 
     */
    getEntitys(entitys: string | number | T | Array<any | T>) {
        if (lodash.isArray(entitys)) {
            entitys = lodash.map(entitys, item => {
                if (lodash.isObject(item))
                    return this.getDataKey(item)
                return item
            });
        } else {
            entitys = [lodash.isObject(entitys) ? this.getDataKey(entitys) : entitys]
        }
        return entitys
    }
    /**
     * 插入数据到 Model 中
     * @param {(T | Array<T>)} entity
     * @memberof BasesPagination
     * @returns entity
     */
    onInsert(entitys: T | Array<T>, first: boolean = false) {
        this.Model.insert(entitys, first);
        return entitys
    }
    /**
     * 修改数组中的对象 根据 entity.dataKey 匹配
     * @param entity 新的数据对象 dataKey 匹配集合中的对应数据
     * @param assign 是否 assign 模式
     * @returns entity
     */
    onUpdate(entity: T, assign = true) {
        const path = lodash.findIndex(this.Model.obsValue, this.getDataKey(entity, true))
        return this.Model.update(old => {
            if (assign)
                return lodash.assign(old, entity)
            return entity
        }, `[${path}]`)
    }
    /**
     * 删除数组中的对象 根据 entity.dataKey 匹配
     * @param entitys  dataKey 匹配集合中的对应数据 entity | entity.dataKey | Arrar<entity> | Arrar<entity.dataKey> 
     * @returns 返回移除元素组成的新数组。
     */
    onDelete(entitys: string | number | T | Array<any | T>) {
        return this.Model.delete(item => lodash.includes(this.getEntitys(entitys), this.getDataKey(item)))
    }
}