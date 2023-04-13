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
				<el-dropdown class="menu-btn">
					<el-button style="border: 0;padding:10px;">
						<el-icon><Setting /></el-icon>
					</el-button>

					<span class="el-dropdown-link">
						Dropdown List
						<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>进入项目</el-dropdown-item>
							<el-dropdown-item>项目介绍</el-dropdown-item>
							
						</el-dropdown-menu>
					</template>
				</el-dropdown>
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