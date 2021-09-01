import React from 'react'
import { RouteChildrenProps, withRouter } from 'react-router-dom'
@withRouter
export default class PageIndex extends React.Component<RouteChildrenProps> {
  state = {}
  componentDidMount() {
  }
  render() {
    return (
      <div >
        示例页面
      </div>
    )
  }
}
