import { defineStore } from 'pinia';

import { PiProject } from '@/types/Project'
import { KanbanDetail } from '@/types/KanbanList';

interface MemberState {
  projectId:number | undefined,
  projectDetail:PiProject,
}

export const useProjectDetailStore = defineStore('projectDetail',{
  state: (): MemberState => ({
    projectId:0,
    projectDetail:{} as PiProject,
  }),
  getters: {

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