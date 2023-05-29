<script setup lang=ts>
import KanbanList from '@/components/KanbanList/KanbanList.vue';
import KanbanMenu from '@/components/KanbanList/KanbanMenu.vue';
import { useRouter } from 'vue-router';
import { KanbanDetail } from '@/types/KanbanList';
import { getProjectDetail } from '@/services/ProjectDetailService';
import { useProjectDetailStore } from "@/store/modules/projectDetail";
import {watch,ref, Ref} from 'vue'
import { BlobOptions } from 'buffer';


const router = useRouter();

const projectDetailStore = useProjectDetailStore();

const id = Number(`${router.currentRoute.value.params.id}`);
// 这个操作只是进行转换这个ID的值
getProjectDetail(id).then(res=>{
  console.log(res);
}).catch(err=>{
  console.log(err);
})


let isDragging = false
let startX = 0
let scrollLeft = 0

const scrollContainer = ref<Ref|undefined>(undefined);

/**
 * 如果任务在移动，则面板不能移动
 */
const todoMoveStatus = ref<boolean>(false);

function handleMouseDown(event: MouseEvent) {
  isDragging = true;
  startX = event.clientX;
  scrollLeft = scrollContainer.value.scrollLeft;
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging) return;
  if(todoMoveStatus.value == false){
    const x = event.clientX - startX;
    scrollContainer.value.scrollLeft = scrollLeft - x;
  }

}

function handleMouseUp() {
  isDragging = false;
}
</script>

<template>
  <!-- 
    
    用 Pinia 做全局参数共享，

    用 start 设置 当前的任务和index

    // 其实也就是用 start  把 选中的todo 放到pinia
    // add 就是 把 pinia中选中的 todo，更新到服务器

   -->
  <div class="kanban-list"  
  ref="scrollContainer"
       v-on:mousedown="handleMouseDown"
       v-on:mousemove="handleMouseMove"
       v-on:mouseup="handleMouseUp"
  >
    <kanban-list v-model:moveDisable="todoMoveStatus" v-for="(k,i) in projectDetailStore.projectDetail.kanbanList"
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
  /* 直接隐藏，万事大吉 */
  height: calc(100vh - 110px );
  overflow-y:hidden;
  overflow-x: auto;
}


.kanban-list>div {
  /* flex-grow: 1; */
  /* flex-shrink是设置缩小比例，设置为0即为 不缩小 */
  flex-shrink: 0; 
  flex-basis: 400px;
}

</style>