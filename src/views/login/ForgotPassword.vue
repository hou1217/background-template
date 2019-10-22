<template>
  <div class="login-wrap">
    <div class="ms-title">纳客宝管理后台</div>
    <div class="ms-login">
      <el-form :model="userForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
        <el-form-item prop="username" label="手机号">
          <el-input v-model="userForm.phoneNum" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input type="number"  placeholder="验证码" v-model="userForm.code"></el-input>
          <el-button type="text" @click="getCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" placeholder="密码" v-model="userForm.password"
            @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">重置密码</el-button>
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
        "phoneNum": "",
        "code": "",
        "password": "",
      },
      rules: {
        username: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      toastData: {
        icon: null,
        msg: ''
      }, // 错误提示
      toastVisible: false,  // 错误提示展示状态
    }
  },
  methods:{
    submitForm() {
      console.log(this.userForm);
      this.$refs.ruleForm.validate((valid)=>{
        if(!valid){
          return false;
        }else{
          //调用登陆接口
          LoginApi.resetPassword(Object.assign({},this.userForm,{password:md5(this.userForm.password)}))
          .then((res) => {
            console.log('重置成功');
            this.toastData.msg = '重置成功';
            this.toastVisible = true;
            console.log(res);
            this.$router.push({
              path: '/loginPhone'
            });
          })
          .catch((err)=>{
            console.error('数据异常：', err);
            this.toastData.msg = err.msg ? err.msg : '登陆失败';
            this.toastVisible = true;
          });
        }
      })
    },
    goToLogin(){
      this.$router.push({path:'/loginPhone'});
    },
    getCode(){
      LoginApi.getResetCode(Object.assign({},this.userForm))
      .then((res) => {
        console.log('获取验证码成功');
        console.log(res);
        this.toastData.msg = '获取验证码成功';
        this.toastVisible = true;
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        
      });
    },
  }
}
</script>
<style scoped lang="stylus" src="@/stylus/login/common.styl"></style>
<style lang="stylus" scoped>
.ms-login {
  height 240px
}
</style>