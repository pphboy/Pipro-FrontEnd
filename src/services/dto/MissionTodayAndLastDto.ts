import { TodoDetail } from "@/types/Todo"; 

export interface MissionTodayAndLastDto {
  today: Array<TodoDetail>,
  overtime: Array<TodoDetail>, 
}