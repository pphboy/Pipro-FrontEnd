<script setup lang=ts>
import KanbanList from '@/components/KanbanList/KanbanList.vue';
import KanbanMenu from '@/components/KanbanList/KanbanMenu.vue';
import { useRouter } from 'vue-router';
import { KanbanDetail } from '@/types/KanbanList';
import { getProjectDetail } from '@/services/ProjectDetailService';
import { useProjectDetailStore } from "@/store/modules/projectDetail";
import {watch} from 'vue'


const router = useRouter();

const projectDetailStore = useProjectDetailStore();

const id = Number(`${router.currentRoute.value.params.id}`);
// 这个操作只是进行转换这个ID的值
getProjectDetail(id).then(res=>{
  console.log(res);
}).catch(err=>{
  console.log(err);
})

</script>

<template>
  <!-- 
    
    用 Pinia 做全局参数共享，

    用 start 设置 当前的任务和index

    // 其实也就是用 start  把 选中的todo 放到pinia
    // add 就是 把 pinia中选中的 todo，更新到服务器

   -->
  <div class="kanban-list">
    <kanban-list v-for="(k,i) in projectDetailStore.projectDetail.kanbanList"
      :kanban="k"></kanban-list>

      <KanbanMenu :default-message-show="!(projectDetailStore.projectDetail.kanbanList?.length)"></KanbanMenu>
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


.kanban-list>div {
  /* flex-grow: 1; */
  /* flex-shrink是设置缩小比例，设置为0即为 不缩小 */
  flex-shrink: 0; 
  flex-basis: 400px;
}

</style>