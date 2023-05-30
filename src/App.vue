<script setup lang="ts">
  import Footer from '@/views/Footer/Footer.vue';
  import {initService} from '@/services/SystemService'

  initService();



</script>

<template>

  <!-- 
    // 关闭原生默认事件
    @contextmenu.prevent="()=>{}"
   -->
  <div class="main" @contextmenu.prevent="()=>{}">
    <router-view></router-view>
  </div>

  <!-- <Footer></Footer> -->
</template>

<style scoped>

body {
  margin:0;
}

.main {
  /* height: calc(100vh - 80px); */
  /* min-height: 900px; */
  /* 全局最小宽度不小于1000Px */
  min-width: 1000px; 
}


</style>
