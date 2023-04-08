
import {defineStore} from 'pinia'

export const globalStore = defineStore('globalStore', {
  state: () => {
    return {
      systemName: "PIPRO",
      starttime: "2023年4月8日22:27:11"
    }
  }
})