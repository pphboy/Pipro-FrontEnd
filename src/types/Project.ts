import { KanbanDetail } from "./KanbanList";

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
  kanbanList?:Array<KanbanDetail>;
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