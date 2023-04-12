<script setup lang="ts">
import Header from './Header.vue';
import TaskList from './TaskList/TaskList.vue'


</script>

<template>
  <Header></Header>

  <el-row class="project-main" :gutter="10">
    <el-col :span="8" :offset="1">
      <h3>我的任务</h3>
      <!-- 任务列表  -->
      <TaskList></TaskList>
    </el-col>
    <el-col :span="6" >
      <h3>参与项目</h3>
      <!-- 项目列表 -->
      <div>

      </div>
      
      <el-card>
        list
      </el-card>
    </el-col>
  </el-row>

</template>

<style scoped>


</style>