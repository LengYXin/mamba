import React from 'react'
import { Provider } from 'mobx-react'
import { RouteChildrenProps, withRouter } from 'react-router-dom'
import PageController, { PageEntity } from './controller'
import PageAction from './views/action'
import PageDetails from './views/details'
import PageFilter from './views/filter'
import PageGrid from './views/grid'
import { EnumPageMeta } from './locales'
@withRouter
export default class PageIndex extends React.Component<RouteChildrenProps> {
  static meta = EnumPageMeta;
  static PageController = PageController;
  static PageEntity = PageEntity;
  // 内部 this 访问
  readonly PageController = PageController;
  readonly PageEntity = PageEntity;
  state = {}
  componentDidMount() {
    React.$Mamba.Log.success(`Page [${EnumPageMeta.title}]`, this)
  }
  render() {
    return (
      <Provider PageController={PageController} PageEntity={PageEntity} >
        <PageFilter />
        <PageAction />
        <PageGrid />
        <PageDetails />
      </Provider>
    )
  }
}
