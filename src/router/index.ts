import { createRouter, createWebHashHistory,RouteRecordRaw,RouteRecordName} from "vue-router";
import { useGlobalStore } from "@/store/modules/global";
import { ElNotification } from "element-plus";

// Project
import ProjectList from "@/views/ProjectList/ProjectList.vue";
import ProjectDetail from "@/views/ProjectDetail/ProjectDetail.vue";
import ProjectMain from "@/views/ProjectDetail/KanbanMain/ProjectMain.vue";
import ProjectTodoList from "@/views/ProjectDetail/TodoList/TodoList.vue";
import ProjectFileList from "@/views/ProjectDetail/FileList/FileList.vue";
import ProjectDocumentList from "@/views/ProjectDetail/DocumentList/DocumentList.vue";
import ProjectSettings from "@/views/ProjectDetail/ProjectSettings/ProjectSettings.vue";
import MemberList from "@/views/ProjectDetail/MemberList/MemberList.vue"

// Member
import MemberMain from "@/views/MemberMain/MemberMain.vue";
import MemberInfo from "@/views/MemberMain/MemberInfo.vue";

// Login
import Login from "@/views/Login/Login.vue";
import LoginComponent from "@/components/Login/Login.vue";
import RegisterComponent from "@/components/Login/Register.vue";

const routes:RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/Login"
  },
  {
    component: Login,
    path:"/Login/Main",
    redirect: "/Login",
    children:[
      {
        path:'/Register',
        name: 'Register',
        component: RegisterComponent
      },
      {
        path:'/Login',
        name: 'Login',
        component: LoginComponent
      },
    ]
  },
  {
    path: "/Project/Instances",
    component: ProjectList,
    name: "ProjectInstances",
  },
  {
    path: "/Member",
    name: "MemberMain",
    component: MemberMain,
    redirect: '/Member/Info',
    children: [
      {
        path: "Info",
        name: "MemberInfo",
        component: MemberInfo,
      },
    ],
  },
  {
    path: "/Project/:id",
    name: "ProjectDetail",
    component: ProjectDetail,
    redirect: {name:"ProjectDetailMain"}, // 默认入Main
    children: [
      {
        path: "Main",
        name: "ProjectDetailMain",
        component: ProjectMain,
      },
      {
        path: "MemberList",
        name: "MemberList",
        component:MemberList,
      },
      {
        path: "List",
        name: "ProjectTodoList",
        component: ProjectTodoList,
      },
      {
        path: "FileList",
        name: "ProjectFileList",
        component: ProjectFileList,
      },
      {
        path: "DocumentList",
        name: "ProjectDocumentList",
        component: ProjectDocumentList,
      },
      {
        path: "Settings",
        name: "ProjectSettings",
        component: ProjectSettings,
      },
    ],
  },
];

const router =  createRouter({
  history: createWebHashHistory(),
  routes, // routes: routes 缩写
});

// 无须Token可访问的路径
const passURL:string[] = ["/Login","/Register"]

router.beforeEach((to,from,next)=>{
  // 判断 token是否存在
  if(useGlobalStore().token){
    // 这里应该是一个请求，用Token更新数据
    next()
  }else {
    
    if(passURL.indexOf(to.path) != -1){
      next()
    }else {
      ElNotification({
        title:"登录失效",
        message:"您的登录已失效，请重新登录",
        type:"error"
      })
      next("/Login")
    }
  }
})

export default router;