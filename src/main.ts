import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from "pinia";
import { createApp } from 'vue';
import App from './App.vue';
import router from "./routers/router";
const store = createPinia()

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router);
app.mount('#app')
