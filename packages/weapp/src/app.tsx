import './plugins'
import './store'
import './pages'
import './static'
import './components'
import React from 'react'
import './app.less'
class App extends React.Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 就是要渲染的页面
  render() {
    return this.props.children
  }
}

export default App
