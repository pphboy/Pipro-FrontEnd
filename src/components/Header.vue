<script lang="ts" setup>
import { Memo, Message } from '@element-plus/icons-vue'
import { ref, reactive,computed, defineProps } from 'vue';
import { PiProject } from '@/types/Project'
import MessageBag from '@/components/MessageList/MessageBag.vue'
import {FormRules,FormInstance, ElNotification} from 'element-plus'
import {saveProject,getProjectList} from '@/services/ProjectListService';
import { useProjectDetailStore } from '@/store/modules/projectDetail';
import { useGlobalStore} from '@/store/modules/global'
import { getHeadImage } from '@/utils/ProjectTool';

const globalStore = useGlobalStore();

const projectDetailStore = useProjectDetailStore();

const newProjectDialog = ref(false);

const messageBoxDrawer = ref(false);

const pipro = reactive<PiProject>({
} as PiProject);


const formRef = ref(undefined);

const formRules = reactive<FormRules>({
  projectName: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { min: 1, max: 30, message: '项目名称长度在1~30之间', trigger: 'blur' },
  ],
  projectIntro:  [
    { required: true, message: '请输入项目描述', trigger: 'blur' },
    { min: 6, max: 240, message: '项目描述的长度在6~240之间', trigger: 'blur' },
  ],
})

// 这个计算属性会自动 判断 其 是否 是 需要显示 红点，并改变样式
const showDot = computed(()=>{
  return true;
});

const props = defineProps<{
  type?: string
}>();

const createSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      saveProject(pipro).then(res=>{
        console.log("createSubmit",res);
        if(res){
          ElNotification({
            message:"添加成功",
            type:'success'
          })
          // 刷新项目列表
          getProjectList();
          pipro.projectIntro= pipro.projectName=''
          newProjectDialog.value = false;
        }
      }).catch(err=>{

      });
    } else {
      // console.log('error submit!', fields)
    }
  })
}
</script>
<template>
  <header>
    <el-row class="header_pro">
      <el-col :span="12">
        <div @click="$router.push({ name: 'ProjectInstances' })">
          <img style="height:50px;" src="@/assets/longlogo.jpg">
        </div>
      </el-col>
      <el-col :span="12">
        <div class="header_right_sider">
          <div :class="{'show-dot':showDot}">
              <el-badge :value="10">
                <el-button @click="messageBoxDrawer = true" style="border: 0;padding:10px;">
                  <el-icon :size="20"><Message /></el-icon>
                </el-button>
              </el-badge>
            </div>
          <div>
            <img class="iconimg" :src="getHeadImage(globalStore.memberInfo.memberName || 'DEFAULT')" alt="头像">
          </div>
          <div style="line-height:20px;">
            <div style="background:#ccc;">{{ globalStore.memberInfo.memberName  }}</div>
            <div>Type</div>
          </div>
          <div>
            <el-dropdown class="menu-btn">
              <el-button style="border: 0;padding:10px;">
                <el-icon :size="25">
                  <Memo />
                </el-icon>
              </el-button>

              <template #dropdown>
                <el-dropdown-menu>
                  <!-- 如果是 ProjectList 的类型 则有 这个菜单项 -->
                  <el-dropdown-item v-if="type == 'ProjectList'" @click="newProjectDialog = true">新建项目</el-dropdown-item>

                <el-dropdown-item @click="$router.push({ name: 'MemberInfo' })">用户信息</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </div>
        </div>
      </el-col>

    </el-row>

    <div class="nav-btns" v-if=" type == 'ProjectDetail'">
      <el-button class="nav-btn" type="primary" title="项目名称">{{  projectDetailStore.projectDetail.projectName}}</el-button>
      <el-button class="nav-btn" @click="$router.push({name:'ProjectDetailMain'})">看板</el-button>
      <el-button class="nav-btn" @click="$router.push({name:'ProjectTodoList'})">列表</el-button>
      <el-button class="nav-btn" @click="$router.push({name:'ProjectFileList'})">文件</el-button>
      <el-button class="nav-btn" @click="$router.push({name:'ProjectDocumentList'})">文档</el-button>
      <el-button class="nav-btn" @click="$router.push({name:'MemberList'})">成员</el-button>
      <el-button class="nav-btn" @click="$router.push({name:'ProjectSettings'})">设置</el-button>
    </div>
  </header>

  <!-- 
        新建项目的弹窗
       -->
  <el-dialog v-model="newProjectDialog" title="新建项目" width="500">
    <el-form ref="formRef" :rules="formRules" :model="pipro"  label-width="80px">
      <el-form-item label="项目名" prop="projectName">
          <el-input v-model="pipro.projectName" maxlength="20" placeholder="请输入项目名"></el-input>
        </el-form-item>
        <el-form-item label="项目介绍" prop="projectIntro">
          <el-input v-model="pipro.projectIntro" show-word-limit maxlength="200" type="textarea" :rows="5" resize="none"
            placeholder="请输入项目介绍" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createSubmit(formRef)">创建</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
  <!-- 
    消息的侧栏
    :direction="direction"
    :before-close="handleClose"
    -->
  <el-drawer
    v-model="messageBoxDrawer"
    title="消息列表"
    size="500"
    width="500"
  >
    <MessageBag></MessageBag>
  </el-drawer>

</template>
<style scoped>
.header_right_sider {
  float: right;
  line-height: 50px;
  display: flex;
  align-items: center;
}

.header_right_sider>div>img {
  display: inline-block;
  width: 45px;
  height: 45px;
  vertical-align: middle;
  /* 垂直居中 */
}

.header_right_sider div {
  margin-right: 5px;
  justify-self: center;
}

.menu-btn {

  vertical-align: middle;
  /* 垂直居中 */
}


.header_pro {
  height: 50px;
}

header {
  padding-bottom: 2px;
  border-bottom: 2px solid skyblue;
}

.nav-btns {
  padding: 5px 50px;

  border-top: 2px solid skyblue;

}
.nav-btn {
  border: 0;
  font-size: 20px;
  padding: 5px;
}
.show-dot {
  line-height: 0;
  padding-right: 20px;
}
.iconimg{
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.12);
}

</style>