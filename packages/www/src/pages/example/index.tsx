import React from 'react'
import { withRouter } from 'umi'
declare type IReactComponent<P = any> = React.ClassicComponentClass<P> | React.ComponentClass<P> | React.FunctionComponent<P> | React.ForwardRefExoticComponent<P>;
declare module 'react-router' {
  function withRouter<T extends IReactComponent>(component: T): T;
}
@withRouter
export default class PageIndex extends React.Component {
  state = {}
  componentDidMount() {
    console.log("LENG ~ PageIndex ~ componentDidMount ~ this", this)
  }
  render() {
    return (
      <div>
        测试页面
      </div>
    )
  }
}
