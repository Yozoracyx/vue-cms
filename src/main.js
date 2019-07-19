// 入口文件
import Vue from 'vue'

//1.1 导入路由包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//2.1 导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)


import moment from 'moment'
//定义全局过滤器
Vue.filter("dateFormat", function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置 post 时表单数据格式
Vue.http.options.emulateJSON = true;

//导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入 Mint-UI 组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';

// Vue.use(Lazyload);
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//安装图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)


//1.3 导入自己的router.js 模块
import router from './router.js'

import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router  //挂载router
})