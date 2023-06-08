<script setup lang="ts">
import { ref } from 'vue';
import router from '../routers/router.ts';
const activeIndex = ref('1')
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
      <el-menu-item  index="3" id="exclass">科幻世界</el-menu-item>

      <div class="flex-grow6"></div>
      <el-menu-item index="5">登录/注册</el-menu-item>
      <el-menu-item index="6">文章编辑资格申请</el-menu-item>
      <div class="flex-grow0"></div>
    </el-menu>
  </el-affix>
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