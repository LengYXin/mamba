import Bowser from 'bowser';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
@BindAll()
export class UserAgent {
    /**
     * 环境设备信息
     * @memberof AppConfig
     */
    userAgent = Bowser.parse(window.navigator.userAgent)
    /**
     * Android
     * @readonly
     * @memberof XTGlobal
     */
    isAndroid = lodash.eq(this.userAgent.os.name, Bowser.OS_MAP.Android)
    /**
     * iOS
     * @readonly
     * @memberof XTGlobal
     */
    isiOS = lodash.eq(this.userAgent.os.name, Bowser.OS_MAP.iOS)
    /**
     * Windows
     * @readonly
     * @memberof XTGlobal
     */
    isWindows = lodash.eq(this.userAgent.os.name, Bowser.OS_MAP.Windows)
    /**
    * Mac
    * @readonly
    * @memberof XTGlobal
    */
    isMac = lodash.eq(this.userAgent.os.name, Bowser.OS_MAP.MacOS)
    /**
    * 桌面
    * @readonly
    * @memberof XTGlobal
    */
    isDesktop = lodash.eq(this.userAgent.platform.type, Bowser.PLATFORMS_MAP.desktop)
    /**
     * 手机
     * @readonly
     * @memberof XTGlobal
     */
    isMobile = lodash.eq(this.userAgent.platform.type, Bowser.PLATFORMS_MAP.mobile)
    /**
     * 平板电脑
     * @readonly
     * @memberof XTGlobal
     */
    isTablet = lodash.eq(this.userAgent.platform.type, Bowser.PLATFORMS_MAP.tablet)
    /**
     * 微信浏览器
     * @readonly
     * @memberof XTGlobal
     */
    isWechatBowser = lodash.eq(this.userAgent.browser.name, Bowser.BROWSER_MAP.wechat)
}
