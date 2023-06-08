// 2. 定义一些路由
// import HelloWorld from "../components/HelloWorld.vue";
import { createRouter, createWebHashHistory } from "vue-router";
// import messagePage from '../view/messagePage.vue';
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  // 首页
    { path: "/home", 
      name:"home",
      component: ()=>import('../view/mainPage.vue')
    },
    // 科普资讯路由
    {
      path: "/messagePage", 
      name:'messagePage',
      component: ()=>import('../view/messagePage.vue') ,
    }, {
      path:"/articlePage",
      name:"articlePage",
      component:()=>import('../view/articlePage.vue')
    },
    {
      path:"/sciencePage",
      name:"sciencePage",
      component:()=>import('../view/sciencePage.vue')
    }

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
 
export default router;
