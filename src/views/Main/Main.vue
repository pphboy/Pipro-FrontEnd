<script setup lang="ts">
import {globalStore} from '@/store/globalStore';
import {ref} from 'vue'
const store = globalStore();


</script>
<template>
  <!-- Header -->
   <!-- <router-view></router-view> -->
   <router-link to="/Login">登录</router-link>
   <br>
   <router-link to="/ProjectList">项目列表</router-link>
   <br>
   <router-link to="/Project">项目详情</router-link>


</template>