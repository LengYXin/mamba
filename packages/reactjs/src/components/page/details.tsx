import { DrawerFormProps, ModalFormProps } from '@ant-design/pro-form';
import { FormInstance } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { observer } from 'mobx-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import style from './style.module.less';
export interface PageDetailsFieldsProps {
  visibleKey: string,
  detailsKey: string,
  readonly: boolean,
  form: FormInstance
}
export type IPageDetailsProps = (ModalFormProps | DrawerFormProps) & {
  /** 页面控制器 */
  PageController?: React.BasesController;
  /** 只读表单 默认取 地址栏 readonly 标记 */
  readonly?: boolean;
  /** url 参数 显示表单的 参数 key 默认 details */
  visibleKey?: string;
  onFind?: (event: PageDetailsFieldsProps) => Promise<boolean | void>
}
@withRouter
@BindAll()
export class PageDetails extends React.Component<IPageDetailsProps> {
  ref = React.createRef<FormInstance>()
  get PageController() {
    return this.props.PageController
  }
  // get isDrawer() {
  //   if (this.AppConfig.isMobile) {
  //     return true
  //   }
  //   return lodash.eq(this.AppConfig.formType, 'Drawer')
  // }
  /** 只读 */
  get readonly() {
    return lodash.has(this.$router.query, 'readonly')
  }
  /** url 参数 显示 key */
  get visibleKey() {
    return this.props.visibleKey || 'details'
  }
  /** 显示 */
  get visible() {
    return lodash.has(this.$router.query, this.visibleKey)
  }
  /** 数据 key */
  get detailsKey() {
    return lodash.get(this.$router.query, this.visibleKey)
  }
  /** url */
  get pathname() {
    return this.$router.location.pathname
  }
  get size(): SizeType {
    return this.AppConfig.userAgent.isMobile ? 'small' : undefined
  }
  onVisibleChange(visible) {
    // 显示加载数据
    if (visible) return this.onFind();
    // 去除地址栏参数
    this.onBackDetails(this.visibleKey);
    // 重置表单
    this.ref.current?.resetFields()
  }
  async onFind() {
    if (this.detailsKey) {
      const res = await lodash.invoke(this.props, 'onFind', this.createEvent())
      this.ref.current?.setFieldsValue(res)
    }
  }
  componentDidMount() {
    // console.log("LENG ~ PageDetailsBase ~ componentDidMount ~ this.ref", this)
  }
  createEvent() {
    return {
      visibleKey: this.visibleKey,
      detailsKey: this.detailsKey,
      readonly: this.readonly,
      form: this.ref.current
    }
  }
  renderForm() {
    return React.cloneElement(this.props.children as React.ReactElement, this.createEvent())
  }
  /**
  * https://procomponents.ant.design/components/form
  * 提交表单且数据验证成功后回调事件，同 antd 4 Form 组件 API
  * @param values 
  */
  async onFinish(values) {
    if (this.readonly) {
      return true
    }
    return lodash.invoke(this.props, 'onFinish', values)
  }
  render() {
    const { staticContext, PageController, visibleKey, ref, onVisibleChange, onFind, onFinish, ...props } = this.props as any;
    const title = this.detailsKey ? this.$i18n.t(this.$Enumlocales.action_update) : this.$i18n.t(this.$Enumlocales.action_insert)
    return (
      <HookForm
        ref={this.ref}
        visible={this.visible}
        title={title}
        // trigger={
        //   <React.Antd.Button size={this.size} type="primary" onClick={() => this.onToDetails({ [this.visibleKey]: '' })}>
        //     <React.Icons.PlusOutlined />
        //     <React.Antd.I18n i18nKey="action.insert" />
        //   </React.Antd.Button>
        // }
        onVisibleChange={this.onVisibleChange}
        onFinish={this.onFinish}
        {...props}
      >
        <React.Suspense key={this.detailsKey} fallback={null}>
          {this.renderForm()}
          <PageDetailsLoading PageController={PageController} />
        </React.Suspense>
      </HookForm>
    )
  }
}
@observer
class PageDetailsLoading extends React.Component<{ PageController: React.BasesController; }> {
  render() {
    const { PageController } = this.props;
    const { loading } = PageController.Details
    return (
      <div className={classNames(style.skeleton, { [style.loading]: loading })}>
        <React.Antd.ProSkeleton type="descriptions" pageHeader={false} />
      </div>
      // <React.Antd.Spin
      //   className={classNames(style.spin, { [style.loading]: loading })}
      //   spinning={loading}
      // >
      //   {this.props.children}
      // </React.Antd.Spin>
    )
  }
}
const HookForm = React.forwardRef((props: (ModalFormProps | DrawerFormProps), ref: any) => {
  const [form] = React.Antd.Form.useForm();
  const isDrawer = React.AppConfig.userAgent.isMobile || lodash.eq(React.AppConfig.AppSettings.formType, 'Drawer')
  const DtlForm: any = isDrawer ? React.Antd.DrawerForm : React.Antd.ModalForm;
  ref.current = form;
  return <DtlForm
    form={form}
    {...props}
  >
    {props.children}
  </DtlForm>
})
