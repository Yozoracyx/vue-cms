//1. 导入vue-router
import VueRouter from 'vue-router'

//导入对应路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'

//3. 创建路由对象
var router = new VueRouter({
  routes: [ //配置路由规则
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/search', component: SearchContainer },
    { path: '/shopcar', component: ShopcarContainer }
  ],
  linkActiveClass: 'mui-active'  // 覆盖默认路由高亮（router-link-active）的类
})

export default router