<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onMounted, onUpdated, reactive } from 'vue';
import router from '../routers/router.ts';
import { findArticle, findVarietyDict } from "../services/article.ts";
import { articleStatusEditStore } from '../store/statusEdit';
import { Article } from '../types/article';
const statusEx = articleStatusEditStore()//引入pinia
const { statusEdit, numberEdit } = storeToRefs(statusEx)
const state = reactive<{
  SciArticlelist: Article[],//科幻新闻
  DynaArticlelist: Article[],//动态新闻
  PolArticlelist: Article[]//时政新闻

}>({
  SciArticlelist: [],//科幻新闻
  DynaArticlelist: [],//动态新闻
  PolArticlelist: []//时政新闻
})
const params = reactive({
  articleLableID: '',//文章标签
  articleTitle: '',//文章主题
})
const listLable = ["科幻世界", "动态新闻", "时政新闻"]
// 文章类型字典
let articletags = reactive([])
onMounted(async () => {
  // 获取文章标签
  const articletag = await findVarietyDict()
  articletags = articletag.data
  // 通过标签获取文章
  await getArticleByLable()
})
onUpdated(async()=>{
  try{
    if(statusEx.statusEdit){
      statusEx.exEditStatusFalse()
      state.DynaArticlelist=[]
      state.PolArticlelist=[]
      state.SciArticlelist=[]
       // 通过标签获取文章
      await getArticleByLable()
    }
  }catch(res){
    console.log(res);
    
  }
  
})

/** 获取科学资讯新闻 */
async function getArticleByLable() {
  try {
    for (var i = 0; i < listLable.length; i++) {
      //根据标签名称或者 标签id 用于查询文章
      params.articleLableID = (articletags.find(item => item.articleLableName === listLable[i])).articleLableID;
      // 根据标签获取文章
      const tableData = await findArticle(params)
      state[i] = tableData.data
    }
  } catch (err) {
    console.log("getUser error")
  }
}
/**
  * 路由跳转文章具体内容
  */
const showArticle = (articleContend, articleID) => {
  //路由跳转
  router.push({
    name: 'articlePage',
    query: {
      article: articleContend,
      articleID: articleID
    }
  })
}
</script>
<template>
  <!-- 主容器 -->
  <div class="maincontent">
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel>
        <el-carousel-item v-for="item in state[0]" v-if="state[0]" :key="item">
          <h3 class="small justify-center" text="2xl">
            <div class="imgcontent" @click="showArticle(item.articleContent, item.articleID)">
              <img class="imgs" :src="item.imgURL" alt="">
            </div>
          </h3>
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
          <!-- 动态新闻目录 -->
          <ul>
            <li v-for="item in state[1]" :key="item.articleID">
              <div class="flex-container" @click="showArticle(item.articleContent, item.articleID)">
                <!-- 使用v-bind指令绑定图片的src属性 -->
                <img v-bind:src="item.imgURL" />
                <!-- 使用插值表达式显示文字描述 -->
                <div class="describe">
                  <h4>{{ item.articleTitle }}</h4>
                  <p class="vicearticle" v-html="item.articleContent"></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 右侧新闻列表 -->
      <div class="righttnews">
        <div>
          <!-- **把图标调大点** -->
          <i class="iconfont icon-xinwen_o icons"></i>
          <span>时政新闻</span>
          <!-- 时政新闻目录 -->
          <ul>
            <li v-for="item in state[2]" :key="item.articleID">
              <div class="flex-container" @click="showArticle(item.articleContent, item.articleID)">
                <!-- 使用插值表达式显示文字描述 -->
                <div class="describe">
                  <div class="describefont">
                    {{ item.articleTitle }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="rightArticle">

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

.affixs {
  width: 100%;

}

.el-menu-demo {
  width: 100%;
}

/* 文章主题占比 */
.contentarticle {
  width: 100%;
}

/* 主容器样式 */
.maincontent {
  margin-top: 18px;
  /* background-color: rgb(83, 214, 114); */
  margin-left: 18%;
  margin-right: 18%;
}

/* 轮播图样式 */
.carousel {
  /* background-color: aquamarine; */
  width: 100%;
  height: 300px;
}

/* 动态新闻样式 */
.leftnews {
  margin-top: 20px;
  /* background-color: aquamarine; */
  float: left;
  width: 60%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  /* 显示的行数 */
  text-overflow: ellipsis;

}

/* 时政新闻样式  */
.righttnews {
  margin-top: 20px;
  /* background-color: rgb(104, 45, 176); */
  float: right;
  margin-left: 2%;
  width: 38%;
}

.imgcontent {
  display: flex;
  align-items: center;
  justify-content: center;
}

.describe:hover {
  color: #029496e5;
}

/* 点击未松手样式变化 */
.describe:active {
  background-color: #d6dede;
}

.flex-container {
  display: flex;
  /* align-items: center; */
}

/* 动态新闻样式 */
.flex-container img {
  width: 25%;
  height: auto;
}

/* 卡片描述 超过n行 省略为...
 */
.vicearticle {
  width: 80%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 显示的行数 */
  text-overflow: ellipsis;

}

ul {
  list-style: none;
}

li {
  margin-top: 20px;
}

.describe {
  width: 100%;
  margin-left: 15px;
}

/* 图片样式 */
.imgs {
  align-self: flext-start;
}

.describefont {
  font-size: 18px;
}

/* 调整 时政新闻的文字样式 */
.describefont:hover {
  font-size: 18px;
  background-color: #F0FFFF;
  color: #00CED1;
}</style>
