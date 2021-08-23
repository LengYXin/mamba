declare namespace JSX {
  interface IntrinsicElements {
    /** @InjectVant **/ 
    'van-action-sheet':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-area':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-button':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-calendar':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-card':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-cell':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-cell-group':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-checkbox':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-checkbox-group':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-circle':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-col':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-collapse':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-collapse-item':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-config-provider':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-count-down':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-datetime-picker':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-dialog':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-divider':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-dropdown-item':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-dropdown-menu':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-empty':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-field':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-goods-action':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-goods-action-button':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-goods-action-icon':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-grid':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-grid-item':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-icon':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-image':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-index-anchor':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-index-bar':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-info':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-loading':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-nav-bar':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-notice-bar':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-notify':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-overlay':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-panel':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-picker':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-picker-column':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-popup':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-progress':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-radio':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-radio-group':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-rate':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-row':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-search':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-share-sheet':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-sidebar':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-sidebar-item':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-skeleton':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-slider':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-stepper':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-steps':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-sticky':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-submit-bar':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-swipe-cell':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-switch':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-tab':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-tabbar':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-tabbar-item':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-tabs':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-tag':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-toast':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-transition':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-tree-select':React.DetailedHTMLProps<van.StandardProps, any>,
    'van-uploader':React.DetailedHTMLProps<van.StandardProps, any>
    /** @InjectVant **/
    'keyboard-accessory': any
    'page-container': any
    'image-cropper': any
    'wxml-to-canvas': any
    'import': React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>
  }
}

declare namespace van {
  // interface cell {
  //   url?: String,
  //   linkType?: 'navigateTo' | 'redirectTo' | 'switchTab' | 'reLaunch',
  //   title?: string,
  //   value?: string,
  //   icon?: String,
  //   size?: String,
  //   label?: String,
  //   center?: Boolean,
  //   isLink?: Boolean,
  //   required?: Boolean,
  //   clickable?: Boolean,
  //   titleWidth?: String,
  //   customStyle?: String,
  //   arrowDirection?: String,
  //   useLabelSlot?: Boolean,
  //   border?: boolean,
  //   titleStyle?: String,
  // }
  interface StandardProps<T = any> extends EventProps {
    /** 组件的唯一标示, 保持整个页面唯一 */
    id?: string
    /** 同 `class`，在 React/Nerv 里一般使用 `className` 作为 `class` 的代称 */
    className?: string
    /** 根节点样式类 */
    customClass?: string
    /** 组件的内联样式, 可以动态设置的内联样式 */
    style?: React.CSSProperties
    /** 如果列表中项目的位置会动态改变或者有新的项目添加到列表中，
     * 需要使用 `wx:key` 来指定列表中项目的唯一的标识符。
     */
    key?: string | number
    /** 组件是否显示, 所有组件默认显示 */
    hidden?: boolean
    /** 动画属性 */
    animation?: { actions: object[] }
    /** 引用 */
    ref?: React.LegacyRef<T>
    /**
     * 渲染 HTML
     * @see https://taro-docs.jd.com/taro/docs/html
     */
    dangerouslySetInnerHTML?: {
      __html: string;
    }
    [key: string]: any
  }

  interface FormItemProps {
    /** 表单数据标识 */
    name?: string
  }

  interface EventProps {
    /** 手指触摸动作开始 */
    onTouchStart?: (event) => void

    /** 手指触摸后移动 */
    onTouchMove?: (event) => void

    /** 手指触摸动作被打断，如来电提醒，弹窗 */
    onTouchCancel?: (event) => void

    /** 手指触摸动作结束 */
    onTouchEnd?: (event) => void

    /** 手指触摸后马上离开 */
    onClick?: (event) => void
    /** 值更改 */
    onChange?: (event) => void

    /** 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发 */
    onLongPress?: (event) => void

    /** 手指触摸后，超过350ms再离开（推荐使用 longpress 事件代替） */
    onLongClick?: (event) => void

    /** 会在 WXSS transition 或 Taro.createAnimation 动画结束后触发 */
    onTransitionEnd?: (event) => void

    /** 会在一个 WXSS animation 动画开始时触发 */
    onAnimationStart?: (event) => void

    /** 会在一个 WXSS animation 一次迭代结束时触发 */
    onAnimationIteration?: (event) => void

    /** 会在一个 WXSS animation 动画完成时触发 */
    onAnimationEnd?: (event) => void

    /** 在支持 3D Touch 的 iPhone 设备，重按时会触发 */
    onTouchForceChange?: (event) => void
  }

}