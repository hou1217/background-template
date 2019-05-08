<template>
  <div class="login-wrap">
    <div class="ms-title">template</div>
    <div class="ms-login">
      <el-form :model="userForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="userForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="userForm.password"
                    @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import LoginApi from '@/service/LoginApi'
export default {
  name: 'Login',
  data() {
    return {
      userForm: {
        username: 'yezeyu',
        password: '123456'
      },
      rules: {
        username: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    submitForm() {
      console.log(this.userForm);
      //调用登录接口
      LoginApi.login(this.userForm)
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          console.debug('登陆成功');
          this.$router.push({
            path: '/home'
          });
        }
      })
      .catch((err)=>{
        console.error('数据异常：', err);
      });
    }
  }
}
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
