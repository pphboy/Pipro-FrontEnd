<script setup lang=ts>
import { ref, reactive, Ref } from "vue";
import { VoMember } from '@/types/Member';
import { ElLoading,formContextKey, FormInstance, FormRules } from 'element-plus'
import {login} from '@/services/SystemService'
import { useGlobalStore } from "@/store/modules/global";

import { useRouter } from 'vue-router'

const router = reactive(useRouter())

const loginObject: VoMember = reactive<VoMember>({
  username: 'abc123',
  password: '123123',
});

const ruleFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 18, message: '用户长度在6~18位之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度在6~18位之间', trigger: 'blur' },
  ],
});

/**
 * 登录的点击事件
 */
const loginSubmit = async (form: FormInstance | undefined) => {
  if (!form) return;
  await form.validate((valid, fields) => {
    if (valid) {
      // 开启加载事件
      const loadingInstance = ElLoading.service({fullscreen:true});
      login(loginObject).then((res)=>{
        if(res){
          router.push({name:'ProjectInstances'})
        }
      }).catch((res)=>{
        console.log(" login error ");
      }).finally(()=>{
        setTimeout(()=>{
          loadingInstance.close();
        },500);
      })
    } else {
      console.log("LoginFormError", fields);
    }
  })
}

</script>

<template>
  <el-col>
    <div class="login-head">
      <div>
        登录
      </div>
    </div>
  </el-col>
  <el-col>
    <el-form ref="ruleFormRef" :rules="rules" :model="loginObject" label-width="70px">
      <el-form-item>
      </el-form-item>
      <el-form-item prop="username" label="用户名">
        <el-input maxlength="18" v-model.trim="loginObject.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input maxlength="18" v-model.trim="loginObject.password" placeholder="请输入密码" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginSubmit(ruleFormRef)">登录</el-button>
        <el-button @click="$router.push({name:'Register'})">注册</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<style scoped>
.login-head>div {
  font-size: 24px;
}
</style>