import {createRouter,createWebHashHistory} from 'vue-router'


import Main from '@/views/Main/Main.vue';
import Login from '@/views/Login/Login.vue';
import ProjectList from '@/views/ProjectList/ProjectList.vue';
import ProjectDetail from '@/views/ProjectDetail/ProjectDetail.vue';
import ProjectMain from '@/views/ProjectDetail/ProjectMain.vue';



const routes = [
  {path:"/",component: Main},
  {path:"/Login",component: Login},
  {path:"/ProjectList",component: ProjectList},
  {
    path:'/Project',
    name: 'ProjectDetail',
    component: ProjectDetail,
    redirect: '/Project/Main', // 默认入Main
    children:[
      {
        path:"Main",
        name:"ProjectDetailMain",
        component: ProjectMain
      }   
    ]
  }
]


export default createRouter({
  history: createWebHashHistory(),
  routes // routes: routes 缩写
})