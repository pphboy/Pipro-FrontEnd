import { defineStore } from 'pinia';

import { PiProject } from '@/types/Project'

interface MemberState {
  projectList:PiProject[]
}

export const useProjectListStore = defineStore('project',{
  state: (): MemberState => ({
    projectList:[]
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