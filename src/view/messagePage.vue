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
    var data = articletags.find(item => item.articleLableName === '科学资讯');
    params.articleLableID =data.articleLableID
    // 根据标签获取文章
    const tableData =await findArticle(params)
    state.Articlelist = tableData.data
    console.log(state.Articlelist[0]);
    console.log(state.Articlelist[0].articleContent);
  }catch (err){
    console.log("getUser error")
  }
}
const list= [
        {
          id: 1,
          image: "https://www.bing.com/images/search?view=detailV2&ccid=2SVkhK%2fY&id=B02783D8FBBA8823FBB359BB50F8FCBD51305342&thid=OIP.2SVkhK_YtWBCkuHkDevbygHaEK&mediaurl=https%3a%2f%2fwww.bingimg.cn%2fdown%2fOHR.BubbleNebula_ZH-CN2787112807_1920x1080.jpg&exph=1080&expw=1920&q=%e5%9b%be&simid=608004951142976433&FORM=IRPRST&ck=8E1419DEDD1EF8849D2D5F7FFCE9730C&selectedIndex=2",
          description: "This is a random image",
        },
        {
          id: 2,
          image: "https://www.bing.com/images/search?view=detailV2&ccid=oX4T0LU1&id=F0A82A3E99EC7E2D3A0211E7E20085D2AADDCB56&thid=OIP.oX4T0LU1Civ6PI0J-tZyLgHaEK&mediaurl=https%3a%2f%2fwww.bingimg.cn%2fdown%2fOHR.EvergladesShowers_ZH-CN9209435866_1920x1080.jpg&exph=1080&expw=1920&q=%e5%9b%be&simid=608053359698272589&FORM=IRPRST&ck=FBD4EB7702199F642E0802E7FBB1C80D&selectedIndex=1",
          description: "This is another random image",
        },
        {
          id: 3,
          image: "https://picsum.photos/id/239/200/300",
          description: "This is yet another random image",
        },
      ]
</script>
<template>
<!-- 主容器 -->
  <div class="maincontent">
    <div class="stitle">
      <i class="iconfont icon-xinwen"></i>
      <h3>科普资讯</h3>
    </div>
    <el-divider />
    <!-- 新闻目录 -->
    <div class="catecontent">
      <div class="articled">
       <!-- 使用v-for指令遍历列表数据 -->
       
      <ul>
        <li  v-for="item in state.Articlelist" :key="item.articleID">
          <!-- 使用flex布局让图片和文字在一行 -->
          <div class="flex-container">
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
        <!-- <ul 
        v-for="item in state.Articlelist"
        v-if="state.Articlelist "
        >
          <li > <div v-html="item.articleContent"></div></li>

        </ul> -->
        
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