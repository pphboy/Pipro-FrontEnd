import { API } from "@/types/API";
import axios from '@/utils/axios';
import {ElMessageBox, ElLoading, ElMessage} from 'element-plus';

import { useFileDirectoryStore } from "@/store/modules/fileDirectory";
import { useProjectDetailStore } from "@/store/modules/projectDetail";
import { FileUpdateVo } from "./dto/FileDto";
import { CreateDocumentDto,DeleteDocumentDto,UpdateCoumentDto } from "./dto/DocumentDto";
import {saveStatusAndRefresh} from '@/services/DocumentDirectoryService'
import { PiDocument, PiDocumentDirectory } from "@/types/Document";
import { PiFileDirectory } from "@/types/File";
/**
 * 
 * 创建文档
 * @param directory 
 * @returns 
 */
export async function createDocument(document:CreateDocumentDto): Promise<boolean> {
  const projectDetailStore = useProjectDetailStore();
  return new Promise<boolean>((resolve, reject) => {
    // 设置项目ID
    document.projectId = projectDetailStore.projectDetail.projectId;

    axios.post(API.PROJECT.DOCUMENT.CREATE,document).then(res => {
      console.log("createDocument",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        saveStatusAndRefresh();

        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[createDocument] `, err);
      reject(false);
    }).finally(() => {
     
    })
  });
}

/**
 * 
 * 更新文档
 * @param directory 
 * @returns 
 */
export async function updateDocument(document:UpdateCoumentDto): Promise<boolean> {
  const projectDetailStore = useProjectDetailStore();
  return new Promise<boolean>((resolve, reject) => {
    // 设置项目ID
    document.projectId = projectDetailStore.projectDetail.projectId;

    axios.put(API.PROJECT.DOCUMENT.UPDATE,document).then(res => {
      console.log("updateDocument",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        saveStatusAndRefresh();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[updateDocument] `, err);
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
export async function deleteDocument(document:DeleteDocumentDto): Promise<boolean> {
  const projectDetailStore = useProjectDetailStore();
  return new Promise<boolean>((resolve, reject) => {
    // 设置项目ID
    document.projectId = projectDetailStore.projectDetail.projectId;

    axios.delete(API.PROJECT.DOCUMENT.DELETE,{data:document}).then(res => {
      console.log("deleteDocument",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        saveStatusAndRefresh();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[deleteDocument] `, err);
      reject(false);
    }).finally(() => {
    })
  });
}

export const createDocumentFunc = (parent?:PiDocumentDirectory)=>{
  console.log(parent,'parent');
  ElMessageBox.prompt('请输入文档名', `你正在为文档目录[${parent?.documentDirectoryTitle}]创建文档`, {
    confirmButtonText: '编辑',
    cancelButtonText: '取消',
    inputPlaceholder:"请输入文档名",
    type:'warning',
    inputPattern:/^.{1,50}$/,
    inputValue:`未命名${new Date().getTime()}`,
    inputErrorMessage: '文档名在1~50之间的长度',
  })
    .then(({ value }) => {
      if(!value.trim()){
        ElMessage.error("禁止使用空串作为文档名");
        return;
      }
      const document:CreateDocumentDto= {
        documentTitle:value,
        directoryId:parent?.documentDirectoryId,
        projectId:parent?.projectId
      };
      createDocument(document)
      // 其实传进来的数据肯定是存在的，但个判断是为了不报错
    })

    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消创建',
      })
    })
}

export const deleteDocumentFunc = (parent?:PiDocument)=>{
  ElMessageBox.prompt('你正在执行危险操作,删除后数据找回需要到数据库内，请谨慎操作', `您正在删除名为[${parent?.documentTitle}]的文档名称`, {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type:'error',
    showInput:false
  })
    .then(() => {
      const document:DeleteDocumentDto= {
        documentId:parent?.documentId
      };
      deleteDocument(document)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}


export const updateDocumentFunc = (doc?:PiDocument)=>{
  const document:UpdateCoumentDto= {
    documentId:doc?.documentId,
    documentTitle:doc?.documentTitle,
    documentContent:doc?.documentContent
  };
  updateDocument(document)
}
