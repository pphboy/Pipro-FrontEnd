<script setup lang="ts">
	import {Setting} from '@element-plus/icons-vue'
	import { defineProps ,withDefaults } from 'vue'
	import {PiProject} from '@/types/Project'
	
	interface ProjectCardProps{
		project:PiProject
	}

	withDefaults(defineProps<ProjectCardProps>(),{
		project:():PiProject=>({
			projectName: "这是项目名称",
			projectIntro:"这是项目介绍",
		} as PiProject)
	} )

</script>

<template>
	<el-card class='project-card'>
		<div class='detail-line'>
			<div>
				<div class="project-card-title">{{ project.projectName }}</div>
				<div>{{ project.projectIntro.length > 30 ? `${project.projectIntro.substring(0,30)}...`:project.projectIntro }}</div>
			</div>
			<div >
				<el-dropdown class="menu-btn">
					<el-button style="border: 0;padding:10px;">
						<el-icon><Setting /></el-icon>
					</el-button>

					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>进入项目</el-dropdown-item>
							<el-dropdown-item>项目介绍</el-dropdown-item>
							
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
			<div style="clear: both;"></div>
		</div>
	</el-card>
</template>

<style scoped>
	:deep() .el-card__body{
		margin:  0;
		padding:  5px;
	}
	.project-card{
		width:  335px;
		padding: 0 8px;
		display: inline-block;
		margin: 5px;
	}
	.detail-line {
		width: 335px;
		display: flex;
		justify-content: space-between;
	}
	.detail-line>div:nth-child(1){
		width: 320px;
	}
	.project-card-title{
		margin: 10px 0;
		font-size: 20px;
	}
</style>