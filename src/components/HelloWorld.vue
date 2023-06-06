<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { findArticle } from "../services/article.ts";
const params=reactive({
  articleLableID:'',
  articleTitle:'农业'
})
defineProps<{ msg: string }>()
const count = ref(0)

onMounted(async ()=>{
  await getUser()
})
async function getUser() {
  try {
    const tableData =await findArticle(params)
    console.log(tableData);
  }catch (err){
    console.log("getUser error")
  }
}



</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
