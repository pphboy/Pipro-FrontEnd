<script setup lang=ts>
 import {ref,reactive,watch} from "vue";
import MissionList  from '@/components/KanbanList/MissionList.vue';
import {getMissionListAndOverToday} from '@/services/ProjectDetailService'
import { MissionTodayAndLastDto} from "@/services/dto/MissionTodayAndLastDto";
import { useProjectDetailStore} from '@/store/modules/projectDetail'

const projectDetailStore = useProjectDetailStore()

getMissionListAndOverToday().then(res=>{
  console.log("getMissionListAndOverToday",res);
}).catch(err=>{

})

</script>

<template>

  <div class="kanban-list">
    <el-card>
      <div>
        <h3>今日待办</h3>
        <div>你当前没有今日待办，请去看板界面添加待办</div>
        <p v-if="!projectDetailStore.missionList.today">属于你的项目，说明EndTime大于今日的时间，则为今日。</p>
      </div>
      <div >
        <h3 >逾期待办</h3>
        <div v-if="!projectDetailStore.missionList.overtime">干得不错，你当前没有逾期待办。</div>
        <p>如果今天的时间大于EndTime，则说明任务已经逾期</p>
      </div>
    </el-card>
    <MissionList :kanban="{kanbanListId:-1,missionList:projectDetailStore.missionList.today,listName:'今日待办',change:false}"></MissionList>
    <MissionList :kanban="{kanbanListId:-1,missionList :projectDetailStore.missionList.overtime,listName:'逾期待办',change:false}"></MissionList> 
  </div>

</template>

<style scoped>

.kanban-list {
  display: flex;
  width:100%;
  background-color: #eee;
  flex-direction: row;

  overflow-y: auto;
  overflow-x: auto;
}

.kanban-list > div {
  flex-shrink: 0;
}

</style>