/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-06-24 15:03:50
 * @modify date 2021-06-24 15:03:50
 * @desc 分页装饰器
 */
import { View } from '@tarojs/components';
import taro from '@tarojs/taro';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './style.module.less';
export interface IAppProps {
  Pagination: React.BasesPagination<any>;
  onReset?: () => Promise<any>
}
@observer
@BindAll()
export default class PaginationComponent extends React.Component<IAppProps> {
  /**
   * 分页 装饰器 给 Page 使用 触发 onReachBottom 调用 onLoading > Pagination
   * @static
   * @memberof PaginationComponent
   */
  static Decorator = classDecorator
  get Pagination(): React.BasesPagination<any> {
    return this.props.Pagination
  }
  onReset() {
    lodash.invoke(this.props, 'onReset')
  }
  render() {
    if (!this.props.Pagination) {
      console.warn('请配置 get Pagination 属性')
      return null
    }
    return (
      <View className={styles.loading}>

        <van-transition key='loading' show={this.Pagination.loading}>
          <van-loading size="24px" vertical>加载中...</van-loading>
        </van-transition>
        <van-transition key='finished' show={!this.Pagination.loading && this.Pagination.finished}>
          没有更多数据了
        </van-transition>
        <van-transition key='error' show={this.Pagination.requestError}>
          <van-empty image="error" description="网络开小差了">
            <van-button round type="danger" class="bottom-button" onClick={this.onReset}>
              刷新
            </van-button>
          </van-empty>
        </van-transition>
      </View>
    );
  }
}
/**
 * 装饰器
 * @param options 
 * @returns 
 */
function classDecorator<T extends { new(...args: any[]) }>(constructor: T) {
  return class extends constructor {
    // Pagination: React.BasesPagination<any>
    onReachBottom() {
      if (lodash.isFunction(super.onReachBottom)) {
        super.onReachBottom()
      }
      if (lodash.isFunction(super.onLoading)) {
        return super.onLoading()
      }
      return console.warn('请配置 onLoading 函数')
    }
    componentDidMount() {
      if (lodash.isFunction(super.componentDidMount)) {
        super.componentDidMount()
      }
      if (lodash.isFunction(super.onLoading)) {
        return super.onLoading()
      }
      return console.warn('请配置 onLoading 函数')
    }
    async onPullDownRefresh() {
      if (lodash.isFunction(super.onPullDownRefresh)) {
        return super.onPullDownRefresh()
      }
      if (lodash.isFunction(super.onLoading)) {
        // 搜索参数变更重置 分页配置
        this.Pagination.reset()
        await super.onLoading()
      }
      taro.stopPullDownRefresh()
    }
    render() {
      return <>
        {super.render()}
        <PaginationComponent Pagination={this.Pagination} onReset={this.onPullDownRefresh} />
      </>;
    }
  }
}