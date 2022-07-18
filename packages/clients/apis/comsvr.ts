import { IAjaxConfig } from "../helpers"

export class EnumApiComsvr {
    /** 
    * @dec 上传图片
    */
    readonly comsvr_upload_img: IAjaxConfig = {
        url: '/api/bpportal/pcsd-bp-customer-comsvr/v1/file/uploadPic',
        method: 'post',
        loading: true
    }
}