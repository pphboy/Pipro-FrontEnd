<script setup lang="ts">
	import ProjectCard from './ProjectCard.vue'
	import {getProjectListByMemberId} from '@/services/ProjectListService';
	import { PiProject } from '@/types/Project';
	import {reactive} from 'vue'
	import { ElLoading } from 'element-plus';

	const pobject= reactive<{
		projectList: PiProject[]
	}>({
		projectList:[]
	})

	const loadingInstance = ElLoading.service({fullscreen:true});
	getProjectListByMemberId().then(res=>{
		console.log("data",res);
		pobject.projectList = res;
	}).catch(error=>{
		console.error("ProjectView ",error );
	}).finally(()=>{
		setTimeout(()=>{
			loadingInstance.close();
		},300)
	})
</script>

<template>
	<div class='projects-view'>
		<ProjectCard
		 	@click.native="$router.push({name:'ProjectDetail',params:{id:a.projectId}})" 
			v-for="(a,index) in pobject.projectList" :project="a" :key="index"></ProjectCard>
	</div>
</template>

<style scoped>
	.projects-view{
		border: 1px solid #ccc;
		border-radius: 3px;
		overflow-y: auto;
  		padding: 2px;
		height: 700px;
	}
</style>