/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-03-12 17:20:02
 * @modify date 2021-03-12 17:20:02
 * @desc 搜索条件 表单
 */
<template>
  <a-form-model
    ref="formRef"
    :layout="layout"
    :rules="rules"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    @submit.native.prevent
    @submit="onFinish(formState)"
  >
    <a-row type="flex" :gutter="8">
      <slot />
      <slot name="more" v-if="moreOpen" />
      <a-col :offset="offset" :span="colProps.colSpan" style="text-align: right">
        <a-form-model-item :wrapper-col="{ span: 24 }">
          <!-- <div slot="label" style="opacity: 0;">搜索</div> -->
          <a-space align="center">
            <!-- 重置按钮 -->
            <a-button @click.stop.prevent="onReset" :loading="Pagination.loading">
              <i18n-t :keypath="$Enumlocales.action_reset" />
            </a-button>
            <!-- 搜索按钮 -->
            <a-button type="primary" html-type="submit" :loading="Pagination.loading">
              <i18n-t :keypath="$Enumlocales.action_search" />
            </a-button>
            <!-- 展开按钮 -->
            <a-button @click.stop.prevent="onMoreOpen" type="link" v-show="moreShow">
              <i18n-t :keypath="moreOpen ? $Enumlocales.action_retract : $Enumlocales.action_open" />
            </a-button>
          </a-space>
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script lang="ts">
import { BasesController } from "@mamba/clients";
import lodash from "lodash";
import { observer } from "mobx-vue";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import {
  Emit,
  Inject,
  Component,
  Prop,
  Provide,
  Ref,
  Vue,
} from "vue-property-decorator";
export type IrangePicker = Array<{ key: string, start: string, end: string, format?: string, showTime?: boolean }>;
const CONFIG_SPAN_BREAKPOINTS = {
  xs: 513,
  sm: 513,
  md: 785,
  lg: 992,
  xl: 1057,
  xxl: Infinity,
};
/** 配置表单列变化的容器宽度断点 */
const BREAKPOINTS = {
  vertical: [
    // [breakpoint, cols, layout]
    [513, 1, "vertical"],
    [785, 2, "vertical"],
    [1057, 2, "horizontal"],
    [1352, 3, "horizontal"],
    [Infinity, 4, "horizontal"],
  ],
  default: [
    [513, 1, "vertical"],
    [701, 2, "vertical"],
    [1062, 2, "horizontal"],
    [1352, 3, "horizontal"],
    [Infinity, 4, "horizontal"],
  ],
};
@observer
@Component({
  components: {},
})
export default class extends Vue {
  @Inject() readonly PageController: BasesController;
  get Pagination() {
    return this.PageController.Pagination;
  }
  /** 表单状态 */
  @Inject() readonly formState;
  /** 表单 ref */
  @Ref("formRef") readonly formRef;
  /** 处理 时间 区间 key */
  @Prop() rangePicker: IrangePicker;
  /** 表单 rules */
  @Prop({}) readonly rules;

  /** 告诉 field 使用 a-col */
  @Provide() colProps = {
    colItem: true,
    colSpan: 6,
  };
  labelCol = { xs: 24, sm: 24, md: 7, lg: 7, xl: 7, xxl: 7 };
  wrapperCol = { xs: 24, sm: 24, md: 15, lg: 15, xl: 15, xxl: 15 };
  layout: "vertical" | "horizontal" = "vertical";
  offset = 0;
  // activeKey = 'search'
  // 更多条件
  moreOpen = false;
  ResizeEvent: Subscription;
  // 显示 展开更多按钮
  get moreShow() {
    if (lodash.isFunction(this.$slots.more)) {
      return this.$slots.more().filter(x => x.tag).length;
    } else if (lodash.isArray(this.$slots.more)) {
      return this.$slots.more.filter(x => x.tag).length;
    }
    return false;
  }
  get formEl(): HTMLFormElement {
    return this.$el as any;
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
  assignParams() {
    return lodash.assign(
      {
        [this.Pagination.PaginationParams.currentKey]: this.Pagination.PaginationParams.defaultCurrent,
        [this.Pagination.PaginationParams.pageSizeKey]: this.Pagination.PaginationParams.defaultPageSize,
      },
      lodash.pick(this.$route.query, [this.Pagination.PaginationParams.currentKey, this.Pagination.PaginationParams.pageSizeKey]),
      this.formState)
  }
  @Emit("finish")
  onFinish(values, query = true) {
    if (query) {
      this.__ToQuery(values);
    }
    return this.onRangePickerValues(this.assignParams());
  }
  @Emit("reset")
  async onReset() {
    await lodash.result(this.formRef, "resetFields");
    await lodash.result(this.formRef, "validateFields");
    const values = this.assignParams()
    this.__ToQuery(values);
    return this.onRangePickerValues(values);
  }
  onMoreOpen() {
    this.moreOpen = !this.moreOpen;
    this.breakPoint();
    this.onCollapseChange();
  }
  onCollapseChange = lodash.debounce(() => {
    dispatchEvent(new CustomEvent("resize"));
  }, 500);
  /** 回填 url 数据 */
  backfillQuery() {
    lodash.assign(
      this.formState,
      lodash.pick(this.$route.query, lodash.keys(this.formState))
    );
  }
  breakPoint() {
    let length = 0;
    // 默认搜索条件 x.type !== "symbol" 排除空格
    if (lodash.isFunction(this.$slots.default)) {
      length = this.$slots.default().filter(x => x.tag).length;
    } else if (lodash.isArray(this.$slots.default)) {
      length = this.$slots.default.filter(x => x.tag).length;
    }
    // 隐藏的搜索条件
    if (this.moreOpen) {
      if (lodash.isFunction(this.$slots.more)) {
        length += this.$slots.more().filter(x => x.tag).length;
      } if (lodash.isArray(this.$slots.more)) {
        length += this.$slots.more.filter(x => x.tag).length;
      }
    }
    const width = window.innerWidth;
    const breakPoint: [number, number, string] = lodash.find<any>(
      BREAKPOINTS.vertical,
      (item) => {
        return width < (item[0] as number) + 16;
      }
    );
    this.colProps.colSpan = 24 / breakPoint[1];
    this.layout = breakPoint[2] as any;
    const offset = (length * this.colProps.colSpan) % 24;
    switch (true) {
      // case offset === 0:
      //   this.offset = this.colProps.colSpan * (breakPoint[1] - 1);
      //   break;
      case this.colProps.colSpan + offset === 24:
        this.offset = 0;
        break;
      case this.colProps.colSpan + offset < 24:
        this.offset = 24 - (this.colProps.colSpan + offset);
        break;
      default:
        break;
    }
  }
  created() { }
  mounted() {
    this.breakPoint();
    this.backfillQuery();
    this.onFinish(this.assignParams(), false);
    this.ResizeEvent = fromEvent(window, "resize")
      .pipe(debounceTime(200))
      .subscribe(this.breakPoint);
  }
  unmounted() {
    this.ResizeEvent && this.ResizeEvent.unsubscribe();
    this.ResizeEvent = undefined;
  }
}
</script>
<style  lang="less">
.w-filter-collapse {
  .ant-collapse-content-box {
    @media screen and (min-width: 785px) {
      padding: 16px 8px 0 8px !important;
    }
  }
  margin-bottom: 8px !important;
}
</style>
