import { defineStore } from 'pinia';
import { PiFileDirectory } from '@/types/File';


interface FileDirectoryStore{
  directoryList:Array<PiFileDirectory>,
  directoryDetail: PiFileDirectory,
  copy?: PiFileDirectory,
}

export const  useFileDirectoryStore= defineStore('directory',{
  state: (): FileDirectoryStore=> ({
    directoryList:[],
    directoryDetail:{} as PiFileDirectory,
    copy:undefined,
  }),
  getters: {
    
  },
  actions:{
    /**
     * 更新了detail
     * 把上一个的detail保存到copy里
     * 这是一个全局的方法，只能用于一个组件
     * @param directory 
     */
    setDetail(directory:PiFileDirectory){
      this.copy = {...this.directoryDetail};
      this.directoryDetail = directory;
    },
    /**
     * 撤消 
     * @param directory 
     */
    setBack(){
      if(this.copy){
        this.directoryDetail = this.copy;
        this.copy = undefined;
      }
    },
    setIndex(){
      this.directoryDetail = {
        fileDirectoryId:-1,
        fileDirectoryTitle:"",
        createTime:"",
        updateTime:"",
        /**
         * 子目录
         */
        childDirectoryList:this.directoryList,
        /**
         * 子文件
         */
        fileList:[]
      }
      this.copy = undefined;

    },
    setDirectory(directories:Array<PiFileDirectory>){
      // 每次更新都需要清除copy
      this.copy = undefined;
      this.directoryList = directories;
      this.directoryDetail = {
        fileDirectoryId:-1,
        fileDirectoryTitle:"",
        createTime:"",
        updateTime:"",
        /**
         * 子目录
         */
        childDirectoryList:directories,
        /**
         * 子文件
         */
        fileList:[]
      }
    }
  },
  // 持久化开启
  // persist: true,
})