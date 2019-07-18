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

Vue.http.options.root = 'http://www.liulongbin.top:3005';

//导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入 Mint-UI 组件
import { Header, Swipe, SwipeItem,Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

//1.3 导入自己的router.js 模块
import router from './router.js'

import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router  //挂载router
})