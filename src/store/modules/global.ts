import { defineStore, PiniaPluginContext } from 'pinia';
import { VoMember, PiMember } from '@/types/Member';
import axiosInstance from '@/utils/axios'
import router from '@/router'
import { ElNotification } from 'element-plus'


interface MemberState {
  memberInfo: PiMember | null,
  token: string| null,
  time?: string| null,
}

export const useGlobalStore = defineStore('global',{
  state: (): MemberState => ({
    memberInfo: null,
    token: null,
  }),
  getters: {
    getMember(state): PiMember | null {
      return state.memberInfo || {} as PiMember;
    },
    getToken(state):string|null{
      return state.token;
    }
  },
  actions:{
    setMember(member: PiMember):void{
      this.memberInfo = member; 
    },
    setToken(token:string):void {
      this.token = token;
      axiosInstance.defaults.headers.common['Authorization'] = this.token;
    },
    setLoginInfo(login : Object):void {
      // 设置 全局状态后需要保存到 本地数据库中
      if('member' in login && 'token' in login){
        sessionStorage.setItem("item",JSON.stringify(login))
        this.setMember(login.member as PiMember);
        this.setToken(login.token as string);
      }
    },
    logout(){
      this.token = '';
      this.memberInfo = {} as PiMember;
      router.push({name:'Login'})
      ElNotification.success("退出登录成功")
    }
  },
  // 持久化开启
  persist: true,
})