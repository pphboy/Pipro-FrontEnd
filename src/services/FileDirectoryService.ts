import { API } from "@/types/API";
import axios from '@/utils/axios';
import { ElLoading, ElMessage} from 'element-plus';

import { DirectoryDto } from "./dto/FileDirectoryDto";
import { PiFileDirectory } from "@/types/File";

import { useFileDirectoryStore } from "@/store/modules/fileDirectory";
import { useProjectDetailStore } from "@/store/modules/projectDetail";

/**
 * 获取当前项目所有的文件目录
 * @returns 
 */
export async function getProjectAllFileDirectory(): Promise<Array<PiFileDirectory>> {
  const projectDetailStore = useProjectDetailStore();
  const fileDirectoryStore = useFileDirectoryStore();
  return new Promise<Array<PiFileDirectory>>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.get(API.PROJECT.FILE_DIRECTORY.ALL(projectDetailStore.projectDetail.projectId)).then(res => {
      console.log("getProjectAllFileDirectory",res);
      if (res.data.status) {
        // ElMessage.success(res.data.message)
        // 更新整个项目
        fileDirectoryStore.setDirectory(res.data.data)
        resolve(res.data.data)
      }else 
        reject([]);
    }).catch((err) => {
      console.log(`[createDirectory] `, err);
      reject([]);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}



/**
 * 创建目录
 * @param directory 目录对象
 * @returns 
 */
export async function createDirectory(directory: DirectoryDto): Promise<boolean> {
  const projectDetailStore = useProjectDetailStore();
  return new Promise<boolean>((resolve, reject) => {
    directory.projectId = projectDetailStore.projectDetail.projectId;
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.post(API.PROJECT.FILE_DIRECTORY.CREATE,directory).then(res => {
      console.log("createDirectory",directory);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个目录
        saveStatusAndRefresh();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[createDirectory] `, err);
      reject(false);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 100)
    })
  });
}


/**
 * 
 * 文件重命名
 * @param directory 
 * @returns 
 */
export async function renameDirectory(directory: DirectoryDto): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios.put(API.PROJECT.FILE_DIRECTORY.RENAME,directory).then(res => {
      console.log("renameDirectory",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[renameDirectory] `, err);
      reject(false);
    }).finally(() => {
     
    })
  });
}

/**
 * 删除文件 
 * @param directory 
 * @returns 
 */
export async function deleteDirectory(directory: DirectoryDto): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios.delete(API.PROJECT.FILE_DIRECTORY.DELETE,{data:directory}).then(res => {
      console.log("deleteDirectory",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        saveStatusAndRefresh();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[deleteDirectory] `, err);
      reject(false);
    }).finally(() => {
    })
  });
}

/**
 * 这是一个递归搜索算法，就是为了拿到数组里面等于id的值
 * @param id 
 * @param directoryList 
 * @returns 
 */
export function getEqualIdDirectory(id:number,directoryList?:Array<PiFileDirectory>){
  const fileDirectoryStore = useFileDirectoryStore();
  if(directoryList && directoryList.length){
    for(let i = 0;i<directoryList.length;i++){
      const current = directoryList[i];
      if(current.fileDirectoryId == id){
        fileDirectoryStore.directoryDetail = current;
        return current
      }else {
        getEqualIdDirectory(id,current.childDirectoryList);
      }
    }
  }
}

/**
 * 保存当前的打开目录的状态，并刷新数据
 */
export function saveStatusAndRefresh(){
  const fileDirectoryStore = useFileDirectoryStore();
  const id = fileDirectoryStore.directoryDetail.fileDirectoryId;
  const copy = {...fileDirectoryStore.copy};

  getProjectAllFileDirectory().then(res=>{
    getEqualIdDirectory(id,fileDirectoryStore.directoryList);
    fileDirectoryStore.copy = {...copy} as PiFileDirectory;
  });
}