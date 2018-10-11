/*
* 包含n个接口请求函数
* */
//引入ajax请求函数
import ajax from './ajax'

//1、根据经纬度获取位置详情
export const reqAddress = geohash => ajax('/api/position/' + geohash)
//2、获取食品分类列表
export const reqFoodsCategory = ()=> ajax('/api/index_category')
//3、根据经纬度获取商铺列表
export const reqShop = ({longitude,latitude})=> ajax('/api/shops',{longitude,latitude})
