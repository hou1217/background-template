<template>
  <div class="login-wrap">
    <div class="ms-title">纳客宝管理后台</div>
    <div class="ms-login">
      <el-form :model="userForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="userForm.appUid" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="passwordMd5" label="密码">
          <el-input type="password" placeholder="密码" v-model="userForm.passwordMd5"
            @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="确认密码">
          <el-input type="password" placeholder="密码" v-model="userForm.password"
            @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">注册</el-button>
          <br>
          <el-button type="text" @click="goToLogin">已有账号，直接登陆</el-button>

        </div>
        <!-- <router-link class="to-authorize" to="/authorize"> 
          没有账号，授权注册
        </router-link> -->
      </el-form>
    </div>
    <toast :toastVisible="toastVisible" :toast-data="toastData"></toast>
  </div>
</template>
<script>
import Toast from '@/components/common/Toast'
import LoginApi from '@/service/login'
const md5 = require('md5');
export default {
  name: 'login',
  components:{
    Toast
  },
  data() {
    return {
      userForm: {
        "appId": "tpulse",
        "appUid": "",
        "passwordMd5": "",
        "password": "",
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        passwordMd5: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请再次输入密码', trigger: 'blur'}
        ]
      },
      toastData: {
        icon: null,
        msg: ''
      }, // 错误提示
      toastVisible: false,  // 错误提示展示状态
    }
  },
  created(){
    // this.submitForm()
  },
  methods:{
    submitForm() {
      if(this.userForm.passwordMd5 !== this.userForm.password){
        this.toastData.msg = '两次输入的密码不一样';
        this.toastVisible = true;
        return;
      }
      console.log(this.userForm);
      //调用登陆接口
      LoginApi.register(Object.assign({},this.userForm,{passwordMd5:md5(this.userForm.passwordMd5)}))
      .then((res) => {
        console.log('获取数据成功');
        console.log(res);
        // this.$router.push({
        //   path: '/home'
        // });
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        this.toastData.msg = err.msg ? err.msg : '登陆失败';
        this.toastVisible = true;
      });
    },
    goToLogin(){
      this.$router.push({path:'/login'});
    }
  }
}
</script>
<style scoped lang="stylus" src="@/stylus/login/common.styl"></style>
<style lang="stylus" scoped>
.ms-login {
  height 200px
}
</style>