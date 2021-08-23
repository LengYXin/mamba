import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { observer } from 'mobx-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { PageDetailsFieldsProps } from 'components/export';
import PageController, { PageEntity } from '../controller';
@withRouter
@BindAll()
export default class index extends React.Component {
  get readonly() {
    return lodash.has(this.$router.query, 'readonly')
  }
  /**
   * 表单默认值
   * @memberof index
   */
  initialValues = {
    
  }
  /**
   * 表单 value 更改事件
   * @param changedValues 更改的 value
   * @param values all value
   */
  onValuesChange(changedValues, values) {
    // PageEntity.onValuesChange(values)
  }
  /**
  * https://procomponents.ant.design/components/form
  * 提交表单且数据验证成功后回调事件，同 antd 4 Form 组件 API
  * @param values 
  */
  onFinish(formData) {
    return PageController.onEditor(formData)
  }
  /**
  * 显示表单触发的加载事件
  * @param values 
  */
  onFind(event: PageDetailsFieldsProps) {
    return PageController.onFind(event.detailsKey)
  }
  render() {
    return (
      <React.Cts.PageDetails
        PageController={PageController}
        // onValuesChange={this.onValuesChange}
        onFinish={this.onFinish}
        onFind={this.onFind}
        initialValues={this.initialValues}
      >
        <Fields />
      </React.Cts.PageDetails>
    )
  }
}
@observer
class Fields extends React.Component<Partial<PageDetailsFieldsProps>> {
  get readonly() {
    return this.props.readonly
  }
  get detailsKey() {
    return lodash.isEmpty(this.props.detailsKey)
  }
  componentDidMount() {
    // 这里可以获取到表单的 状态值
    // console.log("LENG ~ Fields ~ ", this);
  }
  render() {
    return (

      <React.Fragment>
        <React.Antd.ProForm.Group>
          <React.Antd.ProFormField id="Key" readonly={this.readonly} hidden={this.detailsKey} disabled />
          <React.Antd.ProFormField id="Name" tooltip="最长为 24 位" readonly={this.readonly} />
        </React.Antd.ProForm.Group>
        {/* <React.Antd.ProForm.Group title='基础信息'> */}
        <React.Antd.ProFormField id="Avatar" readonly={this.readonly} fieldProps={{ width: '200' }} >
          {/* <React.Antd.ProFormUploadDragger /> */}
        </React.Antd.ProFormField>
        <React.Antd.ProFormField id="Birthday" tooltip="最长为 24 位" readonly={this.readonly} />
        <React.Antd.ProFormField id="Gender" tooltip="最长为 24 位" readonly={this.readonly} />
        {/* </React.Antd.ProForm.Group> */}
        <React.Antd.ProFormField id="Introduce" tooltip="最长为 24 位" readonly={this.readonly} />
      </React.Fragment>
    )
  }
}