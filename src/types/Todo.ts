
/**
 * Todo 组件 的 Props 数据接口
 */
interface TodoDetail{
  taskName?:string,
  endTime?:string,
  memberName?:string,
  id?:number,
}

// 标准接口
// interface TodoDetail{
//   missionId:number,
//   missionTitle:string,
//   missionIntro:string,
//   missionOrder:number,
//   createTime:Date,
//   updateTime:Date,
//   endTime: Date,
//   missionStatus:boolean
// }

export {
  type TodoDetail,
}