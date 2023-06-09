<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { onUpdated, reactive } from "vue";
import { applyQualification, qualification } from '../services/user';
interface Props{
  centerDialogVisible:boolean
  onClose: () => void 
}
const props = defineProps<Props>()
//用户资格状态
const userToken =reactive<{
  token:string
}>({
  token:'',
})
// 前端资格申请状态
const state =reactive<{
  status:number
}>({
  status:-1,
})
onUpdated(async ()=>{

  getQualification()
})
// 获取用户资格状态
async function getQualification(){
  try{
    userToken.token = localStorage.getItem("token") ||''
    const res = await qualification(userToken)  // 查找用户资格状态
    state.status=res.data
  }catch(res){
    
    console.log("error"+  res);
    
  }
}
// 申请资格
async function onApply(){
  try{
  // 首先判断是否登录
  userToken.token =localStorage.getItem("token")||''
  // 判断时候已申请资格
  getQualification()
  if(state.status == 2){
    ElMessage({
      message: '已提交申请 请耐心等待',
    })
  }
  if(state.status == 3){
    ElMessage({
      message: '您已获得资格',
      type:'success'
    })
  }
  if(state.status == 4){
    ElMessage({
      message: '编辑涉嫌违规  已取消您的编辑资格',
    })
  }
  
  if(userToken.token  !=null&& userToken.token != '' && state.status==1){
    // 获得申请资格
  const res= await applyQualification(userToken)
  console.log(res);
  }}catch(res){
    ElMessage({
      message: '资格申请有误',
      type: 'warning',
  })
    console.log(res);  
}
//关闭反馈
  props.onClose()
}
</script>
<template>
<el-dialog
  title="用户文章编辑资格申请"
  :before-close="onClose"
  :model-value="centerDialogVisible"
  destroy-on-close
  width="35%"
  center>
  <el-divider />
  <!-- 步骤条 -->
  <el-steps :active="state.status " align-center>
    <el-step title="未申请资格"></el-step>
    <el-step title="待审核" ></el-step>
    <el-step title="获得资格" ></el-step>
  </el-steps>
  <span slot="footer" class="dialog-footer" :center="true" style="margin-left: 40%;">
    <el-button type="success" @click="onApply">资格申请</el-button>
  </span>
</el-dialog>
</template>
<style setup scoped>
</style>