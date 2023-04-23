<script setup lang=ts>
import { ref,defineEmits ,defineProps,getCurrentInstance} from 'vue';
import { getHeadImage } from '@/utils/ProjectTool';
import {TodoDetail} from '@/types/Todo'

import TodoDetailView from './TodoDetail.vue';
import { emitChangeFn } from 'element-plus';

interface Props {
  detail:TodoDetail,
  disabled:boolean,
}

const props = defineProps<Props>();
const detailVisible = ref(false);

const emit = defineEmits(['update:disabled']);

function todoClick():void {
  // 打开任务面板
  detailVisible.value = true;

  // 关闭看板拖动事件
  emit('update:disabled',true);
  
  console.log("打开任务面板");
  console.log(getCurrentInstance());


}

function todoStatusChange(status:boolean):void{
  // 如果 true false 表示 取消和完成任务
  console.log(props.detail.missionTitle+" "+status);
}

/**
 * 关闭窗口
 */
function closeWin():void{
  detailVisible.value = false;

  // 打开看板拖动事件
  emit('update:disabled',false);
}
</script>

<template>
  <!-- 这里有一个双重的点击，有点负负得正的感觉，很久没有写Vue都没有什么思路了。 -->

  <!-- 

    draggable 设置 元素可拖放
   -->

    <el-card  @click="todoClick" class="todo"   >
      <div class="todo-detail-layout">
          <div>
            <div style="margin:auto 20px;">
              <el-checkbox  @click.stop @change="todoStatusChange" ></el-checkbox>
            </div>
            <div >
              <div>{{ props.detail.missionTitle }}</div>
              <p>结束时间: {{ props.detail.endTime }}</p>
            </div>
          </div>

          <div>
              <img class="head-image" :src="getHeadImage(props.detail.memberList[0].memberName)" alt="" style="width: 50px; height: 50px;">
          </div>
      </div>
    </el-card>

    <!-- 详情 弹窗 -->
  <el-dialog
      @closed="closeWin"
      v-model="detailVisible"
      width="50%"
    >
      <TodoDetailView @close="closeWin" :todo="detail"></TodoDetailView>
    </el-dialog>
</template>

<style scoped>

.todo {
  width: 380px;
  margin-bottom: 5px;
  cursor: pointer;
}

:deep() .el-card__body{
  padding: 5px;
}

.todo-detail-layout{
  display: flex;
  justify-content: space-between;
}
  

.todo-detail-layout :nth-child(1){
  display: flex;
}

.head-image {
  border-radius: 50%;
}


</style>