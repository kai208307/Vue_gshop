/*
* 包含n个用于直接更新状态数据方法的对象
* */
//首先引入mutation-type
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
//发送请求
export default {
  //[常量]为了得到定义的值，其中必须有一个state参数，从后台获取数据，所以需要传递第二个参数
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,{category}){
    state.category = category
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  }
}
