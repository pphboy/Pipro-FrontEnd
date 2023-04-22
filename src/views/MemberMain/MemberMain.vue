<script setup lang="ts">

// 共用一个header算了
import Header from '@/components/Header.vue';

import { ref } from 'vue'
const store = globalStore();


</script>
<template>
  <Header></Header>
  <router-view></router-view>
</template>