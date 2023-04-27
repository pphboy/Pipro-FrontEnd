<script setup lang=ts>

import { ref, reactive, watch, computed } from "vue";
import { ElTree,ElMessageBox,ElMessage, TreeNode } from 'element-plus'
import { FilterNodeMethodFunction, FilterValue } from "element-plus/es/components/tree/src/tree.type";
import { TreeNodeData } from "element-plus/es/components/tree-v2/src/types";
import { PiFile, PiFileDirectory } from '@/types/File';
import FileItemList from '@/components/FileList/FileItemList.vue'
import { useFileDirectoryStore } from "@/store/modules/fileDirectory";
import { DirectoryDto } from "@/services/dto/FileDirectoryDto";
import { createDirectoryFunc,renameDirectoryFunc,deleteDirectoryFunc,getProjectAllFileDirectory} from "@/services/FileDirectoryService";

import {Setting} from '@element-plus/icons-vue'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
const fileDirectoryStore = useFileDirectoryStore();
// 请求文件
getProjectAllFileDirectory();

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  label: 'fileDirectoryTitle',
  children: 'childDirectoryList',
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

/**
 *  下面这个格式是代码定义的，不这样写就报错，我就这样写了
 */
const filterNode: FilterNodeMethodFunction = (value: FilterValue, data: TreeNodeData): boolean => {
  if (!value) return true
  return data.label.includes(value)
}


const nodeClick = function (obj: PiFileDirectory): void {
  console.log("no child，请求文件列表", obj);
  fileDirectoryStore.setDetail( obj)
};

const openRightMenu = function (obj: Object, data: TreeNode, node: TreeNode): void {
  console.log("openRightMenu", obj, "\ndata", data, "\nnode", node);
}


</script>
<template>
  <div class="file-list">
    <div class="side">
      <div class="filelist-title">
        <div >文件夹列表</div>
        <div>
          <el-dropdown>
            <el-button :icon="Setting" class="filelist-title-btn"></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="createDirectoryFunc">新建根目录</el-dropdown-item>
                <el-dropdown-item @click="getProjectAllFileDirectory">刷新目录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <el-input v-model="filterText" placeholder="Filter keyword" />
      <el-tree empty-text="本项目还没有文件夹，点击上方设置按钮新建吧" ref="treeRef" class="filter-tree" :data="fileDirectoryStore.directoryList" :props="defaultProps"
        default-expand-all @node-click="nodeClick" :filter-node-method="filterNode">
        <template #default="{ node, data }">
          <el-dropdown trigger="contextmenu">
            <!-- 如果不设置这个最小宽度，点击item是没有反应的，必须要点字，设置后可直接点击item可触发 -->
            <span class="el-dropdown-link" style="min-width:230px;">
              <span class="custom-tree-node">
                <span> {{ data.fileDirectoryTitle }}</span>
              </span>

            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="createDirectoryFunc(data)">新建文件夹</el-dropdown-item>
                <el-dropdown-item @click="renameDirectoryFunc(data)">重命名</el-dropdown-item>
                <el-dropdown-item @click="deleteDirectoryFunc(data)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-tree>

    </div>
    <div class="list-main">
      <FileItemList :file-directory="fileDirectoryStore.directoryDetail"></FileItemList>
    </div>
  </div>
</template>

<style scoped>
.file-list {
  margin-top: 10px;
  display: flex;
  height: calc(90%);
}

.file-list>div {
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.12);
  padding: 5px;
}

.side {
  overflow-x: auto;
  width: 250px;
}

.list-main {
  overflow-y: auto;
  width: calc(100% - 360px);
  min-height: 800px;
}

.filter-tree {
  min-width: 100px;
}

.filelist-title {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filelist-title-btn{
  padding:10px;border:0;
}
</style>