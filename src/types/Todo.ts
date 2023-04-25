import { PiMember } from "./Member"
import { PiLabel } from "./Project"

// 标准接口
/**
 * 这里没写好，对应后端的ProjectMission
 */
interface TodoDetail{
  missionId?:string,
  missionTitle:string,
  missionIntro?:string,
  missionOrder?:number,
  createTime?:Date,
  kanbanListId?:number,
  memberList?:Set<PiMember>,
  labelList?:Array<PiLabel>,
  updateTime?:Date,
  startTime?:string,
  endTime?:string,
  missionStatus?:boolean
}

export {
  type TodoDetail,
}