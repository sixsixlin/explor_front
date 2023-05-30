<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {getUserInfo} from "../services/user.ts";


defineProps<{ msg: string }>()

const count = ref(0)

const state = reactive({
  adminId: '',
  adminName: '',
  adminPassword: '',
  sex: ''

})
onMounted(async ()=>{
  try {
    const data = await getUserInfo()
    console.log(data)
  }catch (err){
    console.log(err)
  }
})

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
