<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { findArticle } from '../services/article';
import { qualification } from '../services/user';
import { Article } from '../types/article';
const editVisible=reactive({Visible:false})//编辑文章按钮是否显示
const state =reactive({//文章信息
  Articles:"",
})
const articlecondition = reactive({//用于文章查询
articleID:''
})
// seek Result
var articleresult = reactive<Article>({
    articleID:-1 ,   //文章id
    articleTitle:'', //文章标题
    articleInitTime:'', //文章创建时间
    articleContent:'',//文章内容
    articleMd:'', //文章格式
    userID:-1 , //修改者的id
    articleLableID:'', //文章标签id;
    imgURL:'',//文章图片路径;
})
// 文章标签
const articleVarietyDict=reactive([
  {articleLableName:'动态新闻',articleLableID:1},
  {articleLableName:'时政新闻',articleLableID:2},
  {articleLableName:'科学资讯',articleLableID:3},
  {articleLableName:'科幻世界',articleLableID:4},

])
// 用户信息
const status=reactive<{
  token:string,
  qualification:number
}>({
  token:'',
  qualification:-1
})
onMounted(()=>{
	const Route = useRoute(); //vue3 route传参通过userRoute接收
  // 获取传参(文章) 并展示
  state.Articles=Route.query.article 
  articlecondition.articleID = Route.query.articleID//查询文章
  getQualification()//获取资格状态
})
// 获取用户资格状态
async function getQualification(){
  try{
    status.token = localStorage.getItem("token") ||''
    const res = await qualification(status)  // 查找用户资格状态
    status.qualification=res.data//资格存储资格状态
  }catch(res){
    console.log("error"+  res);
  }
}
//编辑文章
async function editArticle() {
  const res = await findArticle(articlecondition)
  editVisible.Visible = true
  articleresult = res.data[0]
  console.log(articleresult);
}
</script>
<template>
  <div class="aritcleContent">
    <!-- 编辑文章按钮 -->
    <div class="editbtn" v-if="status.qualification == 3">
      <el-button type="primary" @click="editArticle">文章编辑</el-button>
    </div>
    <div v-html=state.Articles >
    </div>
    
    <!-- 对话框 -->
 <!--添加对话框  -->
 <el-dialog
      title="编辑文章"
      v-model="editVisible.Visible"
      fullscreen
      center
    >
      <el-form
        :model="articleresult"
        style="margin-top: 10px"
      >
        <el-row>
          <el-col :span="14">
            <el-form-item
              label="文章名称"
              label-width="120px"
              prop="title"
            >
              <el-input disabled  v-model="articleresult.articleTitle" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="文章标签"
              label-width="120px"
              prop="title"
            >
              <el-select disabled v-model="articleresult.articleLableID">
                <el-option
                  v-for="item in articleVarietyDict"
                  :key="item.articleLableID"
                  :label="item.articleLableName"
                  :value="item.articleLableID"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 上传图片 -->
            <el-form-item label="标题图"      label-width="120px">
                  <img
                  class =imgAvatar
                    :src="articleresult.imgURL"
                  >
            
            </el-form-item>
        </el-row>
        <br>
        <!-- 富文本编辑器 -->
        <!-- <el-row>
          <el-col :spam="24">
            <el-form-item
            label-width="120px"
              label="内容"
              prop="contentMd"
            >
              <mavon-editor
                ref="md"
                v-model="articleresult.articleMd"
                placeholder="输入文章内容..."
                style="height: 500px"
              />
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible.Visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editVisible.Visible = false"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped>
.aritcleContent{
  margin-top: 18px;
  margin-left: 18%;
  margin-right: 18%;
}
/*文章编辑按钮 */
.editbtn{
  display: flex;
  flex-direction: row-reverse;
}
.imgAvatar {
  width: 400px;
  height: 350px;
}
</style>