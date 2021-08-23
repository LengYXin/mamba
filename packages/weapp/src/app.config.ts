export default {
  pages: [
    'tabBar/home/index',
    'tabBar/my/index',
  ],
  subpackages: [
    {
      "root": "pages",
      "pages": [
        "details/index",
      ]
    },
  ],
  tabBar: {
    color: '#999',
    selectedColor: '#3E8DDD',
    list: [
      {
        pagePath: "tabBar/home/index",
        text: "首页",
      },
      {
        pagePath: "tabBar/my/index",
        text: "测试",
      },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: {
    // 定义需要引入的第三方组件
    // 1. key 值指定第三方组件名字，以小写开头
    // 2. value 值指定第三方组件 js 文件的相对路径

    // 下面 @InjectVant node 注入 请勿修改
    /** @InjectVant **/ 
    'van-action-sheet':'vant/action-sheet/index',
    'van-area':'vant/area/index',
    'van-button':'vant/button/index',
    'van-calendar':'vant/calendar/index',
    'van-card':'vant/card/index',
    'van-cell':'vant/cell/index',
    'van-cell-group':'vant/cell-group/index',
    'van-checkbox':'vant/checkbox/index',
    'van-checkbox-group':'vant/checkbox-group/index',
    'van-circle':'vant/circle/index',
    'van-col':'vant/col/index',
    'van-collapse':'vant/collapse/index',
    'van-collapse-item':'vant/collapse-item/index',
    'van-config-provider':'vant/config-provider/index',
    'van-count-down':'vant/count-down/index',
    'van-datetime-picker':'vant/datetime-picker/index',
    'van-dialog':'vant/dialog/index',
    'van-divider':'vant/divider/index',
    'van-dropdown-item':'vant/dropdown-item/index',
    'van-dropdown-menu':'vant/dropdown-menu/index',
    'van-empty':'vant/empty/index',
    'van-field':'vant/field/index',
    'van-goods-action':'vant/goods-action/index',
    'van-goods-action-button':'vant/goods-action-button/index',
    'van-goods-action-icon':'vant/goods-action-icon/index',
    'van-grid':'vant/grid/index',
    'van-grid-item':'vant/grid-item/index',
    'van-icon':'vant/icon/index',
    'van-image':'vant/image/index',
    'van-index-anchor':'vant/index-anchor/index',
    'van-index-bar':'vant/index-bar/index',
    'van-info':'vant/info/index',
    'van-loading':'vant/loading/index',
    'van-nav-bar':'vant/nav-bar/index',
    'van-notice-bar':'vant/notice-bar/index',
    'van-notify':'vant/notify/index',
    'van-overlay':'vant/overlay/index',
    'van-panel':'vant/panel/index',
    'van-picker':'vant/picker/index',
    'van-picker-column':'vant/picker-column/index',
    'van-popup':'vant/popup/index',
    'van-progress':'vant/progress/index',
    'van-radio':'vant/radio/index',
    'van-radio-group':'vant/radio-group/index',
    'van-rate':'vant/rate/index',
    'van-row':'vant/row/index',
    'van-search':'vant/search/index',
    'van-share-sheet':'vant/share-sheet/index',
    'van-sidebar':'vant/sidebar/index',
    'van-sidebar-item':'vant/sidebar-item/index',
    'van-skeleton':'vant/skeleton/index',
    'van-slider':'vant/slider/index',
    'van-stepper':'vant/stepper/index',
    'van-steps':'vant/steps/index',
    'van-sticky':'vant/sticky/index',
    'van-submit-bar':'vant/submit-bar/index',
    'van-swipe-cell':'vant/swipe-cell/index',
    'van-switch':'vant/switch/index',
    'van-tab':'vant/tab/index',
    'van-tabbar':'vant/tabbar/index',
    'van-tabbar-item':'vant/tabbar-item/index',
    'van-tabs':'vant/tabs/index',
    'van-tag':'vant/tag/index',
    'van-toast':'vant/toast/index',
    'van-transition':'vant/transition/index',
    'van-tree-select':'vant/tree-select/index',
    'van-uploader':'vant/uploader/index'
    /** @InjectVant **/
  },
} as import("@tarojs/taro").Config;
