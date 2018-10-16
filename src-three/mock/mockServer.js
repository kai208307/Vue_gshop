import Mock from 'mockjs'
import data from './data'

//Mock.mock(rurl,template),地址和数据模板，数据模板在data.json文件中
//使用mock提供goods数据接口
Mock.mock('/shopgoods',{code:0,data:data.goods})
//使用mock提供ratings数据接口
Mock.mock('/shopratings',{code:0,data:data.ratings})
//使用mock提供info数据接口
Mock.mock('/shopinfo',{code:0,data:data.info})

//如何暴露出去
console.log('mockServer运行了')


