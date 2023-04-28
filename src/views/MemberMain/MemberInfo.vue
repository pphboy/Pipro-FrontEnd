<script setup lang="ts">
import { ref, reactive } from "vue";
import { PiMember } from '@/types/Member';
import type { FormInstance, FormRules } from 'element-plus';
import {Back} from '@element-plus/icons-vue';
import { useGlobalStore } from "@/store/modules/global";
import { updateMemberInfo } from '@/services/MemberService'

const globalStore = useGlobalStore();

const memberForm = ref<FormInstance>();

const member = reactive<PiMember>({} as PiMember);

const memberRuleForm = reactive({
  password: '',
  email: '',
  repassword: '',
  originalPassword:'',//原来的密码
});


if(globalStore.memberInfo?.email){
 memberRuleForm.email = globalStore.memberInfo?.email;
}


const validateEmail = (rule: any, value: any, callback: any) => {
  var reg = /\w{1,30}(\.\w{1,10}){0,2}@\w{1,10}\.\w{1,10}/g
  if (value == '') {
    callback(new Error("邮箱不能为空"));
  } else if (reg.test(value)) {
    callback()
  } else {
    callback(new Error("请输入正确的邮箱格式 xxx@xxx.com"))
  }
}

const validateRepassword = (rule: any, value: any, callback: any) => {
  // 原密码为空直接返回
  if(!memberRuleForm.password){
    callback()
  }else if (value === '') {
    callback(new Error('请重新输入密码'))
  } else if (value !== memberRuleForm.password) {
    callback(new Error("再次密码不一致"))
  } else {
    callback()
  }
}

const rules = ref<FormRules>({
  originalPassword: [
    { required: true, message: "请输入原密码以修改数据", trigger: 'blur' },
    { min: 6, max: 20, message: "原密码长度在6~10之间的英文字符", trigger: 'blur' },
  ],
  memberName: [
    { required: true, message: "请输入用户名", trigger: 'blur' },
    { min: 6, max: 10, message: "用户名长度在6~10之间的英文字符", trigger: 'blur' },
  ],
  email: [
    { validator: validateEmail, required: true }
    // { required: true, message: "请输入邮箱账号", trigger: 'blur' },
    // { min: 6, max: 30, message: "邮箱总长度不能超过30个字符", trigger: 'blur' },
  ],
  password: [
    { required: false, message: "请输入密码", trigger: 'blur' },
    { min: 6, max: 12, message: "用密码字符串长度在6~12", trigger: 'blur' },
  ],
  repassword: [
    { validator: validateRepassword, },
  ]
});


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      updateMemberInfo(memberRuleForm);
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<template>
  <div class="member-info">
    <el-row>
      <el-button style="margin-bottom: 10px;" @click="$router.back()">
        <el-icon>
          <Back />
        </el-icon>
        返回
      </el-button>
    </el-row>
    <el-row>
      <el-col>
        <el-card>
          <el-form status-icon :model="memberRuleForm" ref="memberForm" :rules="rules" label-width="80px">
            <el-form-item>
              修改数据需要输入原密码以确认您是否是成员的账号拥有者
            </el-form-item>
            <el-form-item label="原密码" prop="originalPassword">
              <el-input type="password" v-model.trim="memberRuleForm.originalPassword" style="width: 200px" placeholder="请输入原密码" maxlength="30" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model.trim="memberRuleForm.email" style="width: 200px" placeholder="请输入邮箱" maxlength="30" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model.trim="memberRuleForm.password" style="width: 200px" placeholder="请输入密码" maxlength="12"
                type="password" />
            </el-form-item>

            <el-form-item label="确认密码" prop="repassword">
              <el-input v-model.trim="memberRuleForm.repassword" style="width: 200px" placeholder="请输入确认密码" maxlength="12"
                type="password" />
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm(memberForm)">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.member-info {
  padding: 20px;
}</style>
