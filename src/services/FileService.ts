import { API } from "@/types/API";
import axios from '@/utils/axios';
import {ElMessageBox, ElLoading, ElMessage} from 'element-plus';

import { useFileDirectoryStore } from "@/store/modules/fileDirectory";
import { useProjectDetailStore } from "@/store/modules/projectDetail";
import { saveStatusAndRefresh } from "./FileDirectoryService";
import { FileUpdateVo } from "./dto/FileDto";
import { PiFile } from "@/types/File";

/**
 * 
 * 文件重命名
 * @param directory 
 * @returns 
 */
export async function renameFile(file: FileUpdateVo): Promise<boolean> {
  const projectDetailStore = useProjectDetailStore();
  return new Promise<boolean>((resolve, reject) => {
    // 设置项目ID
    file.projectId = projectDetailStore.projectDetail.projectId;

    axios.post(API.PROJECT.FILE.RENAME,file).then(res => {
      console.log("renameFile",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)

        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[renameFile] `, err);
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
export async function deleteFile(file:FileUpdateVo): Promise<boolean> {
  const projectDetailStore = useProjectDetailStore();
  return new Promise<boolean>((resolve, reject) => {
    // 设置项目ID
    file.projectId = projectDetailStore.projectDetail.projectId;

    axios.delete(API.PROJECT.FILE.DELETE,{data:file}).then(res => {
      console.log("deleteFile",res);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        saveStatusAndRefresh();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[deleteFile] `, err);
      reject(false);
    }).finally(() => {
    })
  });
}

export const renameFileFunc = (parent?:PiFile)=>{
  console.log(parent,'parent');
  ElMessageBox.prompt('请输入文件名', `您正在修改名为[${parent?.filename}]的文件名称`, {
    confirmButtonText: '编辑',
    cancelButtonText: '取消',
    inputPlaceholder:"请输入文件名",
    type:'warning',
    inputPattern:/^.{1,50}$/,
    inputValue:parent?.filename,
    inputErrorMessage: '文件名在1~50之间的长度',
  })
    .then(({ value }) => {
      if(!value.trim()){
        ElMessage.error("禁止使用空串作为文件名");
        return;
      }
      const file:FileUpdateVo= {
        filename:value,
        fileId:parent?.fileId
      };
      renameFile(file)
      // 其实传进来的数据肯定是存在的，但个判断是为了不报错
      if( parent && parent.filename){
        parent.filename=value
      }
    })

    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消编辑',
      })
    })
}

export const deleteFileFunc = (parent?:PiFile)=>{
  ElMessageBox.prompt('你正在执行危险操作,删除后数据找回需要到数据库内，请谨慎操作', `您正在删除名为[${parent?.filename}]的文件名称`, {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type:'error',
    showInput:false
  })
    .then(({ value }) => {
      const file:FileUpdateVo= {
        fileId:parent?.fileId,
      };
      deleteFile(file)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

export function downloadFile(url:string, filename:string) {
  axios({
    url: url,
    method: 'GET',
    responseType: 'blob', // 以二进制流的形式请求数据
  }).then(response => {
    // 创建一个 <a> 标签，设置 URL 和新文件名，并模拟点击下载
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([response.data]));
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}