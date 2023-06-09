<script lang="ts" setup>
interface Props{
  centerDialogVisible:boolean
  onClose: () => void 
}
defineProps<Props>()

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
  <el-steps :active="2" align-center>
  <el-step title="未申请资格"></el-step>
  <el-step title="待审核" ></el-step>
  <el-step title="获得资格" ></el-step>
</el-steps>
  <span slot="footer" class="dialog-footer">
    <el-button @click="onClose">取 消</el-button>
    <el-button type="primary" @click="onClose">登录</el-button>
  </span>
</el-dialog>
</template>
<style setup scoped>
</style>