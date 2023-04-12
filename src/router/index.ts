import {createRouter,createWebHashHistory} from 'vue-router'


import Main from '@/views/Main/Main.vue';
import Login from '@/views/Login/Login.vue';
import ProjectList from '@/views/ProjectList/ProjectList.vue';


const routes = [
  {path:"/",component: Main},
  {path:"/Login",component: Login},
  {path:"/ProjectList",component: ProjectList},
]


export default createRouter({
  history: createWebHashHistory(),
  routes // routes: routes 缩写
})