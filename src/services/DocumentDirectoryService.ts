import { API } from "@/types/API";
import axios from '@/utils/axios';
import {ElMessageBox, ElLoading, ElMessage} from 'element-plus';

import { DirectoryDto } from "./dto/DocumentDto";
import { PiDocumentDirectory } from "@/types/Document";

import { useDocumentDirectoryStore } from "@/store/modules/documenDirectory";
import { useProjectDetailStore } from "@/store/modules/projectDetail";

/**
 * 获取当前项目所有的文档目录
 * @returns 
 */
export async function getProjectAllDocumentDirectory(): Promise<Array<PiDocumentDirectory>> {
  const projectDetailStore = useProjectDetailStore();
  const documentDirectoryStore = useDocumentDirectoryStore();
  return new Promise<Array<PiDocumentDirectory>>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.get(API.PROJECT.DOCUMENT_DIRECTORY.ALL(projectDetailStore.projectDetail.projectId)).then(res => {
      console.log("getProjectAllDocumentDirectory",res);
      if (res.data.status) {
        // ElMessage.success(res.data.message)
        // 更新整个项目
        documentDirectoryStore.setDirectory(res.data.data)
        resolve(res.data.data)
      }else 
        reject([]);
    }).catch((err) => {
      console.log(`[getProjectAllDocumentDirectory] `, err);
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
    axios.post(API.PROJECT.DOCUMENT_DIRECTORY.CREATE,directory).then(res => {
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
 * 文档重命名
 * @param directory 
 * @returns 
 */
export async function renameDirectory(directory: DirectoryDto): Promise<boolean> {
  const projectDetailStore = useProjectDetailStore();
  return new Promise<boolean>((resolve, reject) => {
    // 设置项目ID
    directory.projectId = projectDetailStore.projectDetail.projectId;

    axios.put(API.PROJECT.DOCUMENT_DIRECTORY.RENAME,directory).then(res => {
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
 * 删除文档 
 * 因为是删除，如果要保存的打开状态不存在删除的目录，则显示的就是首页
 * @param directory 
 * @returns 
 */
export async function deleteDirectory(directory: DirectoryDto): Promise<boolean> {
  const projectDetailStore = useProjectDetailStore();
  return new Promise<boolean>((resolve, reject) => {
    // 设置项目ID
    directory.projectId = projectDetailStore.projectDetail.projectId;

    axios.delete(API.PROJECT.DOCUMENT_DIRECTORY.DELETE,{data:directory}).then(res => {
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
export function getEqualIdDirectory(id:number,directoryList?:Array<PiDocumentDirectory>){
  const documentDirectoryStore = useDocumentDirectoryStore();
  if(directoryList && directoryList.length){
    for(let i = 0;i<directoryList.length;i++){
      const current = directoryList[i];
      if(current.documentDirectoryId == id){
        documentDirectoryStore.directoryDetail = current;
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
  const documentDirectoryStore = useDocumentDirectoryStore();
  const id = documentDirectoryStore.directoryDetail.documentDirectoryId;

  let copy:any = undefined;
  // 必须要有 目录的时候，copy存在才有意义，如果没有目录的时候也设置copy就会直接在首页打开“潘多拉报错”
  if(documentDirectoryStore.copy){
    copy = {...documentDirectoryStore.copy};
  }

  getProjectAllDocumentDirectory().then(res=>{
    getEqualIdDirectory(id,documentDirectoryStore.directoryList);
    if(documentDirectoryStore.copy){
      documentDirectoryStore.copy = {...copy} as PiDocumentDirectory;
    }
  });
}

export const createDirectoryFunc = (parent?:PiDocumentDirectory)=>{
  ElMessageBox.prompt('请输入文档目录名', '创建文档目录', {
    confirmButtonText: '创建',
    cancelButtonText: '取消',
    inputPlaceholder:"请输入文档目录名",
    inputPattern:/^.{1,50}$/,
    inputErrorMessage: '文档目录在1~50之间的长度',
  })
    .then(({ value }) => {
      if(!value.trim()){
        ElMessage.error("禁止使用空串作为目录名");
        return;
      }
      const directory:DirectoryDto = {
        parentId:parent?.documentDirectoryId,
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

export const renameDirectoryFunc = (parent?:PiDocumentDirectory)=>{
  ElMessageBox.prompt('请输入文档目录名', `您正在修改名为[${parent?.documentDirectoryTitle}]的文档夹名称`, {
    confirmButtonText: '编辑',
    cancelButtonText: '取消',
    inputPlaceholder:"请输入文档目录名",
    inputPattern:/^.{1,50}$/,
    inputValue:parent?.documentDirectoryTitle,
    type:'warning',
    inputErrorMessage: '文档目录在1~50之间的长度',
  })
    .then(({ value }) => {
      if(!value.trim()){
        ElMessage.error("禁止使用空串作为目录名");
        return;
      }
      const directory:DirectoryDto = {
        directoryName:value,
        directoryId:parent?.documentDirectoryId,
      };
      renameDirectory(directory)
      // 其实传进来的数据肯定是存在的，但个判断是为了不报错
      if( parent && parent.documentDirectoryTitle){
        parent.documentDirectoryTitle=value
      }
    })

    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消编辑',
      })
    })
}

export const deleteDirectoryFunc = (parent?:PiDocumentDirectory)=>{
  ElMessageBox.prompt('你正在执行危险操作,删除后数据找回需要到数据库内，请谨慎操作', `您正在删除名为[${parent?.documentDirectoryId}]的文档夹名称`, {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type:'error',
    showInput:false
  })
    .then(({ value }) => {
      const directory:DirectoryDto = {
        directoryId:parent?.documentDirectoryId,
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
