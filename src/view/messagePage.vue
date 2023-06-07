<!-- 科普资讯界面 -->
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
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
    var data = articletags.find(item => item.articleLableName === '公司业务');
    params.articleLableID =data.articleLableID
    // 根据标签获取文章
    const tableData =await findArticle(params)
    console.log(tableData);
  }catch (err){
    console.log("getUser error")
  }
}

</script>
<template>
<!-- 主容器 -->
  <div class="maincontent">
    <div class="stitle">
      <i class="iconfont icon-xinwen"></i>
      <span>科普资讯</span>
    </div>

    <!-- 新闻目录 -->
    <div class="catecontent">
    123465

    </div>
  </div>
</template>

<style scoped>
/* 主容器样式 */
.maincontent{
  margin-top: 18px;
  background-color: rgb(83, 214, 114);
  margin-left: 18%;
  margin-right: 18%;
}
/* 上方文字 */
.stitle{
 font-size: 16px;
 margin: 0 ;
}
/*  新闻目录 */
.catecontent{
  margin-top: 10px;
  background-color: antiquewhite;
}
</style>