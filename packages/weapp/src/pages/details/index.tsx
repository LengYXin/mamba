import { View } from '@tarojs/components'
import { observer } from 'mobx-react'
import { Component } from 'react'
import './index.less'

@observer
class Index extends Component {
  get Store() {
    return this.$Store.Test
  }
  componentWillMount() { }

  componentDidMount() {
    this.Store.onFind(this.$Router.params)
  }

  componentWillUnmount() {
    this.Store.Details.clear()
  }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    return (
      <View className='index'>
        <van-card
          tag={this.Store.entity?.gender}
          desc={this.Store.entity?.introduce}
          title={this.Store.entity?.name}
          thumb={this.Store.entity?.avatar}
        />
      </View>
    )
  }
}

export default Index
