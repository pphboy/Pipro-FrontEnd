<script setup lang=ts>
 import {ref,reactive,defineProps,defineEmits} from "vue";
 import { ElMessageBox,ElMessage } from 'element-plus'
 import { TodoDetail } from "@/types/Todo";
 import {getHeadImage} from '@/utils/ProjectTool';
 import { PiMember } from "@/types/Member";
 import { PiLabel } from "@/types/Project";
 import { useProjectDetailStore } from "@/store/modules/projectDetail";
 import {createMission} from '@/services/MissionService'
 import { useRouter } from "vue-router";

 const router=  useRouter();

 const projectStore = useProjectDetailStore();

 const props = defineProps<{
  todo : TodoDetail
  kanbanListId?:number,
 }>();

 const emit = defineEmits(['close']);
 /**
  * 这里的业务放到业务层了，视图只是做个事件触发，非常的方便。
  */

function saveClick():void {
  console.log("saveClick => ",props.todo);

  // 设置标签
  props.todo.labelList = labelList.value.map(a=>{
    return {
      labelId:a
    } as PiLabel;
  })
  props.todo.memberList = []; // 设置一个空默认值
  // 如果有看板号，则说明是新增
  if(props.kanbanListId){
    props.todo.kanbanListId = props.kanbanListId
    if(!(props.todo.missionTitle.trim())){
      ElMessage({message:"请输入任务名",type:"warning"})
      return;
    }
    const pid=  Number((router.currentRoute.value.params || {id:-1}).id);
    createMission(props.todo,pid).then(res=>{

    }).catch(res=>{

    }).finally(()=>{
      emit("close"); // 调用转入的事件，不传参
    })
  }


}

const defaultMemberList = reactive<PiMember[]>([{
  memberName:"DEFAULT"
} as PiMember]);

// 默认值就是labelList嘛，这个没有设置好，确实有点小问题
const labelList = ref((props.todo.labelList || []).map(a=>a.labelId))
</script>

<template>

  <el-row>
    <el-col>
      <!-- <h3>{{ todo.memberName }}</h3> -->
      <el-input placeholder="请输入任务名" style="margin-bottom: 10px;" v-model="todo.missionTitle"></el-input>
    </el-col>
    <el-col>
        <div class="userlist">
          <div v-for="(u,i) in todo.memberList || defaultMemberList" :key="i">
            <div>
                <img  class="head-image" :src="getHeadImage(u.memberName)" alt="" style="">
            </div>
            <div>
              {{ u.memberName }}
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
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
          type="datetime"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="3" class="text-center">
        <span class="text-gray-500">&emsp;结束时间</span>
      </el-col>
      <el-col :span="8">
        <el-date-picker
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
          v-model="todo.endTime"
          type="datetime"
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
        <el-form-item label="标签">
        <el-select
          v-model="labelList"
          multiple
          placeholder="Select"
          style="width: 400px"
        >
          <el-option
            v-for="item in projectStore.projectDetail.labelList"
            :key="item.labelId"
            :label="item.labelName"
            :value="item.labelId"
          />
        </el-select>
        </el-form-item>
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