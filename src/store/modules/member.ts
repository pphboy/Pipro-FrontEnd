import { defineStore } from 'pinia';

import {PiMember} from '@/types/Member'

interface MemberState {
  token: string| null,
  member:PiMember,
}

export const useMemberStore = defineStore('member',{
  state: (): MemberState => ({
    token: null,
    member:{} as PiMember
  }),
  getters: {
    getToken(state):string|null{
      return state.token;
    }
  },
  actions:{
    setToken(token:string):void {
      this.token = token;
    },
  },
  // 持久化开启
  persist: true,
})