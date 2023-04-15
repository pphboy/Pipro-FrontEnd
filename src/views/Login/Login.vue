<script setup lang="ts">
import Footer from '@/views/Footer/Footer.vue';

</script>

<template>

  <el-row class="main">

    <el-col >
      <el-card class="form_card">
        <el-row :gutter="30">
          <el-col class="login_left_side" :span="17">
            <div>
              <h1>
                PiPRO 社区版
              </h1>
              <h3>
                提高你的软件工程实践体验
              </h3>
              <p>
                一月磨一剑。

                <!-- 有人说，“你们只会从1到100，不会从0到1”。<br>
                有人说，“不就是抄吗，谁不会啊”。<br>
                有人说，“习惯用盗版，拿来主义。”。<br>
                有人说，“要现实看待，我们与**的差距非常还是非常大”。<br>

                <br>

                软件工程，到工业软件工程。<br>

                请站起来，工程强国。 -->
                
              </p>
            </div>
          </el-col>
          <el-col :span="7" >
              <el-row class="login_right_side">
                <el-col>
                  <h3>
                    登录 / 注册
                  </h3>
                </el-col>
                <el-col :span="22">
                  <el-input></el-input>
                </el-col>
                <el-col :span="22">
                  <br>
                  <el-input></el-input>
                </el-col>
                <el-col >
                  <br>
                  <el-button @click="$router.push({name:'ProjectInstances'})">登录</el-button>
                  <el-button>注册</el-button>
                </el-col>
              </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    
  </el-row>
  <div>
  </div>

  <Footer></Footer>

</template>
<style scoped>

  .main {
    background-image: url('@/assets/loginback.png');
    background-repeat: no-repeat;
    background-size: cover;

    min-width: 1040px;
    height: calc(100vh - 80px) ;
    padding-top: calc(100vh - 78vh);
  }

  .form_card {
    width: 1000px;
    height: 500px;
    margin: 0 auto;
  }
  .login_left_side {
    color: white;
    height: 500px;
    background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='96' height='144' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(199, 100%, 50%, 1)'/><path d='M0 0v4h4v4h4V4h4V0H0zm20 0v4h-4v4h-4v4H8v4H4v-4H0v12h4v4h4v-4h4v-4h4v-4h4v-4h4V8h4V4h4V0H20zm20 0v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4H8v4H4v-4H0v12h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h-4v4h-4v4h-4v4h-4v4h-4v4H8v4H4v4H0v12h4v-4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h12v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4V8h4V4h4V0H40zm16 0v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4V28h-4v-4h-4v-4h-4v-4h-4v-4h-4V8h-4V4h-4V0H56zm20 0v4h4v4h4v4h4v4h4v4h4V8h-4V4h-4V0H76zM52 8v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-8h-4v-4h-4v-4h-4v-4h-4v4h-4v4h-4v4h-4v4h4v4h4v-4h4v-4h4v8h-4v4h-4v4h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v4h4v4h4v4h4v4h4v4h4v8h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v8h-4v4h-4v4h-4v4h-4v4h-4v4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4v4h4v4h4v8h-4v-4h-4v-4h-4v4h-4v4h4v4h4v4h4v4h4v-4h4v-4h4v-4h4v-8h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-8h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-8h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4v-4h-4V8h-4zm40 40v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h4v4h4v4h4v4h4v4h4v4h4v4h4V88h-4v-4h-4v-4h-4v-4h-4v-4h4v-4h4v-4h4v-4h4V48h-4zM0 52v4h4v-4H0zm4 8v4H0v12h4v-4h8v4H8v4H4v4H0v12h4v-4h4v-4h4v-4h4v-4h4v-4h4v-4h-4v-4h-4v-4h-4v-4H4zm88 8v4h-4v4h4v4h4V68h-4zm0 40v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h-4v4h12v-4h4v-4h4v-4h4v-4h4v-4h4v-4h4v-12h-4zM4 120v4H0v12h4v-4h4v4h4v4h4v4h12v-4h-4v-4h-4v-4h-4v-4h-4v-4H8v-4H4zm88 8v4h-4v4h-4v4h-4v4h12v-4h4v-12h-4zM4 140v4h4v-4H4z'  stroke-width='1' stroke='none' fill='hsla(199, 58%, 55%, 1)'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
  }
  .login_left_side div{
    margin: 50px;
  }
  :deep() .el-card__body {
    margin: 0;
    padding: 0;
    border: 0;


  }
  .login_right_side {
    margin-top: 50px;
  }

  :deep() .el-card {
    border: 0;
  }
</style>