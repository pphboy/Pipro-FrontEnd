

/**
 *  文件详情
 */
export interface PiDocument {
  documentId: number,
  documentContent: string,
  documentTitle: string,
  createTime: String
}

/**
 * 文件目录
 * 有文件
 * 有目录
 */
export interface PiDocumentDirectory {
  documentDirectoryId: number,
  documentDirectoryTitle: string,
  parentId?: number,
  projectId?: number,
  createTime: string,
  updateTime: string,
  /**
   * 子目录
   */
  childDirectoryList: Array<PiDocumentDirectory>,
  /**
   * 子文件
   */
  documentList: Array<PiDocument>
}
