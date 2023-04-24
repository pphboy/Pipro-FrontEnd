import { API } from "@/types/API";
import axios from '@/utils/axios';
import { PiProject } from '@/types/Project'
import { ElLoading } from 'element-plus';
import { useProjectDetailStore } from "@/store/modules/projectDetail";

/**
 * 获取项目详情
 * @param id 项目ID
 * @returns 
 */
export async function getProjectDetail(id:number): Promise<PiProject> {
  return new Promise<PiProject>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.get(`${API.PROJECT.PROJECT_DETAIL}${id}`).then(res => {
      if (res.data.status) {
        useProjectDetailStore().setProjectDetail(res.data.data)
        resolve(res.data.data)
      }
    }).catch((err) => {
      console.log(`[getProjectListByMemberId] `, err);
      reject([]);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}

/**
 * 刷新当前项目的全局信息
 * @returns 返回项目刷新
 */
export async function refreshProject(): Promise<PiProject> {
  const projectDetail = useProjectDetailStore();
  return new Promise<PiProject>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.get(`${API.PROJECT.PROJECT_DETAIL}${projectDetail.projectId}`).then(res => {
      if (res.data.status) {
        projectDetail.setProjectDetail(res.data.data)
        resolve(res.data.data)
      }
    }).catch((err) => {
      console.log(`[refreshProject] `, err);
      reject([]);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}