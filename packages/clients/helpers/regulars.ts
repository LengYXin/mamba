/**
 * @author 冷 (https://github.com/LengYXin)
 * @email [lengyingxin8966@gmail.com]
 * @create date 2020-07-29 22:38:49
 * @modify date 2020-07-29 22:38:49
 * @desc [正则列表]
 */
export class Regulars {

  /**
   * 手机号(mobile phone)中国(宽松), 只要是13,14,15,16,17,18,19开头即可
   * @examples  ['008618311006933', '+8617888829981', '19119255642']
   */
  static readonly mobile_phone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  /**
   * 手机号(mobile phone)中国(最宽松), 只要是1开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条
   * @examples  ['008618311006933', '+8617888829981', '19119255642']
   */
  static readonly mobile_phone_easy = /^(?:(?:\+|00)86)?1\d{10}$/;
  /**
  * 手机号(mobile phone)中国(严谨), 根据工信部2019年最新公布的手机号段
  * @examples ['008618311006933', '+8617888829981', '19119255642']
  */
  static readonly mobile_phone_strict = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
  /**
   * email(邮箱)
   * @examples ['90203918@qq.com', 'nbilly@126.com']
   */
  static readonly email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /**
   * 座机(tel phone)电话(国内),如: 0341-86091234
   * @examples ['0936-4211235', '89076543', '010-12345678-1234']
   */
  static readonly tel = /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;
  /**
   * date(日期)
   * @examples ['1990-12-12', '1-1-1','0000-1-1']
   */
  static readonly date = /^\d{1,4}(-)(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31)$/;

  /**
   * 身份证号, 支持1/2代(15位/18位数字)
   * @examples ['622223199912051311']
   */
  static readonly id_card_no = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
  /**
   * 护照（包含香港、澳门）
   * @examples ['s28233515', '141234567', '159203084', 'MA1234567', 'K25345719']
   */
  static readonly passport = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
  /**
   * 统一社会信用代码(宽松匹配)(15位/18位/20位数字/字母)
   * @examples ['91110108772551611J', '911101085923662400']
   */
  static readonly social_code = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/;
  /**
   * 邮政编码(中国)
   * @examples ['734500', '100101']
   */
  static readonly postcode = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;

  /******************************************【              链接相关              】******************************************/
  /******************************************【              链接相关              】******************************************/
  /******************************************【              链接相关              】******************************************/

  /**
  * 网址(url,支持端口和"?+参数"和"#+参数)
  * @examples ['www.qq.com', 'https://baidu.com', '360.com:8080/vue/#/a=1&b=2']
  */
  static readonly url = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  /**
   * 'html标签(宽松匹配)
   * @examples ['<div id="app"> 2333 </div>', '<input type="text">', '<br>']
   */
  static readonly html = /<(\w+)[^>]*>(.*?<\/\1>)?/;
  /**
   * 迅雷链接
   * @examples ['thunder://QUEsICdtYWduZXQ6P3h0PXVybjpidGloOjBCQTE0RTUxRkUwNjU1RjE0Qzc4NjE4RjY4NDY0QjZFNTEyNjcyOUMnWlo=']
   */
  static readonly thunderx = /^thunderx?:\/\/[a-zA-Z\d]+=$/;
  /**
   * ed2k链接(宽松匹配)
   * @examples ['ed2k://|file|%E5%AF%84%E7%94%9F%E8%99%AB.PARASITE.2019.HD-1080p.X264.AAC-UUMp4(ED2000.COM).mp4|2501554832|C0B93E0879C6071CBED732C20CE577A3|h=5HTKZPQFYRKORN52I3M7GQ4QQCIHFIBV|/']
   */
  static readonly ed2k = /^ed2k:\/\/\|file\|.+\|\/$/;
  /**
   * 磁力链接(宽松匹配)
   * @examples ['magnet:?xt=urn:btih:40A89A6F4FB1498A98087109D012A9A851FBE0FC']
   */
  static readonly magnet = /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/;
  /**
   * 子网掩码
   * @examples ['255.255.255.0', '255.224.0.0']
   */
  static readonly subnet_mask = /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
  /**
   * 视频(video)链接地址（视频格式可按需增删）
   * @examples  ['http://www.abc.com/video/wc.avi']
   */
  static readonly video = /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i;
  /**
   * 图片(image)链接地址（图片格式可按需增删）
   * @examples  ['https://www.abc.com/logo.png']
   */
  static readonly image = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i;
  /**
   * base64格式
   * @examples ['data:image/gif;base64,xxxx==']
   */
  static readonly base64 = /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i;

  /******************************************【              数字相关              】******************************************/
  /******************************************【              数字相关              】******************************************/
  /******************************************【              数字相关              】******************************************/

  /**
   * 小数
   * @examples ['0.0', '0.09']
   */
  static readonly decimal = /^\d+\.\d+$/;
  /**
   * 数字
   * @examples [12345678]
   */
  static readonly number = /^\d{1,}$/;
  /**
   * 数字和字母组成
   * @examples ['james666', 'haha233hi']
   */
  static readonly number_and_letter = /^[A-Za-z0-9]+$/;
  /**
   * 数字/货币金额（支持负数、千分位分隔符）
   * @examples [100, -0.99, 3, 234.32, -1, 900, 235.09, '12,345,678.90']
   */
  static readonly number_negative = /^-?\d+(,\d{3})*(\.\d{1,2})?$/;
  /**
   * 数字/货币金额 (只支持正数、不支持校验千分位分隔符)
   * @examples [0.99, 8.99, 666]
   */
  static readonly number_positive = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;
  /**
   * 银行卡号（10到30位, 覆盖对公/私账户, 参考[微信支付](https://pay.weixin.qq.com/wiki/doc/api/xiaowei.php?chapter=22_1)）
   * @examples [6234567890, 6222026006705354217]
   */
  static readonly bank_card_no = /^[1-9]\d{9,29}$/;

  /******************************************【              文字字符相关              】******************************************/
  /******************************************【              文字字符相关              】******************************************/
  /******************************************【              文字字符相关              】******************************************/

  /**
   * 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
   * @examples ['justin', 'justin1989', 'justin_666']
   */
  static readonly account = /^[a-zA-Z]\w{4,15}$/;

  /**
   * 英文字母
   * @examples ['Russel']
   */
  static readonly english = /^[a-zA-Z]+$/;
  /**
   * 小写英文字母组成
   * @examples ['russel']
   */
  static readonly english_small = /^[a-z]+$/;
  /**
   * 大写英文字母
   * @examples ['ABC', 'KD']
   */
  static readonly english_large = /^[A-Z]+$/;
  /**
  * 英文姓名
  * @examples ['James', 'Kevin Wayne Durant', 'Dirk Nowitzki']
  */
  static readonly english_name = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
  /**
   * 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
   * @examples  ['Kd@curry666']
   */
  static readonly password = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;

  /**
   * 密码强度校验， 必须为8-20位  可以设置大写字母、小写字母、数字和部分特殊字符 必须同时包含三种组合以上
   * @examples  ['123456Zy']
   */
  static readonly rulePsw = /^(?![A-Za-z]+$)(?![A-Z\\d]+$)(?![A-Z\\W]+$)(?![a-z\\d]+$)(?![a-z\\W]+$)(?![\\d\\W]+$)\\S{8,20}$/;

  /**
   * 16进制颜色
   * @examples  ['#f00', '#F90', '#000', '#fe9de8']
   */
  static readonly color = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  /**
   * 中文/汉字
   * @examples ['正则', '前端']
   */
  static readonly chinese = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;
  /**
   * 中文姓名
   * @examples ['葛二蛋', '凯文·杜兰特', '德克·维尔纳·诺维茨基']
   */
  static readonly chinese_name = /^(?:[\u4e00-\u9fa5·]{2,16})$/;

  /**
   * 车牌号(新能源)
   * @examples ['京AD92035', '甘G23459F', '京AA92035']
   */
  static readonly license_plate_number_new = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/;
  /**
   * 车牌号(非新能源)
   * @examples ['京A00599', '黑D23908']
   */
  static readonly license_plate_number_old = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$/;
  /**
   * 车牌号(新能源+非新能源)
   * @examples ['京A12345D', '京A00599', '京AD92035', '甘G23459F', '京AA92035']
   * @counterExamples ['宁AD1234555555', '浙苏H6F681']
   */
  static readonly license_plate_number = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
}
