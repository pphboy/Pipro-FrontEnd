import { API } from "@/types/API";
import axios from '@/utils/axios';
import {PiProject} from '@/types/Project'
import { ElLoading } from 'element-plus';
import { useGlobalStore } from "@/store/modules/global";
import { useProjectListStore } from "@/store/modules/projectList";


/**
 * 获取用户的列表
 * @returns 项目列表
 */
export async function getProjectList():Promise<Array<PiProject>>{
  return new Promise((resolve,reject)=>{
    const loadingInstance = ElLoading.service({fullscreen:true});
    axios.post(API.PROJECT.ALL_PROJECT).then(res=>{
      if(res.data.status){
        useProjectListStore().projectList = res.data.data;
        resolve(res.data.data)
      }
    }).catch((err)=>{
      console.log(`[getProjectListByMemberId] `,err);
      reject([]);
    }).finally(()=>{
		setTimeout(()=>{
			loadingInstance.close();
		},300)
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

export async function updateProject(project: PiProject):Promise<boolean>{
  const {projectName,projectIntro,projectId} = project;
  return new Promise((resolve,reject)=>{
    axios.post(API.PROJECT.CREATE,{projectName,projectIntro,projectId}).then(res=>{
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