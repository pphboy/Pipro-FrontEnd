
interface PiProject{
  projectId?: number,
  projectName:string,
  projectIntro: string,
  createTime?:string,
  updateTime?:string,
}

/**
 * 标签
 */
interface PiLabel {
  labelId:number,
  labelName:string,
  labelColor:string,
  createTime: string,
  updateTime: string,
}

export {
  type PiProject,
  type PiLabel,
}