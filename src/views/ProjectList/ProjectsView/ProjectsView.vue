<script setup lang="ts">
	import ProjectCard from './ProjectCard.vue'
	import {getProjectList} from '@/services/ProjectListService';
	import { PiProject } from '@/types/Project';
	import {reactive} from 'vue'
  import { useProjectListStore } from "@/store/modules/projectList";

	const projectListStore = useProjectListStore();

	getProjectList().then(res=>{
		console.log("data",res);
	}).catch(error=>{
		console.error("ProjectView ",error );
	})
	</script>

<template>
	<div class='projects-view'>
		<ProjectCard
		 	@click.native="$router.push({name:'ProjectDetail',params:{id:a.projectId}})" 
			v-for="(a,index) in projectListStore.projectList" :project="a" :key="index"></ProjectCard>
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