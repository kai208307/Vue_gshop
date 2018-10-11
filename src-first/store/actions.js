/*
* 包含n个用于间接更新状态数据方法的对象，actions模块发送请求
* */
import {
  reqAddress,
  reqFoodsCategory,
  reqShop
} from '../api/index'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
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
      const category = result.data
      commit(RECEIVE_CATEGORYS,{category})
    }
  },
  async getShops({commit,state}){
    const {longitude,latitude} = state
    const result = await reqShop({longitude,latitude})//{code:0,data:shop}
    if (result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  }
}
