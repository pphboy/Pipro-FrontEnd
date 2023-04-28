import { defineStore } from 'pinia';
import { PiDocumentDirectory, PiDocument } from '@/types/Document';


interface DocumentDirectoryStore {
  directoryList: Array<PiDocumentDirectory>,
  directoryDetail: PiDocumentDirectory,
  copy?: PiDocumentDirectory,
  document:PiDocument,
}

export const useDocumentDirectoryStore = defineStore('document-directory', {
  state: (): DocumentDirectoryStore => ({
    directoryList: [],
    directoryDetail: {} as PiDocumentDirectory,
    copy: undefined,
    document:{} as PiDocument,
  }),
  getters: {

  },
  actions: {
    /**
     * 更新了detail
     * 把上一个的detail保存到copy里
     * 这是一个全局的方法，只能用于一个组件
     * @param directory 
     */
    setDetail(directory: PiDocumentDirectory) {
      this.copy = { ...this.directoryDetail };
      this.directoryDetail = directory;
    },
    /**
     * 撤消 
     * @param directory 
     */
    setBack() {
      if (this.copy) {
        this.directoryDetail = this.copy;
        // this.copy = undefined;
      }
    },
    setIndex() {
      this.directoryDetail = {
        documentDirectoryId: -1,
        documentDirectoryTitle: "",
        createTime: "",
        updateTime: "",
        /**
         * 子目录
         */
        childDirectoryList: this.directoryList,
        /**
         * 子文件
         */
        documentList: []
      }
      this.copy = undefined;

    },
    setDirectory(directories: Array<PiDocumentDirectory>) {
      // 每次更新都需要清除copy
      // this.copy = undefined;
      this.directoryList = directories;
      this.directoryDetail = {
        documentDirectoryId: -1,
        documentDirectoryTitle: "",
        createTime: "",
        updateTime: "",
        /**
         * 子目录
         */
        childDirectoryList: directories,
        /**
         * 子文件
         */
        documentList: []
      }
    }
  },
  // 持久化开启
  // persist: true,
})