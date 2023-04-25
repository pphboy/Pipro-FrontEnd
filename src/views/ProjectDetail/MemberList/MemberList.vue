<script setup lang=ts>
 import {ref,reactive,watch} from "vue";
import MissionList  from '@/components/KanbanList/MissionList.vue';
import {getMissionListAndOverToday} from '@/services/ProjectDetailService'
import { MissionTodayAndLastDto} from "@/services/dto/MissionTodayAndLastDto";
import { useProjectDetailStore} from '@/store/modules/projectDetail'
import MemberItem from '@/components/MemberList/MemberItem.vue'
import {getMemberList} from '@/services/MemberService'

const projectDetailStore = useProjectDetailStore()

getMissionListAndOverToday().then(res=>{
  console.log("getMissionListAndOverToday",res);
}).catch(err=>{

})

getMemberList();
</script>

<template>

  <div class="kanban-list">
    <el-card>
      <div>
        <h3>操作方法</h3>
        <div>你可以点击头像，添加全局的用户到你的项目里。</div>
        <div>删除用户时需要小心.</div>
      </div>
    </el-card>
    <el-card class="list-card">
      <h3>用户列表</h3>
      <div>
        <MemberItem v-for="(m,i) in projectDetailStore.projectDetail.memberList" :member="m" :key="i"></MemberItem>
      </div>
    </el-card>
    <el-card class="list-card">
      <h3>全局用户列表</h3>
      <div>
        <MemberItem :add-btn-show="true" v-for="(m,i) in projectDetailStore.anotherMemberList" :member="m" :key="i"></MemberItem>
      </div>
    </el-card>
  </div>

</template>

<style scoped>

.kanban-list {
  padding-top: 2px;
  width: 400px;
  height: calc(80vh);
  display: flex;
  background-color: #eee;
  flex-direction: row;
  width: 100%;

  overflow-y: auto;
  overflow-x:auto;
}

.kanban-list > div {
  flex-shrink: 0;
}

.list-card {
  min-width:400px;

  overflow-y: auto;
}
</style>