<script setup lang=ts>
import { ref, reactive, Ref, defineProps } from "vue";
import { PiMember } from "@/types/Member";
import { getHeadImage } from "@/utils/ProjectTool";
import { addMemberToProject } from "@/services/MemberService";
import { ElMessageBox, ElMessage } from "element-plus";
import { AddMemberDto } from "@/services/dto/ProjectMemberDto";
import { useProjectDetailStore } from "@/store/modules/projectDetail";

const projectDetailStore = useProjectDetailStore();

interface MemberProps {
  member: PiMember,
  addBtnShow?: boolean,
}

const props = defineProps<MemberProps>();


function addMember(member:PiMember):void {
  ElMessageBox.confirm(
    `你确定添加[${member.memberName}]到项目[${projectDetailStore.projectDetail.projectName}]中吗？`,
    '请注解，您正在添加成员到项目中',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      addMemberToProject({
        memberId:member.memberId,
        projectId:projectDetailStore.projectDetail.projectId
      })
    })
    .catch(() => {
        console.log("取消了操作");
    })
}

</script>

<template>
  <div class="member-card">
    <div>
      <div class="left-side">
        <div style="display:flex;align-items:center;">
            <img class="head-image" :src="getHeadImage(member.memberName)" alt="" style="width: 50px; height: 50px;">
          <div>
            <div>{{ member.memberName }} </div>
            <div>{{ member.email }} </div>
          </div>
        </div>
        <div>
          <div v-if="addBtnShow">
            <el-button type="success" @click="addMember(member)" title="添加本项目" size="small">添加</el-button>
          </div>
          <div v-else>
            <div>
              <el-button type="primary" size="small">设置权限</el-button>
            </div>
            <div>
              <el-button type="danger" size="small">踢除</el-button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.member-card {
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 5px;
}

.head-image {
  border-radius: 50%;
}

.left-side {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-side>div:nth-child(1) {
  text-align: center;
}
</style>