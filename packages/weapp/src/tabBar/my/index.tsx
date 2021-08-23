import { View } from '@tarojs/components'
import { observer } from 'mobx-react'
import { Component } from 'react'
import './index.less'

@observer
class Index extends Component {
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    return (
      <View className='index'>

      </View>
    )
  }
}

export default Index
