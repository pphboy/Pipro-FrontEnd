<script setup lang="ts">
	import ProjectCard from './ProjectCard.vue'
</script>

<template>
	<div class='projects-view'>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
		<ProjectCard @click.native="$router.push({name:'ProjectDetail'})"></ProjectCard>
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