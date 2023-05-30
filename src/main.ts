import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from "pinia";
const store = createPinia()

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
