import { API } from "@/types/API";
import axios from '@/utils/axios';
import { PiProject,PiLabel } from '@/types/Project'
import { ElLoading, ElMessage, ElNotification } from 'element-plus';
import { getProjectDetail } from "./ProjectDetailService";
import { TodoDetail } from "@/types/Todo";


/**
 * 更新和创建任务
 * @param todo 
 * @param projectId 
 * @returns 
 */
export async function createMission(todo: TodoDetail,projectId:number): Promise<boolean>{
  return new Promise((resolve,reject) => {
    try {
      axios.post(API.PROJECT.MISSION.CREATTE,{
        ...todo,
        labelList:[...(todo.labelList ? todo.labelList : [])].map(a=>a.labelId),
        memberList:[...(todo.memberList ? todo.memberList :[])].map(a=>a.memberId)
      }).then((res) => {
        const data = res.data;
        if(data.status == true){
          ElNotification({
            type:"success",
            message: data.message
          })
          getProjectDetail(projectId);
          resolve(true);
        } else {
          reject(false)
        }
      }).catch((error)=>{
        reject(false);
      })
    } catch (error) {
      console.error("create Mission => ",error);
      reject(false)
    }
  })
}
