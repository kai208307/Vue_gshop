/*
* 自定义时间过滤器模块
* */
import Vue from 'vue'
import monent from 'moment'

Vue.filter('date-format',function (value,format = 'YYYY-MM-DD HH:mm:ss') {
  return monent(value).format(format)
})
