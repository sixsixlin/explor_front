<script lang="ts" setup>

</script>
<template>
   
<!-- 主容器 -->
  <div class="maincontent">
    <!-- 轮播图 -->
  <div class="carousel">
    <el-carousel>
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="contentarticle">
  <!--左侧新闻列表 -->
  <div class="leftnews">
    <div>
      <!-- **把图标调大点** -->
      <i class="iconfont icon-xinwen_o icons"></i>
      <span>动态新闻</span>
    </div>
   <div class="leftArticle">
    123456
   </div>
  </div>
  <!-- 右侧新闻列表 -->
  <div class="righttnews">
    <div>
      <!-- **把图标调大点** -->
      <i class="iconfont icon-xinwen_o icons"></i>
      <span>时政新闻</span>
    </div>
   <div class="rightArticle">
   123465789
   </div>
  </div>
</div>
</div>
</template>

<style scoped>
.flex-grow6 {
  flex-grow: 6;
}
.flex-grow0 {
  flex-grow: 0;
}
.affixs{
  width: 100%;
  
}
.el-menu-demo{
  width: 100%;
}
/* 文章主题占比 */
.contentarticle{
  width: 100%;
}
/* 主容器样式 */
.maincontent{
  margin-top: 18px;
  background-color: rgb(83, 214, 114);
  margin-left: 18%;
  margin-right: 18%;
}
/* 轮播图样式 */
.carousel{
  background-color: aquamarine;
  width: 100%;
  height: 300px;
}
/* 动态新闻样式 */
.leftnews{
  margin-top: 20px;
  background-color: aquamarine;
  float: left;
  width: 60%;
  
}
/* 时政新闻样式  */
.righttnews{
  margin-top: 20px;
  background-color: rgb(104, 45, 176);
  float: right;
  margin-left: 2%;
  width: 38%;
}

</style>
