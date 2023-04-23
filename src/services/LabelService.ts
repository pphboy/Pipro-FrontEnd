import { API } from "@/types/API";
import axios from '@/utils/axios';
import { PiProject,PiLabel } from '@/types/Project'
import { ElLoading, ElMessage, ElNotification } from 'element-plus';

import { getProjectDetail } from "./ProjectDetailService";

/**
 * 创建标签
 * @param label 
 * @returns 
 */
export async function createLabel(label:PiLabel): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.post(API.PROJECT.LABEL.CREATE,label).then(res => {

      console.log("createLabel",label);

      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        getProjectDetail(label.projectId);
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[createLabel ] `, err);
      reject(false);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}

/**
 *  根据ID删除标签
 * @param label 
 * @returns 
 */
export async function deleteLabelById(label: PiLabel): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    // 这个下面是需要给一个默认值
    axios.delete(API.PROJECT.LABEL.DETELE(label.labelId || -1)).then(res => {

      console.log("deleteLabelById", res);

      if (res.data.status) {
        // 更新整个项目
        ElMessage({
          message:`标签 [${label.labelName}] 删除成功`,
          type:"success"
        })
        getProjectDetail(label.projectId);
        resolve(true)
      }else 
        reject(false)
    }).catch((err) => {
      console.log(`[deleteLabelById] `, err);
      reject(false);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}