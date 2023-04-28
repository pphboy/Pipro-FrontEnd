
const API= {
  /**
   * 系统接口集合接口
   */
  SYSTEM:{
    /**
     * 登录接口
     */
    LOGIN:'/system/login',
    /**
     * 注册接口
     */
    REGISTER:'/system/register',
  },
  PROJECT:{
    /**
     * GET 获取全局所有用户的列表
     */
    MEMBER:{
      /**
       * GET 获取全局所有用户列表
       */
      LIST:(projectId?:number):string =>`/project/member/${projectId}`,
      /**
       * POST 为项目添加用户 
       */
      DELETE:'/project/member/delete',
      /**
       * POST 为项目添加用户 
       */
      ADD:'/project/member',
    },
    /**
     * GET 获取当前用户，所有合法的任务
     */
    MISSION_LIST:'/project/missions',
    /**
     * 获取当前用户所有项目
     */
    ALL_PROJECT:'/project/list',
    /**
     * 创建项目
     */
    CREATE:'/project/create',
    /**
     * GET 获取当前用户的当前任务
     */
    LIST:(id?:number):string=>`/project/${id}/list`,
    /**
     * 获取当前项目详情
     * /project/detail/{id}
     */
    PROJECT_DETAIL:'/project/detail/',
    /**
     * 项目标签
     */
    LABEL:{
      /**
       * 标签创建
       * POST
       * /project/label
       */
      CREATE:"/project/label",
      /**
       * DELETE方法
       * 标签删除${id}
       */
      DETELE:(id:number):string=>`/project/label/${id}`
    },
    /**
     * 任务
     */
    MISSION:{
      /**
       * POST 创建任务
       */
      CREATTE:"/project/mission",
      /**
       * POST 项目更新接口
       */
      CHANGE :'/project/mission/change',
    },
    /**
     * 看板的接口
     */
    KANBAN:{
      /**
       * PUT 创建看板
       */
      CREATE:"/project/kanban",
      /**
       * POST 更新看板
       */
      UPDATE:"/project/kanban",
      /**
       * DELETE 删除
       */
      DELETE:"/project/kanban/",
    },
    /**
     * 文件目录
     */
    FILE_DIRECTORY:{
      /**
       * GET 当前项目中所有的目录及相关信息
       */
      ALL:(projectId?:number)=>`/project/directory/${projectId}`,
      /**
       * POST 创建目录
       */
      CREATE:"/project/directory",
      /**
       * PUT 文件重命名
       */
      RENAME:"/project/directory",
      /**
       * DELETE 删除文件
       */
      DELETE:"/project/directory",
    },
    /**
     * 文件目录
     */
    FILE:{
      /**
       * 引导作用
       */
      BASE:'/project/file',
      /**
       * 
       * POST
       * @returns 文件上传路径
       */
      UPLOAD:(projectId:number,directoryId:number)=>`/project/file/project/${projectId}/${directoryId}`,
      /**
       * POST 重命名
       */
      RENAME:'/project/file',
      /**
       * DELETE 删除
       */
      DELETE:'/project/file',
    },
    /**
     * 文件目录
     */
    DOCUMENT_DIRECTORY:{
      /**
       * GET 当前项目中所有的目录及相关信息
       */
      ALL:(projectId?:number)=>`/project/document/directory/${projectId}`,
      /**
       * POST 创建目录
       */
      CREATE:"/project/document/directory",
      /**
       * PUT 文件重命名
       */
      RENAME:"/project/document/directory",
      /**
       * DELETE 删除文件
       */
      DELETE:"/project/document/directory",
    }

  }
};

export {
  API
}