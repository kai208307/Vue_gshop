/*
* 路由模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'

//引入路由组件
import Msite from '../pages/Msite/Msite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

Vue.use(VueRouter)

export default new VueRouter({
  //配置路由
  routes: [
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    /*默认路由*/
    {
      path: '/',  //根路径
      redirect: '/msite' //路径
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/shopgoods',
          component: ShopGoods
        },
        {
          path: '/shop/shopratings',
          component: ShopRatings
        },
        {
          path: '/shop/shopinfo',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/shopgoods'
        }
      ]
    }
  ]
})
