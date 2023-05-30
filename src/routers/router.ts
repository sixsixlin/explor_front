// 2. 定义一些路由
// import HelloWorld from "../components/HelloWorld.vue";
import { createRouter, createWebHashHistory } from "vue-router";

// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    // { path: "/", component: HelloWorld },

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
