
import { PiMember } from "./Member"

/**
 *  文件详情
 */
export interface PiFile {
  fileId:number,
  filename:string,
  filePath:string,
  createTime:String
}

/**
 * 文件目录
 * 有文件
 * 有目录
 */
export interface PiFileDirectory{
      fileDirectoryId:number,
      fileDirectoryTitle:string,
      createTime:string,
      updateTime:string,
      /**
       * 子目录
       */
      childDirectoryList:Array<PiFileDirectory>,
      /**
       * 子文件
       */
      fileList:Array<PiFile>
}

export const fakeData: PiFileDirectory = {
  fileDirectoryId: 1,
  fileDirectoryTitle: 'Root Directory',
  createTime: '2023-04-26T12:29:44.452Z',
  updateTime: '2023-04-26T12:29:44.452Z',
  childDirectoryList: [
    {
      fileDirectoryId: 2,
      fileDirectoryTitle: 'Subdirectory 1',
      createTime: '2023-04-26T12:29:44.452Z',
      updateTime: '2023-04-26T12:29:44.452Z',
      childDirectoryList: [
        {
          fileDirectoryId: 4,
          fileDirectoryTitle: 'Sub-subdirectory 1',
          createTime: '2023-04-26T12:29:44.452Z',
          updateTime: '2023-04-26T12:29:44.452Z',
          childDirectoryList: [],
          fileList: [
            {
              fileId: 1,
              filename: 'file1.txt',
              filePath: '/root/subdir1/subsubdir1/file1.txt',
              createTime: '2023-04-26T12:29:44.452Z'
            },
            {
              fileId: 2,
              filename: 'file2.pdf',
              filePath: '/root/subdir1/subsubdir1/file2.pdf',
              createTime: '2023-04-26T12:29:44.452Z'
            }
          ]
        }
      ],
      fileList: [
        {
          fileId: 3,
          filename: 'file3.jpg',
          filePath: '/root/subdir1/file3.jpg',
          createTime: '2023-04-26T12:29:44.452Z'
        },
        {
          fileId: 4,
          filename: 'file4.docx',
          filePath: '/root/subdir1/file4.docx',
          createTime: '2023-04-26T12:29:44.452Z'
        }
      ]
    },
    {
      fileDirectoryId: 3,
      fileDirectoryTitle: 'Subdirectory 2',
      createTime: '2023-04-26T12:29:44.452Z',
      updateTime: '2023-04-26T12:29:44.452Z',
      childDirectoryList: [],
      fileList: [
        {
          fileId: 5,
          filename: 'file5.png',
          filePath: '/root/subdir2/file5.png',
          createTime: '2023-04-26T12:29:44.452Z'
        }
      ]
    },
    {
      fileDirectoryId: 3,
      fileDirectoryTitle: 'Subdirectory 2',
      createTime: '2023-04-26T12:29:44.452Z',
      updateTime: '2023-04-26T12:29:44.452Z',
      childDirectoryList: [],
      fileList: []
    }
  ],
  fileList: [
    {
      fileId: 1,
      filename: 'file1.txt',
      filePath: '/root/subdir1/subsubdir1/file1.txt',
      createTime: '2023-04-26T12:29:44.452Z'
    },
    {
      fileId: 2,
      filename: 'file2.pdf',
      filePath: '/root/subdir1/subsubdir1/file2.pdf',
      createTime: '2023-04-26T12:29:44.452Z'
    }
  ]
};
