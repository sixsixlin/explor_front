<script setup lang="ts">
import { ElMessage } from "element-plus";
import { onMounted, onUpdated, ref } from 'vue';
import router from '../routers/router.ts';
import Login from '../view/login.vue';
import QualifyPage from "./qualifyPage.vue";
const activeIndex = ref('1')
const loginJudge = ref<boolean>(false)//登录对话框 状态标识
const EditAriticle=ref<boolean>(false)//用户文章资格申请 状态标识
const handleSelect = (key: string, keyPath: string[]) => {
  // activeIndex.value = '2'
  console.log(key, keyPath)
  if (key == '1') {
    router.push({
      name: 'home'
    })
  }
  if (key == '2') {
    router.push({
      name: 'messagePage'
    })
  }
  if (key == '3') {
    router.push({
      name: 'sciencePage'
    })
  }
  if (key == '5') {
    // 弹出对话框
    loginJudge.value = true
  }
  // 注销
  if(key =='6-1'){
    // 删除token 
    localStorage.removeItem("token");
    getLocalToken()
    ElMessage({
    message: '用户注销成功',
    type: 'success',
  })
  }
}
//子传父2.2 修改状态值 登录对话框
const exVisible = () => {
  try {
    loginJudge.value = false
  } catch (res) {
    console.log(res);
  }
}
// 关闭 资格申请对话框
const exQualifyVisible = () => {
  try {
    EditAriticle.value = false
  } catch (res) {
    console.log(res);
  }
}
const visiblelogin=ref<boolean>(true)
onUpdated( ()=>{
  getLocalToken()
})
onMounted(()=>{
  getLocalToken()
})
// 登录图标跟随token的值变化
function getLocalToken(){
  const token =localStorage.getItem("token")
  if(token !=null){
    visiblelogin.value =false
  }else{
    visiblelogin.value =true
  }
}

</script>
<template>
  <el-affix :offset="0">
    <el-menu :default-active="activeIndex" offset="0" class="el-menu-demo" mode="horizontal" background-color="#6e9bbf"
      text-color="#00000" active-text-color="#ffd04b" :ellipsis="false" @select="handleSelect">
      <!-- 业务导航 -->
      <div class="flex-grow6 "></div>
      <el-menu-item index="1">
        首页
      </el-menu-item>
      <el-menu-item index="2">
        科普资讯
      </el-menu-item>
      <el-menu-item index="3" id="exclass">科幻世界</el-menu-item>

      <div class="flex-grow6"></div>
      <el-menu-item index="5" v-if="visiblelogin">登录/注册 
      </el-menu-item>
      <el-sub-menu  index="6" v-else="visiblelogin">
        <template #title>
          <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      /> </template>
      <el-menu-item index="6-1">用户注销</el-menu-item>
     </el-sub-menu >
      <el-menu-item index="7" @click="EditAriticle=true">文章编辑资格申请</el-menu-item>
      <div class="flex-grow0"></div>
    </el-menu>
  </el-affix>
  <!--子传父2.3 :on-close与login.vue中的函数名onClose 对应  用于子组向父组件传值，即子组件调用父组件修改父组件中的值  -->
  <Login :on-close="exVisible" :centerDialogVisible="loginJudge"></Login>
  <QualifyPage :on-close="exQualifyVisible" :centerDialogVisible="EditAriticle"></QualifyPage>
</template>
<style setup scoped>
.flex-grow6 {
  flex-grow: 6;
}

.flex-grow0 {
  flex-grow: 0;
}

.affixs {
  width: 100%;

}

.el-menu-demo {
  width: 100%;
}
</style>