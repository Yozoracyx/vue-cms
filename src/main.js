// 入口文件
import Vue from 'vue'

//1.1 导入路由包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//2.1 导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem("car") || '[]')

const store = new Vuex.Store({
  state: {  //this.$store.state.***
    car: car //购物车中 商品的数据
  },
  mutations: { //this.$store.commit('方法名称','唯一参数')
    addToCar(state, goodsinfo) {

      var flag = false;

      //遍历已存在的购物车
      state.car.some(item => {
        //如果该商品已加入购物车，则修改数量
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      })

      //没有则添加商品
      if (!flag) {
        state.car.push(goodsinfo)
      }

      localStorage.setItem("car", JSON.stringify(state.car));
    },
    updateGoodsInfo(state, goodsinfo) {
      //修改购物车中商品的数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true;
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car));

    },
    removeFormCar(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car));

    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      localStorage.setItem("car", JSON.stringify(state.car));

    }
  },
  getters: {  //this.$store.getters.***
    //计算属性
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += parseInt(item.count);
      })

      return c;
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o;
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state){
      var o = {
        count:0, //勾选数量
        amount:0  //勾选总价
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count += item.count;
          o.amount += item.price * item.count;
        }
      })
      return o;
    }
  }
})

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
  router,  //挂载router
  store   //挂载 store 状态管理对象
})