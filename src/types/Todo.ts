import { PiMember } from "./Member"

// 标准接口
interface TodoDetail{
  missionId?:number,
  missionTitle?:string,
  missionIntro?:string,
  missionOrder?:number,
  createTime?:Date,
  memberList:Array<PiMember>,
  updateTime?:Date,
  startTime?:Date,
  endTime?:string,
  missionStatus?:boolean
}

export {
  type TodoDetail,
}