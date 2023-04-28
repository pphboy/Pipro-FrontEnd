<script setup lang=ts>

import {MoreFilled,Plus} from '@element-plus/icons-vue'
import Todo from './Todo.vue';
import {TodoDetail} from '@/types/Todo'
import {KanbanDetail} from '@/types/KanbanList';
import { ref,reactive,watch,defineEmits,watchEffect ,defineProps,withDefaults} from 'vue';
import draggable from 'vuedraggable'
import TodoDetailView from './TodoDetail.vue';
import { Obj } from '@popperjs/core';
import {updateMission} from '@/services/MissionService'
import { KanbanChangeVo, KanbanUpdateVo} from '@/services/dto/KanbanVo';
import { checkboxGroupContextKey, ElMessage } from 'element-plus';
import { updateKanban as updKanban } from '@/services/KanbanService';


interface KanbanProps 
{
  kanban: KanbanDetail,
}
const pp = defineProps<KanbanProps>()

const kanban =reactive<KanbanDetail>(pp.kanban);

// 通过这个监听器实时刷新 本页面 重新创建的kanban reactive 
watch(()=>pp.kanban,()=>{
  console.log("大看板更新");
  kanban.listName =      pp.kanban.listName
  kanban.kanbanListId =  pp.kanban.kanbanListId
  kanban.missionList=    pp.kanban.missionList
})


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

// watch(kanban,(newV,oldV)=>{
watch(kanban,(newV,oldV)=>{
  console.log("小看板更新");
  const array = kanban.missionList?.filter(a=>a.kanbanListId!=kanban.kanbanListId)
  // 只修改当前看板 有 不一样的KanbanID的值
  if(array?.length){
    const {missionId} = array[0];
    const kanbanView: KanbanChangeVo = { missionId, toKanbanId :kanban.kanbanListId};
    console.log(kanbanView);
    updateMission(kanbanView);
  }
  // 位置更新 , 让其直接通过索引值把自己的order设置成索引值
  // kanban.missionList?.sort((a,b)=>{
  //   return   b.missionOrder-a.missionOrder
  //   // b 减 a 是从大到小
  //   // a - b 是从小到大
  // })
})

const kanbanVisible = ref<boolean>(false);

/**
 * 如果以后要用，这个里面用来更新其位置
 */
function updateKanban(obj:Object):void{
  console.log(obj);
}

/**
 * 清除看板的信息
 */
function clearKanban(){
  kanbanVisible.value = false;
  // 手动更新名字 [doge]
}

function createEvent(){
  if(!pp.kanban.listName){
    ElMessage.warning("看板名不能为空")
  }
  const kanbanUpdate:KanbanUpdateVo = {
    kanbanId:pp.kanban.kanbanListId,
    kanbanName:pp.kanban.listName,
  }
  updKanban(kanbanUpdate).then(()=>{

  }).catch(()=>{

  }).finally(()=>{
    // 最后清空看板
    clearKanban();
  })
}

function beforeCloseKanbanUpdate(done :Function){
  if(!pp.kanban.listName){
    ElMessage.warning("看板名不能为空，请输入正确的看板名后再取消")
  }else {
    done()
  }
}

</script>

<template>

  <div class="taskview">
    <div class="taskhead" >
      <div>
        {{ pp.kanban.listName }}
      </div>
      <div>
				<el-dropdown class="menu-btn">
          <el-button  style="border: 0;padding:10px;">
            <el-icon><MoreFilled /></el-icon>
					</el-button>

					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click.native="kanbanVisible=true">重命名</el-dropdown-item>
							<el-dropdown-item>----</el-dropdown-item>
							<el-dropdown-item>----</el-dropdown-item>
							<el-dropdown-item>----</el-dropdown-item>
							<el-dropdown-item>删除看板</el-dropdown-item>
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
      :value="kanban.listName"
      :json="kanban.listName"
      :name="kanban.listName"
      
      :forceFallback="true"
      @update="updateKanban"
      ghost-class="chosen" 
      :group="'kanban'"
      :options="{ touchStartThreshold:1000 ,preventOnFilter:false}"
      :animation="300"
      :disabled="kanbanDisabled"
      item-key="id"
      >

      <template #item="{element}">
        <div  
          >
          <Todo ref="todo"
          v-model:disabled="kanbanDisabled" :detail="element"></Todo>
        </div>
      </template>
    </draggable>

    <!-- 详情 弹窗 -->
    <el-dialog @closed="closeWin" v-model="missionVisible" width="50%">
      <TodoDetailView :kanban-list-id="kanban.kanbanListId" @close="closeWin" :todo="missionDetail"></TodoDetailView>
    </el-dialog>

    <!-- 看板重命名 弹窗 -->
    <el-dialog  v-model="kanbanVisible" :before-close="beforeCloseKanbanUpdate" width="30%">
      <el-form label-width="60px">
        <el-form-item  label="看板名">
          <el-input maxlength="20" v-model.trim="pp.kanban.listName" placeholder="请输入看板名" />
        </el-form-item>
        <el-form-item>
          <el-button @click="createEvent">添加</el-button>
        </el-form-item>
      </el-form>
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