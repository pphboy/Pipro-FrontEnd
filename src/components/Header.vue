<script lang="ts" setup>
import { Memo, Message } from '@element-plus/icons-vue'
import { ref, reactive,computed, defineProps } from 'vue';
import { PiProject } from '@/types/Project'
import MessageBag from '@/components/MessageList/MessageBag.vue'

const newProjectDialog = ref(false);

const messageBoxDrawer = ref(false);

const pipro = ref<PiProject>({} as PiProject);

// 这个计算属性会自动 判断 其 是否 是 需要显示 红点，并改变样式
const showDot = computed(()=>{
  return true;
});

const props = defineProps<{
  type?: string
}>();

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
            <img class="iconimg" src="@/assets/qq.png" alt="头像">
          </div>
          <div style="line-height:20px;">
            <div>UserNameAB</div>
            <div>Type</div>
          </div>
          <div>
            <el-dropdown class="menu-btn">
              <el-button style="border: 0;padding:10px;">
                <el-icon :size="25">
                  <Memo />
                </el-icon>
              </el-button>

              <span class="el-dropdown-link">
                Dropdown List
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
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
      <el-button class="nav-btn" @click="$router.push({name:'ProjectDetailMain'})">看板</el-button>
      <el-button class="nav-btn" @click="$router.push({name:'ProjectTodoList'})">列表</el-button>
      <el-button class="nav-btn" @click="$router.push({name:'ProjectFileList'})">文件</el-button>
      <el-button class="nav-btn" @click="$router.push({name:'ProjectDocumentList'})">文档</el-button>
      <el-button class="nav-btn" @click="$router.push({name:'ProjectSettings'})">设置</el-button>
    </div>
  </header>

  <!-- 
        新建项目的弹窗
       -->
  <el-dialog v-model="newProjectDialog" title="新建项目" width="500">
    <el-form label-width="80px">
      <el-form-item label="项目名">
          <el-input v-model="pipro.projectName" maxlength="20" placeholder="请输入项目名"></el-input>
        </el-form-item>
        <el-form-item label="项目介绍">
          <el-input v-model="pipro.projectIntro" show-word-limit maxlength="200" type="textarea" :rows="5" resize="none"
            placeholder="请输入项目介绍" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">创建</el-button>
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

</style>