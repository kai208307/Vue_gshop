/*
* 包含n个用于直接更新状态数据方法的对象
* */
import Vue from 'vue'
//首先引入mutation-type
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREATE_CART_COUNT,
  DECREATE_CART_COUNT,
  CLEAR_CART
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
  },
  [INCREATE_CART_COUNT](state,{food}){
    if (food.count){  //count有值即大于0
      food.count++
    }else { //count无值，即等于0
      // food.count = 1
      Vue.set(food, 'count' ,1)//新添加的属性，需要进行数据绑定，利用Vue.set方法
      //将food信息push到购物车中
      state.cartFoods.push(food)
    }
  },
  [DECREATE_CART_COUNT](state,{food}){
    if (food.count){
      food.count--
      if (food.count === 0){
        //将数组清空
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  //清空购物车
  [CLEAR_CART](state){
    state.cartFoods.forEach(food => food.count = 0)
    state.cartFoods = []
  }
}
