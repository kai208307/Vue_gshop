/*
* 发送ajax请求函数模块，利用axios，返回Promise对象
* 两种请求方式，get和post
* */
import axios from 'axios'
//发送请求需要明确：请求路径，请求方式，请求参数，返回响应数据格式
export default function ajax(url,data={},type='GET') {
  //为了使返回的直接是result=response.data，所以需要返回一个Promise对象
  return new Promise(function (resolve,reject) {
    let promise
    //若请求类型为get请求
    if (type === 'GET'){
      //定义一个请求参数query
      let queryString = ''
      //得到参数data中所有的属性名
      Object.keys(data).forEach(key=>{
        //属性值
        const value = data[key]
        //拼串,username=123&password=abc
        queryString += key + '=' + value + '&'
      })
      //判断queryString是否存在
      if (queryString){
        //但是最后会多一个&，所以需要截取掉
        queryString = queryString.substring(0,queryString.length-1)
        url += '?' + queryString
      }
      promise = axios.get(url)
    } else{
      promise = axios.post(url,data)
    }
    promise.then(
      response=>{
        resolve(response.data)
      },
      error=>{
        reject(error)
      }
    )
  })
}

