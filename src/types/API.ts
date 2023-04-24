
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
     * 获取当前用户所有项目
     */
    ALL_PROJECT:'/project/list',
    /**
     * 创建项目
     */
    CREATE:'/project/create',
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
    }

  }
};

export {
  API
}