<script setup lang=ts>

import {MoreFilled} from '@element-plus/icons-vue'

import Todo from './Todo.vue';

</script>

<template>

  <div class="taskview">
    <div class="taskhead" >
      <div>
        TableListName
      </div>
      <div>
				<el-dropdown class="menu-btn">
					<el-button style="border: 0;padding:10px;">
            <el-icon><MoreFilled /></el-icon>
					</el-button>

					<span class="el-dropdown-link">
						Dropdown List
						<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>改名</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
      </div>
    </div>
    <div class="tasklist">
      <Todo></Todo>
    </div>
  </div>

</template>

<style scoped>

.taskview{
  display: inline-block;
  margin: 10px 10px;
  width: 400px;
  /* min-height: 700px; */
  /* 因为Header也有个高度 */

}

.tasklist{ 
  width: 400px;
  padding: 2px;
  height: calc(80vh);
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #ccc;
  border-radius: 4px;
  }

  .taskhead {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
  }

  .taskhead :nth-child(2){
  }

</style>