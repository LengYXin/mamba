import { View } from '@tarojs/components';
import { BindAll } from 'lodash-decorators';
import React from 'react';
import './index.less';
import ViewCards from './views/cards';

@BindAll()
@React.Ctx.Pagination.Decorator
class Index extends React.Component {
  get Pagination() {
    return this.$Store.Test.Pagination
  }
  onLoading() {
    return this.Pagination.onLoad()
  }
  componentWillMount() { }
  componentDidMount() { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  render() {
    return (
      <View className='index'>
        <van-sticky>
          <van-search placeholder="请输入搜索关键词" />
        </van-sticky>
        <ViewCards />
      </View>
    )
  }
}

export default Index
