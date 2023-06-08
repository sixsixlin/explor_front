<script setup lang="ts">
import { reactive } from 'vue';
import { login } from '../services/user';
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
//登录 提交账号密码
async function onSubmit(){
  console.log(state);
  console.log(localStorage.getItem("token"));
  
  try{
    const result = await login(state)
    console.log(result);
    
    // 发送异步请求 axios设置token的值
    
    // 修改 使导航栏登录注册按钮替换或消失

    // 关闭对话框
    props.onClose()
    // 若登录成功 弹窗提醒

    // 若登录失败 弹窗提醒
  }catch(res){
    console.log(res);
  }
  
}
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
    label-width="100px"
    :model="state"
    style="max-width: 460px"
  >
    <el-form-item label="用户名">
      <el-input v-model="state.userName" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="state.password"/>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="onClose">取 消</el-button>
    <el-button type="primary" @click="onSubmit">登录</el-button>
  </span>
</el-dialog>
</template>
<style setup scoped>
span {
  font-size: 20px;
  margin-left: 50px;
}
</style>