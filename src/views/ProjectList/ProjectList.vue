<script setup lang="ts">
import Header from '@/components/Header.vue';
import TaskList from './TaskList/TaskList.vue'
import ProjectsView from './ProjectsView/ProjectsView.vue'


</script>

<template>
  <Header type="ProjectList"></Header>

  <div class="project-main" >
      <div>
        <h3>我的任务</h3>
        <!-- 任务列表  -->
        <TaskList></TaskList>
      </div>
      <div>
        <h3>参与项目</h3>
        <!-- 项目列表 -->
        <ProjectsView></ProjectsView>
        
      </div>
  </div>

</template>

<style scoped>

  .project-main{
    display: flex;
    
  }
  .project-main > div {
    margin: 5px;
  }

</style>