import { defineStore } from 'pinia';

import { PiMessage } from '@/types/Message';

interface MessageState {
  messageList: Array<PiMessage>,
}

export const useMessageStore = defineStore('message',{
  state: (): MessageState => ({
    messageList:[] 
  }),
  getters: {
  },
  actions:{
  },
  // 持久化开启
  persist: true,
})