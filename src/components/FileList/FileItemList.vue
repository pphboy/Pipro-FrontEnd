<script setup lang=ts>
import { PiFileDirectory, PiFile } from "@/types/File";
import { defineProps, ref, reactive, computed, Ref } from "vue";
import { useFileDirectoryStore } from "@/store/modules/fileDirectory";
import { useProjectDetailStore } from "@/store/modules/projectDetail";
import { ElMessageBox,UploadProps, ElMessage, UploadFile, ElNotification } from "element-plus";
import { useGlobalStore } from "@/store/modules/global";
import {  saveStatusAndRefresh,renameDirectoryFunc, deleteDirectory, deleteDirectoryFunc } from "@/services/FileDirectoryService";
import { renameFileFunc,deleteFileFunc,downloadFile} from '@/services/FileService'
import { DirectoryDto } from "@/services/dto/FileDirectoryDto";

interface FileItemListProps {
  fileDirectory: PiFileDirectory,
}
const fileDirectoryStore = useFileDirectoryStore();
const projectDetailStore = useProjectDetailStore();
const globalStore = useGlobalStore();

const props = defineProps<FileItemListProps>();

const copyDirectory = ref<PiFileDirectory>();

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
{ }
)
const handleOpenDirectory = (index: number, row: PiFileDirectory) => {
  fileDirectoryStore.setDetail(row);
}

const setBack = () => {
  fileDirectoryStore.setBack();
}

const uploadSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile) => {
  if ("status" in response && "message" in response) {
    const { status, message } = response;
    console.log(response, uploadFile)
    if (status) {
      saveStatusAndRefresh();
      ElMessage.success(message)
    } else {
      ElMessage.error(message)
    }
  }
}
const uploadError: UploadProps['onError'] = (error: any) => {
  ElNotification.error("上传失败，请检查文件大小，文件大小不可超过100MB")
}

</script>

<template>
  <div class="class-flex">
    <el-button @click="fileDirectoryStore.setIndex()">首页</el-button>
    <div class="class-flex" v-if="fileDirectoryStore.copy">
      <div>&emsp;</div>
      <el-button title="返回到上一个过来的路径" @click="setBack">返回</el-button>
      <div>&emsp;</div>
      <el-upload class="upload-demo"
        :action="`/api/project/file/project/${projectDetailStore.projectDetail.projectId}/${fileDirectoryStore.directoryDetail.fileDirectoryId}`"
        :headers="{
            'Authorization': globalStore.token
          }" :on-error="uploadError" :on-success="uploadSuccess">
        <el-button type="primary">上传文件</el-button>
      </el-upload>
    </div>

  </div>
  <el-table :data="fileDirectory.childDirectoryList" style="width: 100%" empty-text="本目录中没有文件夹">
    <el-table-column label="编号" prop="fileDirectoryId" />
    <el-table-column label="文件名" prop="fileDirectoryTitle" />
    <el-table-column label="文件类型">
      <template #default="scope">
        <div>
          文件夹
        </div>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" prop="createTime"></el-table-column>
    <el-table-column label="更新时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button size="small" type="success" @click="handleOpenDirectory(scope.$index, scope.row)">打开</el-button>
        <el-button size="small" @click="renameDirectoryFunc(scope.row)">重命名</el-button>
        <el-button size="small" type="danger" @click="deleteDirectoryFunc(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    <template #header>
      <el-input v-model="search" size="small" placeholder="搜索文件名" />
    </template>
  </el-table>
  <el-table :data="fileDirectory.fileList" :show-header="false" style="width: 100%" empty-text="本目录中没有文件">
    <el-table-column label="FileID" prop="fileId" />
    <el-table-column label="Filename" prop="filename" />
    <el-table-column label="文件类型">
      <template #default="scope">
        <div>
          文件
        </div>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" prop="createTime"></el-table-column>
    <el-table-column label="更新时间" prop="updateTime"></el-table-column>
    <el-table-column align="center">
      <template #default="scope">
        <el-button type="primary" size="small" @click="downloadFile(`/file${scope.row.filePath}`,scope.row.filename)">下载</el-button>
        <el-button size="small" @click="renameFileFunc(scope.row)">重命名</el-button>
        <el-button size="small" type="danger" @click="deleteFileFunc(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

.class-flex{
  display: flex;
}
</style>