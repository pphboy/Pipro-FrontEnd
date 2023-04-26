<script setup lang=ts>
import {MoreFilled,Plus} from '@element-plus/icons-vue'
import {KanbanCreateVo} from '@/services/dto/KanbanVo'
import { createKanban } from '@/services/KanbanService'
import { ref,reactive,defineProps} from 'vue';
import { ElMessage } from 'element-plus';
import { useProjectDetailStore } from '@/store/modules/projectDetail';

const projectDetailStore = useProjectDetailStore();

interface KanbanProps 
{
  defaultMessageShow:boolean,
}
const props = defineProps<KanbanProps>()

const kanbanVisible = ref(false)

function closeWin(): void {
  // 打开看板拖动事件
}

/**
 * 清除看板的信息
 */
function clearKanban(){
  kanbanVisible.value = false;
  kanbanInfo.kanbanName = ''
}


const kanbanInfo:KanbanCreateVo = reactive({kanbanName:"",})

function createEvent(){
  if(!kanbanInfo.kanbanName){
    ElMessage.warning("看板名不能为空")

  }
  kanbanInfo.projectId = projectDetailStore.projectDetail.projectId;
  createKanban(kanbanInfo).then(()=>{

  }).catch(()=>{

  }).finally(()=>{
    // 最后清空看板
    clearKanban();
  })
}


</script>

<template>

  <div class="taskview">
    <div class="taskhead" >
      <div>
        看板菜单
      </div>
      <div>
				<el-dropdown class="menu-btn">
          <el-button  style="border: 0;padding:10px;">
            <el-icon><MoreFilled /></el-icon>
					</el-button>

					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>这个按钮还没写捏</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
      </div>
    </div>
    <div >
      <el-button title="点击添加看板" @click="kanbanVisible  = true;" class="add-btn">
        <el-icon><Plus /></el-icon>
        &nbsp;添加看板
      </el-button>
    </div>

    <div class="tasklist">
      <el-card class="todo" v-if="defaultMessageShow">
        <h3>欢迎使用PiPRO</h3>
      </el-card>
      <el-card class="todo" v-if="defaultMessageShow">
        <p>
          您还未添加默认的看板，添加看板后即可通过看板来添加任务，然后进行协作，请注意看板的顺序。
        </p>
      </el-card>
    </div>

    <!-- 详情 弹窗 -->
    <el-dialog @closed="closeWin" v-model="kanbanVisible" width="30%">
      <el-form label-width="60px">
        <el-form-item  label="看板名">
          <el-input maxlength="20" v-model.trim="kanbanInfo.kanbanName" placeholder="请输入看板名" />
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

.todo {
  width: 380px;
  margin-bottom: 5px;
  cursor: pointer;
}

:deep() .el-card__body {
  padding: 5px;
}


</style>