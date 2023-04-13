<script setup lang="ts">
import {globalStore} from '@/store/globalStore';
import Identicon from 'identicon.js'
import {ref} from 'vue'
const store = globalStore();


const data = ref(new Identicon('d3b07384d113edec49eaa6238ad5ff00', 30).toString());
console.log(data)
console.log(store.systemName);


</script>
<template>
  <!-- Header -->
   <!-- <router-view></router-view> -->
   <router-link to="/Login">登录</router-link>

   <img style="width:50px;height: 50px;" :src="`data:image/png;base64,${data}`" alt="">

</template>