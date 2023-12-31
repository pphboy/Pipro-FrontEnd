

/**
 *  文件详情
 */
export interface PiDocument {
  documentId?:string,
  documentContent?: string,
  documentTitle?: string,
  documentDirectoryId?:number,
  createTime?:string
}

/**
 * 文件目录
 * 有文件
 * 有目录
 */
export interface PiDocumentDirectory {
  documentDirectoryId?: number,
  documentDirectoryTitle?: string,
  parentId?: number,
  projectId?: number,
  createTime?: string,
  updateTime?: string,
  /**
   * 子目录
   */
  childDirectoryList?: Array<PiDocumentDirectory>,
  /**
   * 子文件
   */
  documentList?: Array<PiDocument>
}
