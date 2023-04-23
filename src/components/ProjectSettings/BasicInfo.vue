<script setup lang=ts>
 import {ref,reactive,Ref} from "vue";
 import {PiProject} from '@/types/Project';
 import { useProjectDetailStore } from "@/store/modules/projectDetail";
 import {FormInstance,FormRules,ElNotification} from 'element-plus';
import { updateProject } from '@/services/ProjectListService';

 const projectDetailStore = useProjectDetailStore();

 const projectDetail = reactive(projectDetailStore.projectDetail);

const formRef = ref(undefined);

const formRules = reactive<FormRules>({
  projectName: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 1, max: 30, message: '项目名称长度在1~30之间', trigger: 'blur' },
  ],
  projectIntro:  [
    { required: true, message: '请输入项目描述', trigger: 'blur' },
    { min: 6, max: 240, message: '项目描述的长度在6~240之间', trigger: 'blur' },
  ]
})

const createSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateProject(projectDetail).then(res=>{
        console.log("createSubmit",res);
        if(res){
          ElNotification({
            message:"编辑成功",
            type:'success'
          })
        }
      }).catch(err=>{

      });
    } else {
      // console.log('error submit!', fields)
    }
  })
}


</script>

<template>


  <el-form :rules="formRules" ref="formRef" :model="projectDetail" style="width:400px;">
    <el-form-item label="项目名称" prop="projectName">
      <el-input v-model="projectDetail.projectName"></el-input>
    </el-form-item>
    <el-form-item label="项目介绍" prop="projectIntro">
      <el-input type="textarea" :maxlength="200" :rows="6" resize="none" v-model="projectDetail.projectIntro"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="createSubmit(formRef)">保存</el-button>
    </el-form-item>
  </el-form>

</template>

<style scoped>

</style>