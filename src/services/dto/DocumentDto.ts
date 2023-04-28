
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

export interface CreateDocumentDto {
  projectId?:number,
  directoryId?:number,
  documentTitle?:string
}
export interface DeleteDocumentDto {
  projectId?:number,
  documentId?:string,
}

export interface UpdateCoumentDto {
  projectId?:number,
  documentId?:string,
  documentTitle?:string,
  documentContent?:string,
}

