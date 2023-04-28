

/**
 *  文件详情
 */
export interface PiFile {
  fileId: number,
  filename: string,
  filePath: string,
  createTime: String
}

/**
 * 文件目录
 * 有文件
 * 有目录
 */
export interface PiFileDirectory {
  fileDirectoryId: number,
  fileDirectoryTitle: string,
  parentId?: number,
  projectId?: number,
  createTime: string,
  updateTime: string,
  /**
   * 子目录
   */
  childDirectoryList: Array<PiFileDirectory>,
  /**
   * 子文件
   */
  fileList: Array<PiFile>
}
