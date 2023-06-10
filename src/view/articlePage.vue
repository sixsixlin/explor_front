<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { findArticle, updateArticle } from '../services/article';
import { qualification } from '../services/user';
import { articleStatusEditStore } from '../store/statusEdit';
import { Article } from '../types/article';
const statusEx = articleStatusEditStore()
const editVisible = reactive<{Visible: boolean ,atrticleVisible:boolean}>({
    Visible: false ,
    atrticleVisible:true

})//编辑文章按钮是否显示
const state = reactive({//文章信息
  Articles: "",
})
const articlecondition = reactive({//用于文章查询
  articleID: ''
})
// seek Result
var articleresult = reactive<Article>({
  articleID: -1,   //文章id
  articleTitle: '', //文章标题
  articleInitTime: '', //文章创建时间
  articleContent: '',//文章内容
  articleMd: '', //文章格式
  userID: -1, //修改者的id
  articleLableID: '', //文章标签id;
  imgURL: '',//文章图片路径;
})
// 文章标签
const articleVarietyDict = reactive([
  { articleLableName: '动态新闻', articleLableID: 1 },
  { articleLableName: '时政新闻', articleLableID: 2 },
  { articleLableName: '科学资讯', articleLableID: 3 },
  { articleLableName: '科幻世界', articleLableID: 4 },
])
// 用户信息
const status = reactive<{
  token: string,
  qualification: number
}>({
  token: '',
  qualification: -1
})
const Route = useRoute(); //vue3 route传参通过userRoute接收
onMounted(async () => {
  // 获取传参(文章) 并展示
  state.Articles = Route.query.article
  articlecondition.articleID = Route.query.articleID//查询文章 
  getQualification()
})
// 获取用户资格状态
async function getQualification() {
  try {
    status.token = localStorage.getItem("token") || ''
    const res = await qualification(status)  // 查找用户资格状态
    status.qualification = res.data//资格存储资格状态
  } catch (res) {
    console.log("error" + res);
  }
}
//编辑文章
async function editArticlebtn() {
  // 先查再编辑
  const res = await findArticle(articlecondition)
  editVisible.Visible = true
  articleresult = res.data[0]
}

// 修改添加文章
async function onSubmit() {
  try {
    const res = await updateArticle(articleresult)
    if (res.data == 1) {
      // 修改 文章自刷新 状态
      statusEx.exEditStatusTrue()
    }
    ElMessage({
      message: '文章修改成功',
      type: 'success',
    })
  } catch (res) {
  }
  //关闭对话框
  editVisible.Visible = false
}
const updateContent=()=>{

}
</script>
<template>
  <div class="aritcleContent">
    <!-- 编辑文章按钮 -->
    <div class="editbtn" v-if="status.qualification == 3">
      <el-button type="primary" @click="editArticlebtn">文章编辑</el-button>
    </div>
    <div v-html=state.Articles >
    </div>

    <!-- 对话框 -->
    <!--添加对话框  -->
    <el-dialog title="编辑文章" v-model="editVisible.Visible" fullscreen center>
      <el-form :model="articleresult" style="margin-top: 10px">
        <el-row>
          <el-col :span="14">
            <el-form-item label="文章名称" label-width="120px" prop="title">
              <el-input disabled v-model="articleresult.articleTitle" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="文章标签" label-width="120px" prop="title">
              <el-select disabled v-model="articleresult.articleLableID">
                <el-option v-for="item in articleVarietyDict" :key="item.articleLableID" :label="item.articleLableName"
                  :value="item.articleLableID" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 上传图片 -->
          <el-form-item label="标题图" label-width="120px">
            <img class=imgAvatar :src="articleresult.imgURL">
          </el-form-item>
        </el-row>
        <br>
        <!-- 富文本编辑器 -->
        <el-form-item label-width="120px" label="内容" prop="contentMd">
          <mavon-editor ref="md" v-model="articleresult.articleMd" placeholder="输入文章内容..." style="height: 500px" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer footerbtn">
        <el-button @click="editVisible.Visible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped>
.aritcleContent {
  margin-top: 18px;
  margin-left: 18%;
  margin-right: 18%;
}

/*文章编辑按钮 */
.editbtn {
  display: flex;
  flex-direction: row-reverse;
}

.imgAvatar {
  width: 400px;
  height: 350px;
}

.footerbtn {
  margin-left: 20%;
}
</style>