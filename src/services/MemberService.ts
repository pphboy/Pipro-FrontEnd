import { API } from "@/types/API";
import axios from '@/utils/axios';
import { PiMember } from "@/types/Member";
import { ElLoading, ElMessage, ElNotification } from 'element-plus';

import { useProjectDetailStore } from "@/store/modules/projectDetail";
import {refreshProject } from "./ProjectDetailService";
import { AddMemberDto, DeleteMemberDto } from "./dto/ProjectMemberDto";


export async function getMemberList(): Promise<PiMember[]> {
  const projectDetailStore = useProjectDetailStore();
  return new Promise<PiMember[]>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.get(API.PROJECT.MEMBER.LIST(projectDetailStore.projectDetail.projectId)).then(res => {
      console.log("GetMemberListNotJoinCurrentProject",res.data.data);
      if (res.data.status) {
        projectDetailStore.anotherMemberList = res.data.data
        resolve(res.data.data)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[getMemberList ] `, err);
      reject(false);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}
export async function addMemberToProject(member:AddMemberDto): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.post(API.PROJECT.MEMBER.ADD,member).then(res => {
      console.log("addMemberToProject",res);

      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        refreshProject();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[addMemberToProject ] `, err);
      reject(false);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}

export async function deleteMemberFromProject(member:DeleteMemberDto): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.post(API.PROJECT.MEMBER.DELETE,member).then(res => {
      console.log("deleteMemberFromProject",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        refreshProject();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[deleteMemberFromProject] `, err);
      reject(false);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}