<script setup lang="ts">
import {globalStore} from '@/store/globalStore';
const store = globalStore();

console.log(store.systemName);

</script>
<template>
  <!-- Header -->
   <!-- <router-view></router-view> -->
   <router-link to="/Login">登录</router-link>
</template>