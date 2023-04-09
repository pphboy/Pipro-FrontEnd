import {createRouter,createWebHashHistory} from 'vue-router'


import Main from '@/views/Main/Main.vue';
import Login from '@/views/Login/Login.vue'


const routes = [
  {path:"/",component: Main},
  {path:"/Login",component: Login}
]


export default createRouter({
  history: createWebHashHistory(),
  routes // routes: routes 缩写
})