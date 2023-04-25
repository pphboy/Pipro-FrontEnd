import axios from 'axios';
import {ElNotification} from 'element-plus';
import { fi } from 'element-plus/es/locale';
import { useGlobalStore } from '@/store/modules/global';
import router from '@/router';


// const baseURL:string = "http://localhost:8081/";
const baseURL:string = "/api";

const instance = axios.create({
  baseURL: baseURL
})

// 设置 Token

// 添加请求拦截器
instance.interceptors.request.use(function(config){

  axios.defaults.headers.common['Authorization'] = useGlobalStore().token;

  // console.log("request config" ,config);

  return config;
},function(error) {
  return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.status >= 200){
    const data = response.data;
    // console.log("请求后? ",data);
    // 信息错误需要报错
    if(data.status == false){
      ElNotification({
        message:data.message,
        type:'warning'
      })
    }
  }
  return response;
}, function (error) {
  const response = error.response;
  const status = response.status;
  console.log(error,"error");
  console.log(response,"response");

  // 超出 2xx 范围的状态码都会触发该函数。
  if(status >= 500 ){
    ElNotification({
      title:'系统错误',
      message:"请检查服务器是否正常运行",
      type:'error'
    })
  }else if(status >= 400){
    switch (status) {
      case 400:
          ElNotification({
            title:'系统错误',
            message:"参数错误",
            type:'error'
          })
          // useGlobalStore().clearLogin();
          // router.push({name:"Login"})
        break;
      case 403:
          ElNotification({
            title:'权限异常',
            message:response.data.message,
            type:'error'
          })
          // useGlobalStore().clearLogin();
          // router.push({name:"Login"})
        break;
      default:
          ElNotification({
            title:'权限错误',
            message:"请检查权限是否异常",
            type:'error'
          })
        break;
    }

  }else if(status >= 300){
    ElNotification({
      title:'转发错误',
      message:"请检查代理服务器",
      type:'error'
    })

  }

  return Promise.reject(error);
});


export default instance;