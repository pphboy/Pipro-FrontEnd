<script setup lang=ts>

import {MoreFilled,Plus} from '@element-plus/icons-vue'
import Todo from './Todo.vue';
import {TodoDetail} from '@/types/Todo'
import {KanbanDetail} from '@/types/KanbanList';
import { ref,reactive,defineEmits ,defineProps,withDefaults} from 'vue';
import draggable from 'vuedraggable'
import TodoDetailView from './TodoDetail.vue';


interface KanbanProps 
{
  kanban: KanbanDetail
}

const props = defineProps<KanbanProps>();
const kanbanDisabled= ref<boolean>(false);

const missionVisible = ref(false);

const missionDetail = ref<TodoDetail>({
  missionTitle:""
});

/**
 * 关闭窗口
 */
function closeWin(): void {
  missionVisible.value = false;

  // 打开看板拖动事件
}

function addTodo(obj:Object):void {
  if('oldIndex' in obj && 'newIndex' in obj){
    const {oldIndex,newIndex} = obj;
    console.log(oldIndex+" "+newIndex,"addTOdo");
  }
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
          <el-button  style="border: 0;padding:10px;">
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
    <div >
      <el-button @click="missionVisible = true;" class="add-btn">
        <el-icon><Plus /></el-icon>
      </el-button>
    </div>
    <!-- <div class="tasklist">
        <Todo draggable="true" v-for="(todo,id) in todoList" :key=id :detail='todo' ></Todo>
      :options="{ group: 'images'   }"
    </div> -->

    <draggable 
      :list="kanban.missionList" class="tasklist"
      @add="addTodo"
      :forceFallback="true"
      ghost-class="chosen" 
      :group="'project'"
      :options="{}"
      :animation="300"
      :disabled="kanbanDisabled"
      item-key="id"
      >

      <template #item="{element}">
        <div>
          <Todo ref="todo" v-model:disabled="kanbanDisabled" :detail="element"></Todo>
        </div>
      </template>
    </draggable>

    <!-- 详情 弹窗 -->
    <el-dialog @closed="closeWin" v-model="missionVisible" width="50%">
      <TodoDetailView :kanban-list-id="kanban.kanbanListId" @close="closeWin" :todo="missionDetail"></TodoDetailView>
    </el-dialog>
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

   .add-btn {
    width: 386px;
    margin-bottom: 5px;
   }


</style>