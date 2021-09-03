/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-23 11:21:14
 * @modify date 2021-08-23 11:21:14
 * @desc [控制器]
 */
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { AjaxBasics, IAjaxConfig } from "../../helpers";
import { BasesDetails } from './basesDetails';
import { IBasesControllerOptions, IBasesPaginationIAjaxConfig } from './basesInterface';
import { basesOptions, EnumActionKeys } from './basesOptions';
import { BasesPagination } from './basesPagination';
import { basesUtils } from './basesUtils';
import { computed } from 'mobx';
/**
 * 基础 控制器
 */
@BindAll()
export class BasesController<T = any>{
    /**
     * 基础 控制器
     * @param options 
     */
    constructor(options: IBasesControllerOptions = {}) {
        this.reset(options)
        this.Details = new BasesDetails<T>(this.DetailsOptions);
        this.Pagination = new BasesPagination<T>(this.PaginationOptions);
    }
    /**
     * 默认配置
     * @type {IBasesControllerOptions}
     * @memberof BasesController
     * @default basesOptions
     */
    get defaultOptions(): IBasesControllerOptions {
        return {
            dataKey: basesOptions.dataKey,
            pagination: basesOptions.pagination,
            insert: basesOptions.insert,
            update: basesOptions.update,
            delete: basesOptions.delete,
            details: basesOptions.details,
            infinite: basesOptions.infinite,
        }
    };
    /**
     * 当前控制器 配置
     * @type {IBasesControllerOptions}
     * @memberof BasesController
     */
    options: IBasesControllerOptions = {};
    /**
     * Details 配置 继承了 当前控制器配置
     * @readonly
     * @private
     * @memberof BasesController
     */
    private get DetailsOptions() {
        return basesUtils.getDetailsOptions(this.options)
    }
    /**
     * Pagination 配置 继承了 当前控制器配置
     * @readonly
     * @private
     * @memberof BasesController
     */
    private get PaginationOptions() {
        return basesUtils.getPaginationOptions(this.options)
    }
    /**
     * Details 对象
     * @memberof BasesController
     */
    public readonly Details: BasesDetails<T>;
    /**
     * Pagination 对象
     * @memberof BasesController
     */
    public readonly Pagination: BasesPagination<T>;
    /**
     * 分页数据 dataSource 
     * @readonly
     * @memberof [Pagination.Model.value]
     */
    @computed
    get dataSource() {
        return this.Pagination.dataSource
    }
    /**
     * 详情数据  
     * @readonly
     * @memberof [Model.value]
     */
    @computed
    get entity() {
        return this.Details.entity
    }
    /**
     * 重置 当前对象配置
     * @param options 
     * @returns BasesController
     */
    reset(options: IBasesControllerOptions = lodash.cloneDeep(this.options)) {
        lodash.assign(this.options, this.defaultOptions, options);
        this.Details?.reset(this.DetailsOptions);
        this.Pagination?.reset(this.PaginationOptions);
        this.clear()
        return this
    }
    /**
    * 清理数据
    */
    clear() {
        this.Details?.clear()
        this.Pagination?.clear()
    }
    /**
     * 创建 onLoad AjaxConfig
     * @param AjaxConfig 
     * @returns response
     */
    private createAjaxConfig(configKey: EnumActionKeys | string, AjaxConfig: IAjaxConfig) {
        const { options } = this;
        let config = lodash.get(options, configKey, lodash.get(options.other, configKey));
        if (lodash.isString(config)) {
            config = { url: config }
        }
        // assign 默认配置
        config = lodash.merge({}, lodash.get(this.defaultOptions, configKey), config)
        return lodash.merge({ target: this.options.target }, config, AjaxConfig)
    }
    /**
     * 加载列表数据
     * @param AjaxConfig 
     * @returns 
     */
    async onLoad(AjaxConfig?: IBasesPaginationIAjaxConfig) {
        return this.Pagination.onLoad(AjaxConfig)
    }
    /**
     * 加载详情数据
     * @param body 
     * @param AjaxConfig 
     * @returns entity
     */
    async onFind(body: string | number | { [key: string]: any }, AjaxConfig?: IAjaxConfig) {
        return this.Details.onLoad(body, AjaxConfig)
    }
    /**
     * 编辑 一条 数据 存在 dataKey 调用 onUpdate 否则  onInsert
     * @param {T} entity
     * @param {IAjaxConfig} [AjaxConfig]
     * @returns entity
     */
    async onEditor(entity: T, AjaxConfig?: IAjaxConfig) {
        AjaxConfig = lodash.assign({}, AjaxConfig, { body: entity });
        if (lodash.get(AjaxConfig.body, this.options.dataKey)) {
            return this.onUpdate(entity, AjaxConfig)
        }
        return this.onInsert(entity, AjaxConfig)
    }
    /**
     * 插入 一条 数据
     * @param {T} entity
     * @param {IAjaxConfig} [AjaxConfig]
     * @returns entity
     */
    async onInsert(entity: T, AjaxConfig?: IAjaxConfig) {
        AjaxConfig = this.createAjaxConfig(EnumActionKeys.insert, lodash.assign({}, AjaxConfig, { body: entity }));
        basesUtils.warning(EnumActionKeys.insert, AjaxConfig);
        const response = await AjaxBasics.request<T>(AjaxConfig);
        return this.Pagination.onInsert(response, true)
    }
    /**
     * 修改 一条 数据
     * @param {T} entity
     * @param {IAjaxConfig} [AjaxConfig]
     * @returns entity
     */
    async onUpdate(entity: T, AjaxConfig?: IAjaxConfig) {
        if (lodash.isEqual(entity, lodash.pick(this.entity, lodash.keys(entity)))) {
            return basesUtils.warning(`${EnumActionKeys.update} 无事发生`, entity, this.entity)
        }
        AjaxConfig = this.createAjaxConfig(EnumActionKeys.update, lodash.assign({}, AjaxConfig, { body: entity }));
        basesUtils.warning(EnumActionKeys.update, AjaxConfig)
        const response = await AjaxBasics.request<T>(AjaxConfig);
        this.Pagination.onUpdate(response)
        return response
    }
    /**
     * 删除 数据集
     * @param entitys dataKey 匹配集合中的对应数据 entity | entity.dataKey | Arrar<entity> | Arrar<entity.dataKey> 
     * @param AjaxConfig 
     * @returns 返回移除元素组成的新数组。
     */
    async onDelete(entitys: string | number | T | Array<any | T>, AjaxConfig?: IAjaxConfig) {
        entitys = this.Pagination.getEntitys(entitys);
        AjaxConfig = this.createAjaxConfig(EnumActionKeys.delete, lodash.assign({}, AjaxConfig, { body: entitys }));
        basesUtils.warning(EnumActionKeys.delete, AjaxConfig)
        const response = await AjaxBasics.request<T>(AjaxConfig);
        this.Pagination.onDelete(entitys);
        return response
    }
}