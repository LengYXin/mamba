import { BindAll } from 'lodash-decorators'
import React from 'react'
import { withRouter } from 'react-router-dom'
import PageController from '../controller'
import { EnumLocaleLabel } from '../locales'
/**
 * 搜索
 * @export
 * @class index
 * @extends {React.Component}
 */
@withRouter
@BindAll()
export default class index extends React.Component {
  /**
   * 初始化 表单默认值
   * 必须填充完整。用于回填 url 参数使用
   * @memberof index
   */
  initialValues = {
    name: null,
    gender: null,
    introduce: null,
    birthday: null,
  }
  onFinish(body) {
    return PageController.onLoad({ body })
  }
  render() {
    return (
      <React.Cts.PageFilter
        PageController={PageController}
        initialValues={this.initialValues}
        onFinish={this.onFinish}
      >
        <React.Antd.ProFormField id="Name_Filter" />
        <React.Antd.ProFormField id="Gender_Filter" />
        <React.Antd.ProFormField name="introduce" label={EnumLocaleLabel.Introduce} />
        <React.Antd.ProFormField name="birthday" label={EnumLocaleLabel.Birthday} valueType="dateRange" colSize={2} />
      </React.Cts.PageFilter>
    )
  }
}
