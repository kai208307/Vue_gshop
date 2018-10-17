// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {Button} from 'mint-ui'


import router from './router/index'
import store from './store/index'
import TopHeader from './components/TopHeader/TopHeader'
import CartControl from './components/CartControl/CartControl'

//引入swiper库中相关的样式文件
import 'swiper/dist/css/swiper.min.css'
//引入mock，在入口文件中需要找到数据，才能分发action进行获取
import './mock/mockServer'

//注册为全局组件后，即不需要在用到该组件处重新引用了，都可以看到
Vue.component('TopHeader',TopHeader)
Vue.component(Button.name,Button)
Vue.component('CartControl',CartControl)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
