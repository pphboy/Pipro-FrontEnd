<script setup lang=ts>
 import { PiFileDirectory,PiFile } from "@/types/File";
import {defineProps,ref,reactive,computed,Ref} from "vue";

 interface FileItemListProps{
  fileDirectory:PiFileDirectory,
 }

 const props = defineProps<FileItemListProps>();
 

/**
 * file table
 */
const search = ref('')
const filterTableData = computed(() =>
  // props.directoryList.filter(
  //   (data) =>
  //   {
  //     !search.value || data.fileDirectoryTitle.toLowerCase().includes(search.value.toLowerCase());
  //   }
  // )
  {}
)
const handleEdit = (index: number, row: PiFile) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: PiFile) => {
  console.log(index, row)
}

</script>

<template>
      <el-table :data="fileDirectory.childDirectoryList" style="width: 100%" empty-text="本目录中没有文件夹">
          <el-table-column label="编号"  prop="fileDirectoryId" />
          <el-table-column  label="文件名" prop="fileDirectoryTitle" />
          <el-table-column  label="文件类型" >
            <template #default="scope">
              <div>
                文件夹
              </div>
            </template>
          </el-table-column>
          <el-table-column  label="操作"  align="center">
            <template #default="scope">
              <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)"
                >打开</el-button
              >
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >重命名</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <template #header>
            <el-input v-model="search" size="small" placeholder="搜索文件名" />
          </template>
      </el-table>
      <el-table :data="fileDirectory.fileList" :show-header="false" style="width: 100%" empty-text="本目录中没有文件">
          <el-table-column label="FileID" prop="fileId" />
          <el-table-column label="Filename" prop="filename" />
          <el-table-column  label="文件类型">
            <template #default="scope" >
              <div>
                文件
              </div>
            </template>
          </el-table-column>
          <el-table-column  align="center">
            <template #default="scope">
              <el-button type="primary"  size="small" @click="handleEdit(scope.$index, scope.row)"
                >下载</el-button
              >
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >重命名</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
</template>

<style scoped>


</style>