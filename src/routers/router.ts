// 2. 定义一些路由
// import HelloWorld from "../components/HelloWorld.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Mainpage from '../view/mainPage.vue';
import messagePage from '../view/messagePage.vue';
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  // 首页
    { path: "/", component: Mainpage },
    // 科普资讯路由
    {
      path: "/messagePage", 
      component: messagePage ,
    }

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
