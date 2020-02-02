   <template>
  <div class="login_container">
    <div class="login_box">
      <!-- 图像区域 -->
      <div class="avatar_box">
        <img src="../assets/imgs/panda.jpg" alt />
      </div>

      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="Loginform"
        :rules="rules"
        ref="loginRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont  icon-user" v-model="Loginform.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="Loginform.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

   <script>
export default {
  data: function() {
    return {
      Loginform: {
        username: "Great222",
        password: "123456"
      },
      rules: {
        username: [
          {
            require: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 5,
            max: 8,
            message: "用户名在5到8位之间",
            trigger: "blur"
          }
        ],
        //验证用户名
        password: [
          {
            require: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 10,
            message: "密码在6到10位之间",
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginRef.resetFields()
      console.log(this.$refs.loginRef)
    },
    login() {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return
        //登录验证
        // var consult = await this.$http.post("地址", this.Loginform); //this 指向问题会犯错
        // if (consult.data.meta.status == "200") {
        //   console.log("登陆成功");
        // }
        //伪数据
        if (true) {
          window.sessionStorage.setItem("token", "索飞")
          this.$message({
            type: "success",
            duration: 1000,
            message: "登陆成功"
          })
          this.$router.push("/home")
        }
      })
    }
  }
}
</script>

   <style scoped>
.login_container {
  background: #2b4b6b;

  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #eee;

  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  background: #fff;
}

.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #eee;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
</style>