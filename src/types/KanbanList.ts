import { TodoDetail } from "./Todo"

interface KanbanDetail {
  kanbanListId:number,
  listName: string,
  change?:boolean,
  missionList?:Array<TodoDetail>,
}

export {
  type KanbanDetail,
}