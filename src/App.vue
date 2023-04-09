<script setup lang="ts">
  import Footer from '@/views/Footer/Footer.vue';
</script>

<template>

  <div class="main">
    <router-view></router-view>
  </div>

  <Footer></Footer>
</template>

<style scoped>

body {
  margin:0;
}

.main {
  height: calc(100vh - 80px);
  min-height: 800px;
  /* 全局最小宽度不小于1000Px */
  min-width: 1000px; 
}

</style>
