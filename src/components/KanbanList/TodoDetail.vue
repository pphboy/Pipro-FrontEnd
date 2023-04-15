<script setup lang=ts>
 import {ref,reactive,defineProps,defineEmits} from "vue";
 import { ElMessageBox } from 'element-plus'
 import { TodoDetail } from "@/types/Todo";
 import {getHeadImage} from '@/utils/ProjectTool';

 const props = defineProps<{
  todo : TodoDetail
 }>();

 const emit = defineEmits(['close']);


function saveClick():void {
  emit("close"); // 调用转入的事件，不传参
}
</script>

<template>

  <el-row>
    <el-col>
      <!-- <h3>{{ todo.memberName }}</h3> -->
      <el-input style="margin-bottom: 10px;" v-model="todo.memberName"></el-input>
    </el-col>
    <el-col>
        <div class="userlist">
          <div>
            <div>
                <img  class="head-image" :src="getHeadImage('abc')" alt="" style="">
            </div>
            <div>
              UserNameAB
            </div>
          </div>
          <div>
            <div>
                <img  class="head-image" :src="getHeadImage('abc')" alt="" style="">
            </div>
            <div>
              UserNameAB
            </div>
          </div>
        </div>
    </el-col>
    <el-col>
      
    </el-col>
  </el-row>
  <el-row class="time-row">
    <el-col :span="3" class="text-center">
      <span class="text-gray-500">开始时间</span>
    </el-col>
    <el-col :span="8">
        <el-date-picker
          v-model="todo.startTime"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="3" class="text-center">
        <span class="text-gray-500">&emsp;结束时间</span>
      </el-col>
      <el-col :span="8">
        <el-date-picker
          v-model="todo.endTime"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
  </el-row>
  <el-row class="time-row">
    <el-col>
      <div style="margin-bottom:5px;">
        任务介绍
      </div>
    </el-col>
    <el-col>
      <el-input resize="none" v-model="todo.missionIntro" type="textarea" :rows="5"></el-input>
    </el-col>
  </el-row>
  <el-row class="time-row">
    <el-col>
      <div class="label-list">
        <div>标签：</div>
        <div class="label-mg">
          <el-tag class="ml-2" type="success">Tag 2</el-tag>
        </div>
        <div class="label-mg">
             <el-tag class="ml-2" type="info">Tag 3</el-tag>
        </div>
      </div>
    </el-col>
  </el-row>

  <el-row>
    <el-col>
      <el-button @click="saveClick">保存</el-button>
    </el-col>
  </el-row>









</template>

<style scoped>

.userlist {
  border: 1px solid #ccc;
}


.time-row{
  margin: 10px 0;
}
.text-center{
  line-height: 32px;
}

.label-list {
  display: flex;
}
.userlist {
  display: flex;
  flex-direction:row;
}

.userlist > div{
  margin-left: 5px;
  width: 90px;
  text-align: center;
}

.label-mg {
  margin-right: 10px;
}


.head-image{
  width: 50px; height: 50px;border-radius: 50%;box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);border:1px solid #ccc;
}

</style>