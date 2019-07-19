//1. 导入vue-router
import VueRouter from 'vue-router'

//导入对应路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotosList from './components/photos/PhotosList.vue'

//3. 创建路由对象
var router = new VueRouter({
  routes: [ //配置路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/search', component: SearchContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/home/newlist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photoslist', component: PhotosList },
  ],
  linkActiveClass: 'mui-active'  // 覆盖默认路由高亮（router-link-active）的类
})

export default router