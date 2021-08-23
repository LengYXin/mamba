import { BasesController } from "@mamba/clients";
import lodash from "lodash";
import { Component, Prop, Vue } from "vue-property-decorator";
export type IrangePicker = Array<{ key: string, start: string, end: string, format?: string, showTime?: boolean }>;
/**
 * 详情基础操作
 */
@Component({ components: {} })
export class PageDetailsBasics extends Vue {
    /** query参数的Key 默认取 detailsVisible */
    @Prop({ default: 'details' }) readonly queryKey: string;
    /**
      * 页面控制器
      */
    declare PageController: BasesController;
    formState = {}
    /** 处理 时间 区间 key */
    declare rangePicker: IrangePicker;
    get Entities() {
        return this.PageController.Details
    }
    // 获取地址栏 ID 有 修改 没有 添加
    get dataKey() {
        return lodash.get(this.$route.query, this.queryKey)
    }
    get body() {
        return { [this.PageController.options.dataKey]: this.dataKey };
    }
    /**
     * 处理时间区间 搜索 参数
     * @param values 
     * @param back 
     */
    onRangePickerValues(values) {
        values = lodash.cloneDeep(values)
        function valueOf(date: moment.Moment, format?) {
            if (format) {
                return date.format(format)
            }
            return date.valueOf()
        }
        lodash.map(this.rangePicker, rp => {
            lodash.update(values, rp.key, val => {
                const start: moment.Moment = lodash.head(val)
                const end: moment.Moment = lodash.last(val)
                if (start) {
                    lodash.set(values, rp.start, rp.showTime ? valueOf(start, rp.format) : valueOf(start.startOf('days'), rp.format))
                }
                if (end) {
                    lodash.set(values, rp.end, rp.showTime ? valueOf(end, rp.format) : valueOf(end.endOf('days'), rp.format))
                }
            });
        })
        return values
    }
    onRangePickerValuesBackfill(values) {
        values = lodash.cloneDeep(values)
        function valueOf(date: moment.Moment, format?) {
            if (format) {
                return date.format(format)
            }
            return date.valueOf()
        }
        lodash.map(this.rangePicker, rp => {
            lodash.update(values, rp.key, val => {
                const start: moment.Moment = this.moment(lodash.get(values, rp.start))
                const end: moment.Moment = this.moment(lodash.get(values, rp.end))
                return [start, end]
            });
        })
        return values
    }
    /**
     * merge 提交的 values
     * @param values 
     * @returns 
     */
    async onFinishMergeValues(values) {
        return values
    }
    /**
    * merge 加载的 values
    * @param values 
    * @returns 
    */
    async onLoadingMergeValues(values) {
        return values
    }
    /**
     * 传递给 details 组件的 提交函数 返回一个 Promise
     * @param values 
     * @returns 
     */
    async onFinish(values) {
        values = this.onRangePickerValues(this.formState);
        values = await this.onFinishMergeValues(values)
        return this.PageController.onEditor(values)
    }
    async onLoading() {
        if (this.dataKey) {
            try {
                let values = await this.Entities.onLoad(this.body);
                values = this.onRangePickerValuesBackfill(values);
                values = await this.onLoadingMergeValues(values)
                lodash.assign(this.formState, values)
            } catch (error) {
            }
        }
    }
}
