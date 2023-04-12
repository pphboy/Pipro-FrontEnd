<script lang="ts" setup>
import { Memo} from '@element-plus/icons-vue'
</script>
<template>
  
  <header>
    <el-row class="header_pro">
      <el-col :span="12">
        <div >
          <img  style="height:50px;" src="@/assets/longlogo.jpg">
        </div>
      </el-col>
      <el-col :span="12">
        <div class="header_left_sider">
            <div>
              <img class="iconimg" src="@/assets/qq.png"  alt="头像">
            </div>
                <div style="line-height:20px;" >
                  <div>UserNameAB</div>
                  <div>Type</div>
                </div>
                <div>
                  <el-dropdown class="menu-btn">
                    <el-button style="border: 0;padding:10px;">
                      <el-icon><Memo /></el-icon>
                    </el-button>

                    <span class="el-dropdown-link">
                      Dropdown List
                      <el-icon class="el-icon--right">
                        <arrow-down />
                      </el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>

                </div>
        </div>
      </el-col>

    </el-row>
  </header>


</template>
<style scoped>

.header_left_sider{
  float:right;
  line-height: 50px;
  display: flex;
  align-items: center;
}
.header_left_sider>div>img {
  display: inline-block;
  width: 45px;
  height: 45px;
  vertical-align: middle; /* 垂直居中 */
}
.header_left_sider div {
  margin-right: 5px;
  justify-self: center;
}
.menu-btn {

  vertical-align: middle; /* 垂直居中 */
}


.header_pro {
  height: 50px;
}

header {
  padding-bottom: 2px;
  border-bottom: 2px solid skyblue;
}
.iconimg{ 
}
</style>