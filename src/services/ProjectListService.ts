import { API } from "@/types/API";
import axios from '@/utils/axios';
import {PiProject} from '@/types/Project'
import { useGlobalStore } from "@/store/modules/global";


/**
 * 获取用户的列表
 * @returns 项目列表
 */
export async function getProjectListByMemberId():Promise<Array<PiProject>>{
  return new Promise((resolve,reject)=>{
    axios.post(API.PROJECT.ALL_PROJECT).then(res=>{
      if(res.data.status){
        resolve(res.data.data)
      }
    }).catch((err)=>{
      console.log(`[getProjectListByMemberId] `,err);
      reject([]);
    })
  });
}

export async function saveProject(project: PiProject):Promise<boolean>{
  const {projectName,projectIntro} = project;
  return new Promise((resolve,reject)=>{
    axios.post(API.PROJECT.CREATE,{projectName,projectIntro}).then(res=>{
      if(res.data.status){
        resolve(true)
      }else {
        resolve(false)
      }
    }).catch((err)=>{
      console.log(`[getProjectListByMemberId] `,err);
      reject(false);
    })
  });
}