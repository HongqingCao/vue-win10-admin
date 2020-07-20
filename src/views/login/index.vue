<template>
  <div class="login-warpper">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
     <div class="title-warpper">
        <h1>你好！</h1>
        <h4>Hello! let's get started</h4>
      </div>
      <el-form-item>
        <i class="el-icon-user icon-left"></i>
        <el-input v-model="loginForm.account" autoComplete="on" class="input-com"  placeholder="账号"/>
      </el-form-item>
      <el-form-item>
        <i class="el-icon-user icon-left"></i>
        <el-input ref="password" v-model="loginForm.password" autoComplete="on" class="input-com" placeholder="密码" :type="passwordType" />
        <i class="el-icon-view icon-right" :class="{iconClike:!passwordType}" @click="showPassword"></i>
      </el-form-item>
      <div class="login-btn" @click="handleLogin">登录</div>
    </el-form>
  </div>
</template>

<script>
import { isPassword } from "@/utils/validate"
import { mapGetters } from 'vuex' 
import { hasPagePermission } from '@/utils/permission'
export default {
  name: "Login",
  computed: {
    ...mapGetters([
      'showMenu',
      'showMessage',
      'nowWin'
    ])
 },
  data() {
  const validateAccount = (rule, value, callback) => {
    if (!value) {
      callback(new Error("账号不能为空"));
    } else {
      callback();
    }
  };
  const validatePassword = (rule, value, callback) => {
    if (!isPassword(value)) {
      callback(new Error("密码不能少于6位"));
    } else {
      callback();
    }
  };
    return {
      passwordType: "password",
      loginForm: {
        account: "",
        password: "",
        type:2
      },
      redirect: undefined,
      otherQuery: {},
      loginRules: {
        account: [{required: true, trigger: "blur", validator: validateAccount}],
        password: [{required: true, trigger: "blur", validator: validatePassword}]
      },
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    showPassword () {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if(valid) {
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              // 登陆如果是系统退出进来的，判断一下是否有页面权限
              if (hasPagePermission(this.redirect)) {
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              } else {
                this.$router.push({path: '/'})
              }
            })
            .catch(() => {
            })
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-warpper {
  width: 100%;
  padding: 10%;
  min-height: 100vh;
  overflow: hidden;
  background:linear-gradient(to right, #90caf9, #047edf 99%);
  
  .title-warpper {
    h1 {
      font-family: Source Han Sans CN;
      font-weight: 500;
    }
  }

  .login-form {
    width:35%;
    padding: 50px;
    background: #ffffff;
    margin-left: auto !important;
    margin-right: auto !important;

    .icon-left {
      position: absolute;
      left: 15px;
      top: 15px;
      font-size: 16px;
      z-index: 99;
    }

    .icon-right {
      position: absolute;
      right: 15px;
      top: 15px;
      font-size: 16px;
      z-index: 99;
    }

    .iconClike {
      color: #409eff;
    }

    ::v-deep{

      .el-input {
        box-sizing: border-box;
        input {
          padding-left: 45px;
          height: 48px;
          line-height: 48px;
          font-size: 14px;
        }
      }
    }

    .login-btn {
      width: 100%;
      height: 48px;
      line-height: 48px;
      border-radius:4px;
      color: #ffffff;
      background: linear-gradient(to right, #da8cff, #9a55ff);
      text-align:center;
      vertical-align:middle;
      cursor: pointer;
    }
  }
}
</style>