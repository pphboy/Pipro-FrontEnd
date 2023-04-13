<script setup lang=ts>

import Todo from './Todo.vue';

</script>

<template>

  <div class="tasklist">
    <Todo></Todo>
    <Todo></Todo>
    <Todo></Todo>
    <Todo></Todo>
    <Todo></Todo>
    <Todo></Todo>
    <Todo></Todo>
    <Todo></Todo>
    <Todo></Todo>
  </div>

</template>

<style scoped>

.tasklist{ 
  width: 400px;
  padding: 2px;
  height: 700px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #ccc;
  border-radius: 4px;
  }
</style>