import { API } from "@/types/API";
import axios from '@/utils/axios';
import { PiProject,PiLabel } from '@/types/Project'
import { ElLoading, ElMessage, ElNotification } from 'element-plus';
import { refreshProject,getProjectDetail } from "./ProjectDetailService";
import { KanbanChangeVo } from "@/services/vo/KanbanVo";
import { TodoDetail } from "@/types/Todo";



/**
 * 更新和创建任务
 * @param todo 
 * @param projectId 
 * @returns 
 */
export async function createMission(todo: TodoDetail): Promise<boolean>{
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
          refreshProject();
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


/**
 * 更新项目的ID
 * @param mission 任务参数
 * @param projectId 项目ID，用于更新全局参数
 * @returns 
 */
export async function updateMission(mission: KanbanChangeVo): Promise<boolean>{
  return new Promise((resolve,reject) => {
    try {
      axios.post(API.PROJECT.MISSION.CHANGE,mission).then((res) => {
        const data = res.data;
        if(data.status == true){
          ElNotification({
            type:"success",
            message: data.message
          })
          refreshProject();
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
