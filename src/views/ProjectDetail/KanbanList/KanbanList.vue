<script setup lang=ts>

import {MoreFilled} from '@element-plus/icons-vue'
import Todo from './Todo.vue';
import {TodoDetail} from '@/types/Todo'
import { ref,reactive,defineEmits ,defineProps,withDefaults} from 'vue';
import {KanbanDetail} from '@/types/KanbanList';
import draggable from 'vuedraggable'

import Test from './Test.vue';

const todoList:Array<TodoDetail> = reactive([
 {isfold:false,id:1,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
 {isfold:false,id:2,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
 {isfold:false,id:31,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
 {isfold:false,id:3,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
 {isfold:false,id:4,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
 {isfold:false,id:6,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
 {isfold:false,id:7,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
 {isfold:false,id:8,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
 {isfold:false,id:9,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
 {isfold:false,id:10,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
 {isfold:false,id:11,taskName:"任务$1",endTime:"2023-04-14",memberName:"Mark"}, 
])


interface KanbanProps 
{
  kanban: KanbanDetail
}

const props = defineProps<KanbanProps>();


function addTodo(obj:Object):void {
  console.log(obj.oldIndex+" "+obj.newIndex,"addTOdo");
}

</script>

<template>

  <div class="taskview">
    <div class="taskhead" >
      <div>
        {{ props.kanban.listName }}
      </div>
      <div>
				<el-dropdown class="menu-btn">
					<el-button style="border: 0;padding:10px;">
            <el-icon><MoreFilled /></el-icon>
					</el-button>

					<span class="el-dropdown-link">
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
    <!-- <div class="tasklist">
        <Todo draggable="true" v-for="(todo,id) in todoList" :key=id :detail='todo' ></Todo>
      :options="{ group: 'images'   }"
    </div> -->

    <draggable 
      :list="todoList" class="tasklist"
      @add="addTodo"
      :forceFallback="true"
      ghost-class="chosen" 
      :group="props.kanban.listName"
      :options="{}"
      :animation="300"
      item-key="id"
      >

      <template #item="{element}">
        <div>
          <Todo :detail="element"></Todo>
        </div>
      </template>
    </draggable>

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
  /* border: 1px solid #ccc;
  border-radius: 4px; */
  }

  .taskhead {
    width: 400px;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
  }

  .menu-btn {
    margin-right: 17px;
  }

  .taskhead :nth-child(2){
  }

  .chosen{ 
    border: 1px solid black;
    background-color: #eee;
          opacity: 1;
          border: solid 1px red;
   }
   .ghost{
    border: solid 1px rgb(19, 41, 239) !important;

   }


</style>