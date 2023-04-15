<script setup lang=ts>
 import {ref,reactive} from "vue";
 import BasicInfo from '@/components/ProjectSettings/BasicInfo.vue';
 import SSpecificSettings from '@/components/ProjectSettings/SpecificSettings.vue';
 import OtherSettings from '@/components/ProjectSettings/OtherSettings.vue';
</script>

<!-- 
  可能你会问？

  为什么不用子路由？
  这是设置并不经常用，不需要优化
  这是设置，只把功能拆成了模块，并没有拆成界面。

 -->
<template>
  <div class="settings">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <BasicInfo></BasicInfo>
      </el-tab-pane>
      <el-tab-pane label="特定设置">
        <SSpecificSettings></SSpecificSettings>
      </el-tab-pane>
      <el-tab-pane label="其他">
        <OtherSettings></OtherSettings>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>

.settings {
  padding: 5px 50px;
}
</style>