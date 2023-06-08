<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
const state =reactive({
  Article:"",
})
onMounted(()=>{
	const Route = useRoute(); //vue3 route传参通过userRoute接收
  // 获取传参(文章) 并展示
  state.Article=  Route.query.article
})

</script>
<template>
  <div class="aritcleContent">
    <div v-html=state.Article >
    </div>
  </div>

</template>
<style scoped>
.aritcleContent{
  margin-top: 18px;
  margin-left: 18%;
  margin-right: 18%;
}
</style>