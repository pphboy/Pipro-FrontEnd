<script setup lang=ts>
import TaskList from './TaskList/TaskList.vue';

</script>

<template>
  <div class="kanban-list">
    <TaskList></TaskList>
  </div>
</template>

<style scoped>

.kanban-list {
  display: flex;
  width:100%;
  flex-direction: row;
  overflow-y: auto;
  overflow-x: auto;
}


.kanban-list>div {
  flex-grow: 1;
  /* flex-shrink是设置缩小比例，设置为0即为 不缩小 */
  flex-shrink: 0; 
  flex-basis: 400px;
}

</style>