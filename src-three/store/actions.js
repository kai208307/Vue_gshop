/*
* 包含n个用于间接更新状态数据方法的对象，actions模块发送请求
* */
import {
  reqAddress,
  reqFoodsCategory,
  reqShop,
  reqUser,
  reqLogout,
  reqGoods,
  reqRatings,
  reqInfo
} from '../api/index'

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

export default {
  //异步获取地址
  async getAdress({commit,state}){
    //发送ajax请求
    //得到geohash，其实就是经纬度，在state中已经定义了
    const {longitude,latitude} = state
    const result = await reqAddress( latitude+ ',' + longitude) //{code：0，data：address}
    //需要判断result是否成功
    if (result.code === 0){
      //成功的话，提交address到mutation
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  //异步获取食品列表
  async getCategory({commit}){
    //发送请求
    const result = await reqFoodsCategory()//{code:0,data:category}
    if (result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  //异步获取商家列表
  async getShops({commit,state}){
    const {longitude,latitude} = state
    const result = await reqShop({longitude,latitude})//{code:0,data:shop}
    if (result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  //同步保存用户的action
  saveUser({commit},user){
    commit(RECEIVE_USER,{user})
  },

  // 异步获取用户的action
  async getUser ({commit}) {
    const result = await reqUser()
    if(result.code===0) {
      const user = result.data
      commit(RECEIVE_USER, {user})
    }
  },
  //退出登录
  async logout({commit}){
    const result = await reqLogout()
    if (result.code === 0){
      commit(RESET_USER)
    }
  },
  //异步获取点餐信息,goods数据
  async getGoods({commit},cb) {
    const result = await reqGoods()
    if (result.code === 0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      typeof cb === 'function' && cb()
    }
  },
  //异步获取评价信息
  async getRatings({commit}) {
    const result = await reqRatings()
    if (result.code === 0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
    }
  },
  async getInfo({commit}) {
    const result = await reqInfo()
    if (result.code === 0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  }
}
