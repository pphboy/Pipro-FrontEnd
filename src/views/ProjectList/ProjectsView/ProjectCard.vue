<script setup lang="ts">
	import {Setting} from '@element-plus/icons-vue'
</script>

<template>
	<el-card class='project-card'>
		<div>
			<span class="project-card-title">项目名称</span>
		</div>
		<div class='detail-line'>
			<span style="float: left;">这里是介绍</span>
			<span style="float: right;">
				<el-icon><Setting /></el-icon>
			</span>
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
		/*display: flex;*/
		margin:  10px 0;
	}
	.project-card-title{
		margin: 10px 0;
		font-size: 20px;
	}
</style>