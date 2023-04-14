<script setup lang=ts>
import { ref,defineEmits ,defineProps,withDefaults} from 'vue';
import { getHeadImage } from '@/utils/ProjectTool';
import {TodoDetail} from '../../../types/Todo'

interface Props {
  detail:TodoDetail,
}

const props = defineProps<Props>();

// Todo 框选中的状态
const checked = ref(false)

function globalClick():void {
  checked.value =!checked.value;
}


</script>

<template>
  <!-- 这里有一个双重的点击，有点负负得正的感觉，很久没有写Vue都没有什么思路了。 -->

  <!-- 

    draggable 设置 元素可拖放
   -->

    <el-card  @click="globalClick" class="todo"   >
      <div class="todo-detail-layout">
          <div>
            <div style="margin:auto 20px;">
              <el-checkbox @change="globalClick" v-model="checked"></el-checkbox>
            </div>
            <div >
              <div>{{ props.detail.taskName+props.detail.id }}</div>
              <p>结束时间: {{ props.detail.endTime }}</p>
            </div>
          </div>

          <div>
              <img class="head-image" :src="getHeadImage(props.detail.memberName+props.detail.id)" alt="" style="width: 50px; height: 50px;">
          </div>
      </div>
    </el-card>

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