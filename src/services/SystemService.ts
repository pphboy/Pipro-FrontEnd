import { API } from "@/types/API";
import axios from '@/utils/axios';
import { VoMember } from "@/types/Member";
import {  ElNotification } from "element-plus";
import { useGlobalStore } from '@/store/modules/global';


/**
 * 输入用户的信息，返回登录成功的状态
 * @param loginObject 用户的信息
 * @returns 登录成功的状态
 */
async function login(loginObject :VoMember): Promise<boolean>{
    /**
     * 全局PINIA对象
     */
    return new Promise((resolve,reject) => {
      try {
        axios.post(API.SYSTEM.LOGIN, loginObject).then((res) => {
          const data = res.data;
            // 设置全局Token，和用户信息 
          if(data.status == true){
            ElNotification({
              type:"success",
              message: data.message
            })

            useGlobalStore().setLoginInfo(data.data)

            resolve(true);
          } else {
            reject(false)
          }
        }).catch((error)=>{
          reject(false);
        })
      } catch (error) {
        console.error("loginSubmit => ",error);
        reject(false)
      }
    })
}

async function register(registerObject :VoMember): Promise<boolean>{
    return new Promise((resolve,reject) => {
      try {
        axios.post(API.SYSTEM.REGISTER, registerObject).then((res) => {
          const data = res.data;
          if(data.status == true){
            ElNotification({
              type:"info",
              message: data.message
            })
            resolve(true);
          } else {
            reject(false)
          }
        }).catch((error)=>{
          reject(false);
        })
      } catch (error) {
        console.error("register=> ",error);
        reject(false)
      }
    })
}

export function initService():void {
  // 初始化加载项
  console.log("加载");
  axios.defaults.headers.common['Authorization'] = useGlobalStore().token;
}

export {
  login,
  register,
}