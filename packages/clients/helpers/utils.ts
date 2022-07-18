import lodash from "lodash"

/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-23 11:23:50
 * @modify date 2021-08-23 11:23:50
 * @desc [工具库]
 */
export class Utils {
    /**
     * 转化 object 为只读
     * @static
     * @param {*} obj 
     * @param {(v) => void} [set] set 触发函数
     * @memberof Utils
     */
    static toReadonly(obj, set?: (k, v) => void) {
        if (lodash.isObject(obj)) {
            lodash.mapKeys(obj, (val, key) => {
                Utils.toReadonly(val, set)
                Object.defineProperty(obj, key, {
                    // writable: false,
                    // configurable: false,
                    get() { return val },
                    set(newValue) {
                        if (lodash.isFunction(set)) {
                            set(key, newValue)
                        } else {
                            console.warn(` 属性 【 ${key} 】 不可变 请 lodash.merge | assign ({},[当前属性值],newValue) 使用`)
                        }
                    }
                })
            })
        }
        return obj
    }
}
