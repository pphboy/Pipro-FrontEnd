<script setup lang="ts">
import Header from '@/components/Header.vue';
import TaskList from './TaskList/TaskList.vue'
import ProjectsView from './ProjectsView/ProjectsView.vue'
import { useProjectListStore } from '@/store/modules/projectList';
import { getAllMissionList } from '@/services/ProjectListService';

const projectListStore = useProjectListStore();


getAllMissionList();
</script>

<template>
  <Header type="ProjectList"></Header>

  <div class="project-main">
    <div>
      <!-- 任务列表  -->
      <TaskList :project-mission-list="projectListStore.missionList"></TaskList>
    </div>
    <div>
      <!-- 项目列表 -->
      <div style="font-size:30px;padding:5px;">项目列表</div>
      <ProjectsView></ProjectsView>
      <!-- 幻灯片 -->
      <!-- <el-row>
        <el-col :span="24" >
          <el-carousel indicator-position="outside" height="100px">
            <el-carousel-item v-for="item in 4" :key="item" >
              <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row> -->

    </div>
  </div>
</template>

<style scoped>
.project-main {
  display: flex;

}

.project-main>div {
  margin: 5px;
}
</style>