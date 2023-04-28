import { API } from "@/types/API";
import axios from '@/utils/axios';
import { PiMessage } from "@/types/Message";
import { useMessageStore } from "@/store/modules/message";
import { ElLoading, ElMessage, ElNotification } from 'element-plus';


/**
 * 
 * @returns 用户全局的消息
 */
export async function getMessageList(): Promise<Array<PiMessage>> {
  const messageStore = useMessageStore();
  return new Promise<Array<PiMessage>>((resolve, reject) => {
    axios.get(API.MESSAGE.ALL).then(res => {
      console.log("getMessageList",res.data.data);
      if (res.data.status) {
        messageStore.messageList = res.data.data
        resolve(res.data.data)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[getMessageList] `, err);
      reject(false);
    }).finally(() => {
    })
  });
}

export async function readOneMessage(id:string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios.get(API.MESSAGE.READ(id)).then(res => {
      console.log("readOneMessage",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        getMessageList();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[readOneMessage ] `, err);
      reject(false);
    }).finally(() => {
    })
  });
}

export async function readAllMessage(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios.get(API.MESSAGE.READ_ALL).then(res => {
      console.log("readAllMessage",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        getMessageList();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[readAllMessage ] `, err);
      reject(false);
    })
  });
}


export async function deleteAllMessage(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios.delete(API.MESSAGE.DELETE_ALL).then(res => {
      console.log("deleteAllMessage",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        getMessageList();
        // 更新整个项目
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[deleteAllMessage] `, err);
      reject(false);
    })
  });
}