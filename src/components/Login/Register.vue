<script setup lang=ts>
import { ref, reactive, Ref } from "vue";
import { VoMember } from '@/types/Member';
import { ElLoading,ElNotification,formContextKey, FormInstance, FormRules, messageConfig } from 'element-plus'

import { useRouter } from 'vue-router'

import {register} from '@/services/SystemService'

const router = reactive(useRouter())

const loginObject: VoMember = reactive<VoMember>({
  username: '',
  password: '',
  repassword:'' ,
  email:'',
});

const ruleFormRef = ref<FormInstance>();

const validateRePassord = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入确认密码'))
  } else if (value !== loginObject.password) {
    callback(new Error("再次密码不一致"))
  } else {
    callback()
  }
}


const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 18, message: '用户长度在6~18位之间', trigger: 'blur' },
  ],
  email:[
    {
      required:true,
      type:'email',
      message:'请输入正确的邮箱账号',
      trigger:['blur','change']
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度在6~18位之间', trigger: 'blur' },
  ],
  repassword: [
    { required: true,  trigger: 'blur' ,validator: validateRePassord},
  ],
});


/**
 * 登录的点击事件
 */
const registerSubmit= async (form: FormInstance | undefined) => {
  if (!form) return;
  await form.validate((valid, fields) => {
    if (valid) {
      const loadingInstance = ElLoading.service({fullscreen:true});
      register(loginObject).then((res)=>{
        console.log("res=>",res);
        if(res){
          ElNotification({
            type:"success" ,
            message:"请到登录界面登录",
          })
          router.push({name:"Login"});
        }
      }).catch((res)=>{
        console.log(" login error ");
      }).finally(()=>{
        setTimeout(()=>{
          loadingInstance.close();
        },500);
      })
    } else {
      console.log("erro", fields);
    }
  })
}

</script>

<template>
  <el-col>
    <div class="login-head">
      <div>
        注册
      </div>
    </div>
  </el-col>
  <el-col>
    <el-form ref="ruleFormRef" :rules="rules" :model="loginObject" label-width="80px">
      <el-form-item>
      </el-form-item>
      <el-form-item prop="username" label="用户名">
        <el-input maxlength="18" v-model.trim="loginObject.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input maxlength="18" v-model.trim="loginObject.email" placeholder="请输入邮箱" type="email" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input maxlength="18" v-model.trim="loginObject.password" placeholder="请输入密码" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input maxlength="18" v-model.trim="loginObject.repassword" placeholder="请输入密码" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="$router.push({name:'Login'})">登录</el-button>
        <el-button type="primary" @click="registerSubmit(ruleFormRef)">注册</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<style scoped>
.login-head>div {
  font-size: 24px;
}
</style>