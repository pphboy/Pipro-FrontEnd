import {createRouter,createWebHashHistory} from 'vue-router'


import Main from '@/views/Main/Main.vue';


const routes = [
  {path:"/",component: Main}
]


export default createRouter({
  history: createWebHashHistory(),
  routes // routes: routes 缩写
})