import { KanbanDetail } from "./KanbanList";
import { PiMember } from "./Member";

interface PiProject{
  projectId?: number,
  projectName:string,
  projectIntro: string,
  createTime?:string,
  updateTime?:string,
  /**
   * 标签列表
   */
  labelList?:Array<PiLabel>,
  /**
   * 看板列表
   */
  kanbanList?:Array<KanbanDetail>,
  /**
   * 用户列表
   */
  memberList?:Array<PiMember>,

}

/**
 * 标签
 */
interface PiLabel {
  projectId:number,
  labelId?:number,
  labelName:string,
  labelColor:string,
  createTime?: string,
  updateTime?: string,
}

export {
  type PiProject,
  type PiLabel,
}