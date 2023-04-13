<script setup lang=ts>
import { checkboxEmits } from 'element-plus';
import { ref,defineEmits } from 'vue';


const checked = ref(false)

function globalClick():void {
  checked.value =!checked.value;
}
</script>

<template>
  <!-- 这里有一个双重的点击，有点负负得正的感觉，很久没有写Vue都没有什么思路了。 -->

  <el-card @click="globalClick" class="todo" shadow="false">
    <div class="todo-detail-layout">
        <div style="margin:auto 20px;">
          <el-checkbox @change="globalClick" v-model="checked"></el-checkbox>
        </div>
        <div >
          <div>今日任务</div>
          <p>所属项目: ABC  创建时间: 2023年04月12日</p>
        </div>
    </div>
  </el-card>

</template>

<style scoped>

.todo {
  width: 380px;
  margin-bottom: 5px;
}
:deep() .el-card__body{
  padding: 5px;
}

.todo-detail-layout{
  display: flex;
}

</style>