
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
    }

  }
};

export {
  API
}