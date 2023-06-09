<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { reactive } from 'vue';
import { feedBackMsg } from '../services/user';
interface Props{
  centerDialogVisible:boolean
  onClose: () => void 
}
const props = defineProps<Props>()
const form=reactive({
  reactPhone:'',//反馈者联系方式
  reactContend:'',//反馈内容
  reactTypeID:'',//反馈类型
  reactTime:""//反馈时间
})
function gettime(){
    // 创建一个Date对象
  var date = new Date();
  // 获取年份
  var year = date.getFullYear();
  // 获取月份（0-11，需要加1）
  var month = date.getMonth() + 1;
  // 获取日期（1-31）
  var day = date.getDate();
  // 获取小时（0-23）
  var hour = date.getHours();
  // 获取分钟（0-59）
  var minute = date.getMinutes();
  // 拼接成字符串
  var dateString = year + "-" + month + "-" + day + " " + hour + ":" + minute;
  return dateString
}
// 反馈提交
async function onSubmit(){
  form.reactTime = gettime()
  try{
    const res = await feedBackMsg(form)
    if(res.code == '20000'){
      ElMessage({
        message: '反馈成功 等待管理与您取得联系',
        type: 'success',
      })
    }
    // 关闭状态
    props.onClose()
  }catch(res){
    console.log('error'+res);
  }  
}
</script>
<template>
<el-dialog
  title="用户反馈"
  :before-close="onClose"
  :model-value="centerDialogVisible"
  destroy-on-close
  width="35%"
  center>
  <el-divider />
  <el-form :model="form">
    <el-form-item label="请选择反馈类型" >
        <el-select v-model="form.reactTypeID" placeholder="请选择反馈类型">
          <el-option label="业务咨询与合作" value="1" />
          <el-option label="投诉与建议" value="2" />
          <el-option label="页面错误纠正" value="3" />
          <el-option label="回复反馈" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="反馈者联系方式" >
        <el-input v-model="form.reactPhone"  placeholder="请输入手机号" autocomplete="off" />
      </el-form-item>
      <el-form-item label="请输入反馈内容">
        <el-input v-model="form.reactContend" rows="6"  maxlength="600"  show-word-limit  type="textarea"  autocomplete="off" />
      </el-form-item>
    </el-form>

  <span slot="footer" class="dialog-footer" :center="true" style="margin-left: 40%;">
    <el-button type="success" @click="onSubmit">反馈</el-button>
  </span>
</el-dialog>
</template>
<style setup scoped>
</style>