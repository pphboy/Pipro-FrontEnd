import { API } from "@/types/API";
import axios from '@/utils/axios';
import {ElMessageBox, ElLoading, ElMessage} from 'element-plus';

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
  // 如果是其他项目进来的，直接刷新

  // 如果不是，则不需要操作，因为开了持久化

  return new Promise<Array<PiFileDirectory>>((resolve, reject) => {

    let detailId:number|undefined = undefined;

    console.log(fileDirectoryStore.directoryList[0],"object");
    console.log(fileDirectoryStore.directoryDetail);
    console.log(fileDirectoryStore.directoryList[0] && projectDetailStore.projectDetail.projectId == fileDirectoryStore.directoryList[0].projectId 
        && fileDirectoryStore.directoryDetail);

    if( fileDirectoryStore.directoryList[0] && projectDetailStore.projectDetail.projectId == fileDirectoryStore.directoryList[0].projectId 
        && fileDirectoryStore.directoryDetail ){

        detailId  = fileDirectoryStore.directoryDetail.fileDirectoryId;
        console.log(detailId);
    }

    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.get(API.PROJECT.FILE_DIRECTORY.ALL(projectDetailStore.projectDetail.projectId)).then(res => {
      console.log("getProjectAllFileDirectory",res);
      if (res.data.status) {
        // ElMessage.success(res.data.message)
        // 更新整个项目
        // 更新整个项目

        // 下面是保存copy，就是返回的值
        if(!fileDirectoryStore.directoryList[0] || projectDetailStore.projectDetail.projectId != fileDirectoryStore.directoryList[0].projectId){
          // 如果 目录 ID != 当前项目ID，则清除COPY，如果相于，则不清除COPY
          fileDirectoryStore.copy = undefined;
        }

        fileDirectoryStore.setDirectory(res.data.data)

        if(detailId){
          console.log(detailId);
          getEqualIdDirectory(detailId,fileDirectoryStore.directoryList)
        }
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
    // 设置项目ID
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
  const projectDetailStore = useProjectDetailStore();
  return new Promise<boolean>((resolve, reject) => {
    // 设置项目ID
    directory.projectId = projectDetailStore.projectDetail.projectId;

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
 * 因为是删除，如果要保存的打开状态不存在删除的目录，则显示的就是首页
 * @param directory 
 * @returns 
 */
export async function deleteDirectory(directory: DirectoryDto): Promise<boolean> {
  const projectDetailStore = useProjectDetailStore();
  return new Promise<boolean>((resolve, reject) => {
    // 设置项目ID
    directory.projectId = projectDetailStore.projectDetail.projectId;

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

  let copy:any = undefined;
  // 必须要有 目录的时候，copy存在才有意义，如果没有目录的时候也设置copy就会直接在首页打开“潘多拉报错”
  if(fileDirectoryStore.copy){
    copy = {...fileDirectoryStore.copy};
  }

  getProjectAllFileDirectory().then(res=>{
    getEqualIdDirectory(id,fileDirectoryStore.directoryList);
    if(fileDirectoryStore.copy){
      fileDirectoryStore.copy = {...copy} as PiFileDirectory;
    }
  });
}

export const createDirectoryFunc = (parent?:PiFileDirectory)=>{
  ElMessageBox.prompt('请输入文件目录名', '创建文件目录', {
    confirmButtonText: '创建',
    cancelButtonText: '取消',
    inputPlaceholder:"请输入文件目录名",
    inputPattern:/^.{1,50}$/,
    inputErrorMessage: '文件目录在1~50之间的长度',
  })
    .then(({ value }) => {
      if(!value.trim()){
        ElMessage.error("禁止使用空串作为目录名");
        return;
      }
      const directory:DirectoryDto = {
        parentId:parent?.fileDirectoryId,
        directoryName:value,
      };
      createDirectory(directory)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消添加',
      })
    })
}

export const renameDirectoryFunc = (parent?:PiFileDirectory)=>{
  ElMessageBox.prompt('请输入文件目录名', `您正在修改名为[${parent?.fileDirectoryTitle}]的文件夹名称`, {
    confirmButtonText: '编辑',
    cancelButtonText: '取消',
    inputPlaceholder:"请输入文件目录名",
    inputPattern:/^.{1,50}$/,
    inputValue:parent?.fileDirectoryTitle,
    type:'warning',
    inputErrorMessage: '文件目录在1~50之间的长度',
  })
    .then(({ value }) => {
      if(!value.trim()){
        ElMessage.error("禁止使用空串作为目录名");
        return;
      }
      const directory:DirectoryDto = {
        directoryName:value,
        directoryId:parent?.fileDirectoryId,
      };
      renameDirectory(directory)
      // 其实传进来的数据肯定是存在的，但个判断是为了不报错
      if( parent && parent.fileDirectoryTitle){
        parent.fileDirectoryTitle=value
      }
    })

    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消编辑',
      })
    })
}

export const deleteDirectoryFunc = (parent?:PiFileDirectory)=>{
  ElMessageBox.prompt('你正在执行危险操作,删除后数据找回需要到数据库内，请谨慎操作', `您正在删除名为[${parent?.fileDirectoryTitle}]的文件夹名称`, {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type:'error',
    showInput:false
  })
    .then(({ value }) => {
      const directory:DirectoryDto = {
        directoryId:parent?.fileDirectoryId,
      };
      deleteDirectory(directory)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
