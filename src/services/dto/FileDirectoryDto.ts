

/**
 * 创建文件使用数据类
 * 修改文件
 * 删除文件
 */
export interface DirectoryDto {
  /**
   * 项目ID
   */
  projectId?:number,
  /**
   * 目录名
   */
  directoryName?:string,
  /**
   * 父目录ID
   */
  parentId?:number
  /**
   * 目录ID
   */
  directoryId?:number,
}

