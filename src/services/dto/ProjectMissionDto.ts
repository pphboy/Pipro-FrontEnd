import { PiProject } from "@/types/Project";
import { PiLabel } from "@/types/Project";
import { PiMember } from "@/types/Member";

export interface ProjectMissionDto{
  missionId?:string,
  missionTitle:string,
  missionIntro?:string,
  missionOrder?:number,
  kanbanListId?:number,
  projectId:number,
  projectName:string,
  memberList?:Set<PiMember>,
  labelList?:Array<PiLabel>,
  endTime?:string,
  missionStatus?:boolean
}