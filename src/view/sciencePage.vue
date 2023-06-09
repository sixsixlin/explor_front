<!-- 科普资讯界面 -->
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import router from '../routers/router.ts';
import { findArticle, findVarietyDict } from "../services/article.ts";
import { Article } from '../types/article';
const params=reactive({
  articleLableID:'',//文章标签
  articleTitle:'',//文章主题
})
const state =reactive<{
  Articlelist:Article[]
}>({
  Articlelist:[]
})
// 文章类型字典
let articletags=reactive([])
onMounted(async ()=>{
// 获取文章标签
  const articletag = await findVarietyDict()
  articletags =articletag.data
  // 通过标签获取文章
  await getArticleByLable()
})
const count = ref(0)
/** 获取科学资讯新闻 */
async function getArticleByLable() {
  try {
    //根据标签名称或者 标签id 用于查询文章
    var data = articletags.find(item => item.articleLableName === '科幻世界');
    params.articleLableID =data.articleLableID
    // 根据标签获取文章
    const tableData =await findArticle(params)
    state.Articlelist = tableData.data
  }catch (err){
    console.log("getUser error")
  }
}
/**
  * 路由跳转文章具体内容
  */
const  showArticle=(articleID)=>{
 // 展示文章
  var article = state.Articlelist.find(obj => obj.articleID === articleID);
  //路由跳转
  
  router.push({
    name:'articlePage',
    query:{
      article:article?.articleContent,
      articleID: article?.articleID
    }
  })
}
</script>
<template>
<!-- 主容器 -->
  <div class="maincontent"  >
    <div class="stitle">
      <i class="iconfont icon-xinwen"></i>
      <h3>科幻世界</h3>
    </div>
    <el-divider />
    <!-- 新闻目录 -->
    <div class="catecontent">
      <div class="articled">
      <!-- 使用v-for指令遍历列表数据 -->
      <ul>
        <li  v-for="item in state.Articlelist" :key="item.articleID">
          <!-- 使用flex布局让图片和文字在一行 -->
          <div class="flex-container" @click="showArticle(item.articleID)">
            <!-- 使用v-bind指令绑定图片的src属性 -->
            <img v-bind:src="item.imgURL" />
            <!-- 使用插值表达式显示文字描述 -->
            <div class="describe">
              <h3>{{ item.articleTitle }}</h3>
              <p class="vicearticle" v-html="item.articleContent"></p>
            </div>
          </div>
        </li>
      </ul> 
      </div>
    </div>
  </div>

</template>

<style scoped>
/* 主容器样式 */
.maincontent{
  margin-top: 18px;
  /* background-color: rgb(83, 214, 114); */
  margin-left: 18%;
  margin-right: 18%;
}
/* 上方文字 */
.stitle{
 font-size: 23px;
 margin: 0 ;
}
/*  新闻目录 */
.catecontent{
  margin-top: 10px;
  /* background-color: antiquewhite; */
}
/* 设置列表样式 */
ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

li {
  margin: 10px;
  width: 100%;
}

img {
  width: 150px;
  height: 220px;
}

p {
  text-align: left;

  margin-left:20px ;
}
/* 设置为flex样式 使图片和文字在水平排列 */
.flex-container {
  display: flex;
  /* align-items: center; */
} 
.describe{
  width: 100%;
  margin-left: 20px;
}
.articled{
  font-size: 15px;
}
/* 卡片描述 超过n行 省略为...
 */
.vicearticle{
  width: 80%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* 显示的行数 */
  text-overflow: ellipsis;

}
</style>