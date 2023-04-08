<script setup lang="ts">
import {globalStore} from '@/store/globalStore';
const store = globalStore();

console.log(store.systemName);

</script>
<template>
  {{store.systemName }}
  <el-button>Hello</el-button>
</template>