<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { onUpdated, reactive, ref } from 'vue';
import { login } from '../services/user';
const ruleFormRef = ref<FormInstance>()
// 父向子传值1.1 login子类 定义在 Props定义centerDialogVisible 作为组件的一个属性 为父组件传值提供属性
//子传父 2.1  onClose自定义函数用于子组件向父组件传值
interface Props {
  centerDialogVisible:boolean
  onClose: () => void 
}
// 父向子传值 1.2 属性传值
const props = defineProps<Props>()

// 状态
const state=reactive({
  userName:'',
  password:'',
})
onUpdated(()=>{
  // 
  state.userName=''
  state.password=''
})
//登录 提交账号密码
 function onSubmit(formEl:FormInstance | undefined ){
  if (!formEl) return
  // 正则校验
   
    formEl.validate(async(valid) => {
    if (valid) {
      try{
        // 发送异步请求 axios设置token的值
        await login(state)
        // 关闭对话框
        props.onClose()
        // 若登录成功 弹窗提醒
        // 若登录失败 弹窗提醒
      }catch(res){
        console.log(res);
    }
    } else {
      console.log('login failed!')
      return false
    }
  })
}

// 自定义正则 规则
const validatePassword = (rule: any, value: any, callback: any) => {
  var reg = /^[0-9a-zA-Z]{6,16}$/;
  if (value == '') {
    callback(new Error('请输入密码'))
  } else if (!reg.test(state.password)) {
    callback(new Error("密码必须是6-16位数字字母"));
  }else{
    callback()
  }
}
const validateuserName = (rule: any, value: any, callback: any) => {

  var reg = /^1[3-9]\d{9}$/;
  if (value == '') {
    callback(new Error('请输入账号'))
  } else if(!reg.test(state.userName)) {
    callback(new Error("请输入正确的手机号")); 
  }else{
    callback()
  }
}
// 正则
const rules = reactive<FormRules>({
  password: [{ validator: validatePassword, trigger: 'blur' }],
  userName: [{ validator: validateuserName, trigger: 'blur' }]
})
</script>
<template>
  <!-- before-close 关闭前执行函数 用于调参数 -->
<el-dialog

  title="登录、注册"
  :before-close="onClose"
  :model-value="centerDialogVisible"
  destroy-on-close
  width="35%"
  center>
  <span> 注意:若该账号第一次登录自动为该账号注册</span>
  <el-divider />
  <el-form
    ref="ruleFormRef"
    :rules="rules"
    label-width="100px"
    :model="state"
    style="max-width: 460px"
  >
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="state.userName"   />
    </el-form-item>
    <el-form-item label="密码" prop='password'>
      <el-input show-password v-model="state.password"  />
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="onClose">取 消</el-button>
    <el-button type="primary" @click="onSubmit(ruleFormRef)">登录</el-button>
  </span>
</el-dialog>
</template>
<style setup scoped>
span {
  font-size: 20px;
  margin-left: 50px;
}
</style>