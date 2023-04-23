<script setup lang="ts">

// 共用一个header算了
import Header from '@/components/Header.vue';
import { useGlobalStore } from '@/store/modules/global';
import { ref } from 'vue'
const store = useGlobalStore();


</script>
<template>
  <Header></Header>
  <router-view></router-view>
</template>