<script setup lang=ts>
import TaskList from './KanbanList/KanbanList.vue';
import Test from './KanbanList/Test.vue'

</script>

<template>
  <div class="kanban-list">
    <TaskList :kanban="{kanbanListId:1,listName:'Todo'}"></TaskList>
    <TaskList :kanban="{kanbanListId:1,listName:'Todo'}"></TaskList>
    <TaskList :kanban="{kanbanListId:1,listName:'Todo'}"></TaskList>
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