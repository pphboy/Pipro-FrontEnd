<script setup lang=ts>
 import {ref,reactive,Ref} from "vue";
 import {Project} from '@/types/Project';

  const project:Ref<Project> = ref({
    projectId:1,
    projectName:"项目名称",
    projectIntro:"项目介绍",
    createTime:"2023年04月15日",
  } as Project);
</script>

<template>


  <el-form style="width:400px;">
    <el-form-item label="项目名称">
      <el-input v-model="project.projectName"></el-input>
    </el-form-item>
    <el-form-item label="项目介绍">
      <el-input type="textarea" :rows="6" resize="none" v-model="project.projectIntro"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary">保存</el-button>
    </el-form-item>
  </el-form>

</template>

<style scoped>


</style>