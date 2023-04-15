import {createRouter,createWebHashHistory} from 'vue-router'


import Main from '@/views/Main/Main.vue';
import Login from '@/views/Login/Login.vue';
import ProjectList from '@/views/ProjectList/ProjectList.vue';
import ProjectDetail from '@/views/ProjectDetail/ProjectDetail.vue';
import ProjectMain from '@/views/ProjectDetail/KanbanMain/ProjectMain.vue';
import ProjectTodoList from '@/views/ProjectDetail/TodoList/TodoList.vue'
import ProjectFileList from '@/views/ProjectDetail/FileList/FileList.vue'
import ProjectDocumentList from '@/views/ProjectDetail/DocumentList/DocumentList.vue'
import ProjectSettings from '@/views/ProjectDetail/ProjectSettings/ProjectSettings.vue'



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
      },
      {
        path:"List",
        name:"ProjectTodoList",
        component: ProjectTodoList
      },
      {
        path:"FileList",
        name:"ProjectFileList",
        component: ProjectFileList
      },
      {
        path:"DocumentList",
        name:"ProjectDocumentList",
        component: ProjectDocumentList
      },
      {
        path:"Settings",
        name:"ProjectSettings",
        component:ProjectSettings
      },

    ]
  }
]


export default createRouter({
  history: createWebHashHistory(),
  routes // routes: routes 缩写
})