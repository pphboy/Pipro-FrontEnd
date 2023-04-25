import { API } from "@/types/API";
import axios from '@/utils/axios';
import { ElLoading, ElMessage} from 'element-plus';

import {refreshProject } from "./ProjectDetailService";
import { KanbanCreateVo, KanbanUpdateVo } from "./dto/KanbanVo";

// 看板改名不需要刷新全局

/**
 * 创建看板
 * @param kanban 看板界面详情
 * @returns 
 */
export async function createKanban(kanban:KanbanCreateVo): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.put(API.PROJECT.KANBAN.CREATE,kanban).then(res => {
      console.log("createKanban",kanban);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        refreshProject();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[createKanban] `, err);
      reject(false);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}

/**
 * 删除看板
 * @param kanbanId 看板的ID
 * @returns 
 */
export async function deleteKanban(kanbanId: number): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const loadingInstance = ElLoading.service({ fullscreen: true });
    axios.delete(`${API.PROJECT.KANBAN.DELETE}${kanbanId}`).then(res => {
      console.log("deleteKanban",kanbanId);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 更新整个项目
        refreshProject();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[deleteKanban] `, err);
      reject(false);
    }).finally(() => {
      setTimeout(() => {
        loadingInstance.close();
      }, 300)
    })
  });
}

/**
 * 看板改名
 * @param kanban 看板的对象
 * @returns 
 */
export async function updateKanban(kanban:KanbanUpdateVo): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios.post(API.PROJECT.KANBAN.DELETE,kanban).then(res => {
      console.log("updateKanban",kanban);
      if (res.data.status) {
        ElMessage.success(res.data.message)
        // 无需更新整个项目
        // refreshProject();
        resolve(true)
      }else 
        reject(false);
    }).catch((err) => {
      console.log(`[updateKanban] `, err);
      reject(false);
    }).finally(() => {
      console.log("放个屁 ~~~ 噗噗噗噗");
    })
  });
}