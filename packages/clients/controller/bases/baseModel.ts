/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-23 11:21:30
 * @modify date 2021-08-23 11:21:30
 * @desc [数据存储]
 */
import lodash from 'lodash';
import { action, observable, toJS, isObservable } from 'mobx';
import { IBaseModelOptions } from './basesInterface';
import { persist } from "mobx-persist";
import { basesOptions, EnumBasesKeys } from './basesOptions';
import { Subject, firstValueFrom, delay, of } from 'rxjs';
import { basesUtils } from './basesUtils';
export class BaseModel<T = any> {
    constructor(private readonly options: IBaseModelOptions) {
        basesOptions.reactive(this);
        this.createHydrate()
    }
    /** 数据类型 */
    get type() {
        return this.options.type
    }
    /**
     * 持久化初始化完成 Subject
     * @type {Promise<any>}
     * @memberof ControllerUser
     */
    private readonly HydrateSubject = new Subject<this>();
    /**
    * 持久化初始化完成 Promise
    * @type {Promise<any>}
    * @memberof ControllerUser
    */
    get HydrateAsync(): Promise<this> {
        return firstValueFrom(this.HydrateSubject, { defaultValue: this });
    }
    /** 数据加载状态 */
    @observable
    loading = false;
    /** 存储空间 */
    @observable
    private _storage = {};
    public get storage() {
        return toJS(this._storage);
    }
    /** 源数据 */
    @observable
    private _value = undefined;
    /** 原始的 _value */
    public get obsValue(): T {
        return this._value;
    }
    /** 源数据 */
    // @computed
    public get value(): T {
        return toJS(this._value);
    }
    /** 长度 */
    public get size(): number {
        if (this.type !== 'list') {
            throw new Error("value type not Array");
        }
        return lodash.size(this._value);
    }
    /**
     * 设置 值
     * @param value 
     */
    @action.bound
    public set(value: any) {
        if (isObservable(value)) {
            value = toJS(value)
        }
        switch (this.type) {
            case 'list':
                if (!lodash.isArray(value)) throw new Error("value type not Array");
            case 'object':
                if (!lodash.isObject(value)) throw new Error("value type not Object");
        }
        this._value = value;
        return value
    }
    /**
     * 创建持久化存储
     * @memberof BaseModel
     */
    private async createHydrate() {
        const { options } = this;
        try {
            const Hydrate = basesOptions.createHydrate()
            // 模拟慢 几秒
            // await of(1).pipe(delay(3000)).toPromise()
            if (lodash.isEmpty(options.storageKey) && lodash.isEmpty(options.schema)) {
                this.HydrateSubject.next(this)
                this.HydrateSubject.complete()
                this.toggleLoading(false)
                return
            }
            this.toggleLoading(true);
            let schema = {};
            if (options.storageKey) {
                lodash.merge(schema, {
                    _value: { type: this.type },
                    _storage: {
                        type: 'object', schema: {
                            [EnumBasesKeys.finished]: true,
                            [EnumBasesKeys.request]: { type: 'object' },
                        }
                    }
                })
            }
            if (!lodash.isEmpty(options.schema)) {
                lodash.merge(schema, {
                    _storage: { type: 'object', schema: options.schema }
                })
            }
            persist(schema)(this);
            await Hydrate(options.storageKey, this);
            basesUtils.warning(`持久化 【 ${options.storageKey} 】`, this)
            this.HydrateSubject.next(this)
            this.HydrateSubject.complete()
            // lodash.invoke(options, 'onSuccess');
            this.toggleLoading(false);
        } catch (error) {
            this.toggleLoading(false);
            this.HydrateSubject.error(error)
            this.HydrateSubject.complete()
            // lodash.invoke(options, 'onError', error);
        }
    }
    /**
     * 设置一个 值 到存储空间中
     * @param key 
     * @param value 
     */
    @action.bound
    public setStorage(key: string, value) {
        lodash.set(this._storage, key, value);
    }
    /**
     * 获取 存储空间的一个 值
     * @param key 
     * @param defaultValue 
     */
    public getStorage(key: string, defaultValue?: any) {
        return lodash.get(this.storage, key, defaultValue) || defaultValue;
    }
    /**
     * 清空 存储空间
     * @memberof BaseModel
     */
    @action.bound
    public clearStorage() {
        this._storage = {}
    }
    /**
     * 切换 加载状态
     * @param loading 
     */
    @action.bound
    public toggleLoading(loading: boolean = !this.loading) {
        if (lodash.eq(this.loading, loading)) {
            return
        }
        this.loading = loading;
    }
    /**
     * 插入数据 type:Array 有效
     * @param {(T | Array<T>)} entitys 数据
     * @param {boolean} [first=false] 是否插入到前面
     * @memberof BaseModel
     */
    @action.bound
    public insert(entitys: any, first = false) {
        if (this.type !== 'list') {
            throw new Error("value type not Array");
        }
        entitys = lodash.isArray(entitys) ? entitys : [entitys];
        let value = lodash.isArray(this._value) ? this.value : [];
        if (first) {
            value = lodash.concat(entitys, value)
        } else {
            value = lodash.concat(value, entitys)
        }
        this.set(value)
    }
    /**
     * 修改对象 或者 对象的某个属性 lodash.update
     * @param updater 修改回调函数
     * @param path 修改的值路径
     * @returns 
     */
    @action.bound
    public update(updater: (value: any) => any, path?) {
        if (path) {
            if (lodash.has(this._value, path)) {
                const value = updater(lodash.get(this._value, path))
                lodash.set(this._value, path, value)
                return value
            }
            throw new Error(`value ${path} undefined`);
        }
        return this.set(updater(this.value))
    }
    /**
     * 删除数据 type:Array 有效
     * @param {lodash.ListIteratee<unknown>} predicate 
     * @memberof BaseModel
     */
    @action.bound
    public delete(predicate: any) {
        if (this.type !== 'list') {
            throw new Error("value type not Array");
        }
        return lodash.remove(this._value, predicate);
    }
}