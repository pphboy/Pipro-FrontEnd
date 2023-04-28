<script setup lang=ts>
import { defineProps, ref, reactive, computed, Ref, onMounted } from "vue";
import { useProjectDetailStore } from "@/store/modules/projectDetail";
import { useDocumentDirectoryStore } from '@/store/modules/documenDirectory';
import { ElMessageBox, UploadProps, ElMessage, UploadFile, ElNotification } from "element-plus";
import { useGlobalStore } from "@/store/modules/global";
import { saveStatusAndRefresh, renameDirectoryFunc, deleteDirectory, deleteDirectoryFunc } from "@/services/DocumentDirectoryService";

import { createDocumentFunc, updateDocumentFunc, deleteDocumentFunc } from '@/services/DocumentService'
import { DirectoryDto } from "@/services/dto/FileDirectoryDto";
import { PiDocumentDirectory, PiDocument } from "@/types/Document";

const documentDirectoryStore = useDocumentDirectoryStore();
const projectDetailStore = useProjectDetailStore();
const globalStore = useGlobalStore();

const editDocumentVisible = ref(false);

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
const handleOpenDirectory = (index: number, row: PiDocumentDirectory) => {
  documentDirectoryStore.setDetail(row);
}

const setBack = () => {
  documentDirectoryStore.setBack();
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

const edditingDocument = ref<PiDocument>({});

const showDocument = (document: PiDocument) => {
  editDocumentVisible.value = true;
  edditingDocument.value = document;
  if (!document.documentContent) {
    edditingDocument.value.documentContent = ''
  }
  console.log(document, 'document');
}

const saveDocument = () => {
  if (edditingDocument.value.documentTitle && edditingDocument.value.documentTitle.length > 1) {
    updateDocumentFunc(edditingDocument.value)
  } else {
    ElMessage.warning("文档标题至少为一个字符")
  }
}

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {  // 检查是否按下了 Ctrl + S
      e.preventDefault();  // 阻止默认行为（保存网页）
      console.log(editDocumentVisible.value);
      if (editDocumentVisible.value) {
        saveDocument();
      }
    }
  });
});
const closeSave = (done:Function)=>{
  saveDocument()
  done();
}


</script>

<template>
  <div class="class-flex">
    <el-button @click="documentDirectoryStore.setIndex()">首页</el-button>
    <div class="class-flex" v-if="documentDirectoryStore.copy">
      <div>&emsp;</div>
      <el-button title="返回到上一个过来的路径" @click="setBack">返回</el-button>
      <div>&emsp;</div>
      <el-button @click="createDocumentFunc(documentDirectoryStore.directoryDetail)" type="primary">新建文档</el-button>
    </div>

  </div>
  <el-table :data="documentDirectoryStore.directoryDetail.childDirectoryList" style="width: 100%" empty-text="本目录中没有文档夹">
    <el-table-column label="编号" prop="documentDirectoryId" />
    <el-table-column label="文档名" prop="documentDirectoryTitle" />
    <el-table-column label="文件类型">
      <template #default="scope">
        <div>
          文档夹
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
      <el-input v-model="search" size="small" placeholder="搜索文档名" />
    </template>
  </el-table>
  <el-table :data="documentDirectoryStore.directoryDetail.documentList" :show-header="false" style="width: 100%"
    empty-text="本目录中没有文档">
    <el-table-column label="文档编号" prop="documentId" />
    <el-table-column label="文档标题" prop="documentTitle" />
    <el-table-column label="文件类型">
      <template #default="scope">
        <div>
          文档
        </div>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" prop="createTime"></el-table-column>
    <el-table-column label="更新时间" prop="updateTime"></el-table-column>
    <el-table-column align="center">
      <template #default="scope">
        <el-button type="primary" size="small" @click="showDocument(scope.row)">查看</el-button>
        <el-button size="small" type="danger" @click="deleteDocumentFunc(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog :before-close="closeSave" @keydown.native.ctrl.83.prevent="alert(1)" v-model="editDocumentVisible" width="70%"
    :title="`文档:${edditingDocument.documentTitle}`">
    <el-form>
      <el-form-item label="文档标题">
        <el-input v-model.trim="edditingDocument.documentTitle" placeholder="请输入文档标题" />
      </el-form-item>
      <el-form-item>
        <v-md-editor v-model="edditingDocument.documentContent" height="calc(60vh)"></v-md-editor>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveDocument" size="small" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
.class-flex {
  display: flex;
}
</style>