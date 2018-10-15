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
//4、获取短信验证码
export const reqSendCode = phone=> ajax('/api/sendcode',{phone})
//5、手机号验证码登陆
export const reqSmsLogin = (phone,code)=> ajax('/api/login_sms',{phone,code},'POST')
//6、密码登录
export const reqPwdLogin = ({name,pwd,captcha}) => ajax('/api/login_pwd',{name,pwd,captcha},'POST')
//7、根据会话获取用户信息
export const reqUser = ()=> ajax('/api/userinfo')
//8、退出登录
export const reqLogout = ()=> ajax('/api/logout')
//9、获取商家商品分类数组
export const reqGoods = () => ajax('/shopgoods')
//10、获取商家评论信息
export const reqRatings = () => ajax('/shopratings')
//11、获取商家信息
export const reqInfo = () => ajax('/shopinfo')


