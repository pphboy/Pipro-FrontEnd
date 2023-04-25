import { API } from "@/types/API";
import axios from '@/utils/axios';
import { PiProject } from '@/types/Project'
import { ElLoading } from 'element-plus';
import { useProjectDetailStore } from "@/store/modules/projectDetail";
import { MissionTodayAndLastDto } from "./dto/MissionTodayAndLastDto";
import { getMemberList } from "./MemberService";
import { getAllMissionList } from "./ProjectListService";

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

  const  projectId = ():number=>{
    if(projectDetail.projectDetail.projectId)
      return projectDetail.projectDetail.projectId;
    else return 0;
  }
  // 更新任务 列表
  getMissionListAndOverToday();
  // 刷新首页 [的我的任务],反正这些请求不在一个接口里，不怕
  getAllMissionList();
  // 获取未加入本项目的用户列表
  getMemberList();
  return getProjectDetail(projectId())
}

/**
 * 获取项目的两个列表: 今日待办和逾期待办
 */
export async function getMissionListAndOverToday(): Promise<MissionTodayAndLastDto> {
  const projectDetail = useProjectDetailStore();
  return new Promise<MissionTodayAndLastDto>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.get(API.PROJECT.LIST(projectDetail.projectDetail.projectId)).then(res => {
      if (res.data.status) {
        resolve(res.data.data)
      }
      projectDetail.missionList = res.data.data
    }).catch((err) => {
      console.log(`[getMissionListAndOverToday] `, err);
      reject([]);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}