<script setup lang=ts>
 import {ref,reactive,Ref} from "vue";
 import { Timer } from '@element-plus/icons-vue'
 import { ElMessage, ElMessageBox } from 'element-plus'
 import {PiLabel} from '@/types/Project';


const editPiLabel:Ref<PiLabel> = ref({
  labelColor:"primary",
  labelName:"这是标签名",
} as PiLabel);

const handleEdit = (index: number, row: PiLabel) => {
  // 设置全局的 编辑器
  // editPiLabel.value =  row;
}
const handleDelete = (index: number, row:PiLabel) => {
  console.log(index, row)
}

const labelList:Ref<PiLabel[]> = ref([
  editPiLabel.value
]as PiLabel[]);


const label = ref("");

/**
 * 清除编辑对象的数据
 */
const clear = function():void {

}
</script>

<template>

<el-row>
  <el-col :span="12">
    <el-row>
      <el-col>
        <el-form>
          <el-form-item label="标签名">
            <!-- 小代码，写行内也没关系吧，没关系吧 -->
            <el-input v-model="editPiLabel.labelName" style="width:130px;margin-right: 10px;"  maxlength="10" placeholder="请输入标签名"></el-input>
            <el-select v-model="editPiLabel.labelColor" style="width:130px;margin-right: 10px;" placeholder="请选择标签类型">
              <el-option
                v-for="(item,i) in ['info','primary','success','danger','warning']"
                :key="i"
                :label="item"
                :value="item"
              >
                <el-tag :type="item">{{ item }}</el-tag>
              </el-option>
            </el-select>
            <el-button>添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="labelList" style="width: 100%">
          <el-table-column label="标签名" prop="labelName" width="180">
          </el-table-column>
          <el-table-column label="标签类型" width="180">
            <template #default="scope">
              <el-popover effect="light" trigger="hover" placement="top" width="auto">
                <template #reference>
                  <el-tag :type="scope.row.labelColor">{{ scope.row.labelColor }}</el-tag>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <!-- 这个重命名，我要用最简单，最快的方法写 -->
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
      </el-col>
    </el-row>

  </el-col>
</el-row>

<!-- 突然想到直接把 对象 赋给 上面的form就行了，根本不需要什么弹出框 -->
<!-- 
<el-dialog
    v-model="labelDialogVisible"
    title="Tips"
    width="30%"
  >
  </el-dialog> -->
</template>

<style scoped>


</style>