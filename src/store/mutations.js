/*
* 包含n个用于直接更新状态数据方法的对象
* */
//首先引入mutation-type
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types'
//发送请求
export default {
  //[常量]为了得到定义的值，其中必须有一个state参数，从后台获取数据，所以需要传递第二个参数
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USER](state,{user}){
    state.user = user
  },
  [RESET_USER](state){
    state.user = {}
  },
  [RECEIVE_GOODS](state,{goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [RECEIVE_INFO](state,{info}){
    state.info = info
  }
}
