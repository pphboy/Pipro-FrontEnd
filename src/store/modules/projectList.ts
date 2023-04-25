import { defineStore } from 'pinia';

import { PiProject } from '@/types/Project'
import { ProjectMissionDto } from '@/services/dto/ProjectMissionDto';

interface MemberState {
  projectList:PiProject[],
  missionList:ProjectMissionDto[],
}

export const useProjectListStore = defineStore('project',{
  state: (): MemberState => ({
    projectList:[],
    missionList:[],
  }),
  getters: {
    getProjectList(state):PiProject[]{
      return state.projectList;
    }
  },
  actions:{
    setProjectList(projectList: PiProject[]):void{
      this.projectList = projectList
    }
  },
  // 持久化开启
  // persist: true,
})