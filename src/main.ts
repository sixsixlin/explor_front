import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import { createPinia } from "pinia";
import { createApp } from 'vue';
import App from './App.vue';
import router from "./routers/router";
const app = createApp(App)
app.use(mavonEditor);
app.use(ElementPlus)
app.use(createPinia());
app.use(router);
app.mount('#app')
