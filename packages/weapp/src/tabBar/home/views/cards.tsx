import { Navigator } from '@tarojs/components';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { observer } from 'mobx-react';
import React from 'react';
@observer
@BindAll()
class Index extends React.Component {
  get Pagination() {
    return this.$Store.Test.Pagination
  }
  componentWillMount() { }
  componentDidMount() { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }
  render() {
    return (
      lodash.map(this.Pagination.dataSource, item => <Navigator
        url={this.$CreatePageUrl(this.$Pages.Details, lodash.pick(item, 'key'))}>
        <van-card
          tag={item.gender}
          desc={item.introduce}
          title={item.name}
          thumb={item.avatar}
        />
      </Navigator>)
    )
  }
}

export default Index
