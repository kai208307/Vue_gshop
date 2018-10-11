// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router/index'
import store from './store/index'
import TopHeader from './components/TopHeader/TopHeader'

//引入swiper库中相关的样式文件
import 'swiper/dist/css/swiper.min.css'

//注册全局组件
Vue.component('TopHeader',TopHeader)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
