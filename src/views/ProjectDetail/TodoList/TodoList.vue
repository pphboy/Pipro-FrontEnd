<script setup lang=ts>
 import {ref,reactive} from "vue";
import TaskList from '@/components/KanbanList/KanbanList.vue';

</script>

<template>

  <div class="kanban-list">
    <TaskList :kanban="{kanbanListId:1,listName:'今日待办',change:false}"></TaskList>
    <TaskList :kanban="{kanbanListId:2,listName:'逾期待办',change:false}"></TaskList> 
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