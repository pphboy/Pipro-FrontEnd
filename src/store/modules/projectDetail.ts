import { defineStore } from 'pinia';

import { PiProject } from '@/types/Project'
import { KanbanDetail } from '@/types/KanbanList';
import { MissionTodayAndLastDto } from '@/services/dto/MissionTodayAndLastDto';
import { PiMember } from '@/types/Member';

interface MemberState {
  projectId:number | undefined,
  projectDetail:PiProject,
  missionList:MissionTodayAndLastDto,
  /**
   * 没有加入本项目的其他所有成员
   */
  anotherMemberList:PiMember[],
}

export const useProjectDetailStore = defineStore('projectDetail',{
  state: (): MemberState => ({
    projectId:-1,
    projectDetail:{} as PiProject,
  missionList:{} as MissionTodayAndLastDto,
  anotherMemberList:[],
  }),
  getters: {
    getProjectId(state):number{
      if(state.projectId) return state.projectId
      else return 0;
    }
  },
  actions:{
    setProjectDetail(project: PiProject){
      this.projectDetail = project;
      this.projectId = project.projectId;
    }
  },
  // 持久化开启
  persist: true,
})