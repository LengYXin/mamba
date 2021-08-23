/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-23 11:24:04
 * @modify date 2021-08-23 11:24:04
 * @desc [输出日志]
 */
import lodash from 'lodash';
export class Log {
    static assert = false;
    // https://ant.design/docs/spec/colors-cn
    static color = {
        info: '#1890ff',
        error: '#f5222d',
        success: '#52c41a',
        warning: '#fadb14',
    }
    static log(optiona: { message: string, color: string } | string, ...optionalParams: any[]) {
        optiona = lodash.isString(optiona) ? { message: optiona, color: Log.color.info } : optiona;
        if (console && console.log && console.group && console.groupEnd) {
            console.log(' ')
            console.group(`%c -- ${optiona.message} --`, `color:${optiona.color}`)
            lodash.map(optionalParams, item => console.log(item))
            console.groupCollapsed(`%c -- [堆栈记录] --`, `color:${optiona.color}`);
            console.trace(); // hidden in collapsed group
            console.groupEnd();
            console.groupEnd()
            console.log(' ')
        }
    }
    static info(message: string, ...optionalParams: any[]) {
        Log.log({ message, color: Log.color.info }, ...optionalParams)
    }
    static error(message: string, ...optionalParams: any[]) {
        Log.log({ message, color: Log.color.error }, ...optionalParams)
    }
    static success(message: string, ...optionalParams: any[]) {
        Log.log({ message, color: Log.color.success }, ...optionalParams)
    }
    static warning(message: string, ...optionalParams: any[]) {
        Log.log({ message, color: Log.color.warning }, ...optionalParams)
    }
}
