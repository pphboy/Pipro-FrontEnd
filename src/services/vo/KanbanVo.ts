

/**
 * 发送到后面的更新Kanban参数
 */
export interface KanbanChangeVo{
  missionId?:string,
  toKanbanId:number,
}


/**
 * 创建
 */
export interface KanbanCreateVo{
  kanbanName:string,
  projectId?:number,
}

/**
 * 看板更新
 */
export interface KanbanUpdateVo{
  kanbanName:string,
  kanbanId:number,
}