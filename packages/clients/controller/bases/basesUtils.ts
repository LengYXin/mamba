/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-23 11:20:41
 * @modify date 2021-08-23 11:20:41
 * @desc [工具类]
 */
import lodash from "lodash";
import { Log } from "../../helpers";
import { IBasesControllerOptions, IBasesDetailsOptions, IBasesPaginationOptions } from "./basesInterface";
import { BasesOptions, EnumActionKeys } from "./basesOptions";
export class BasesUtils {
    // static request<T>(options?: string | IAjaxConfig | ((ctr: T) => IAjaxConfig)) {
    //     return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    //         const value = descriptor.value;
    //         descriptor.value = async function () {
    //             return AjaxBasics.request(lodash.merge({  }, ))
    //         }
    //         // descriptor.enumerable = value;
    //     };
    // }
    static getDetailsOptions(options: IBasesControllerOptions): IBasesDetailsOptions {
        return lodash.assign({}, lodash.pick(options, ['target', 'dataKey', 'details', 'entityModel']), options.DetailsOptions)
    }
    static getPaginationOptions(options: IBasesControllerOptions): IBasesPaginationOptions {
        return lodash.assign({}, lodash.pick(options, ['target', 'dataKey', 'pagination', 'infinite', 'paginationParams', 'listModel']), options.PaginationOptions)
    }
    static log(message: string, ...optionalParams: any[]) {
        if (!BasesOptions.debug) return true;
        Log.info(`【Base】 ${message}`, ...optionalParams);
        return true;
    }
    static warning(message: string, ...optionalParams: any[]) {
        if (!BasesOptions.debug) return true;
        Log.warning(`【Base】 ${message}`, ...optionalParams);
        return true;
    }
    static error(obsKey: EnumActionKeys, ...optionalParams: any[]) {
        if (!BasesOptions.debug) return true;
        Log.error(`【Base】 ${obsKey}`, ...optionalParams);
        return true
    }
}