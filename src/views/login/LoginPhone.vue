<template>
  <div class="login-wrap">
    <div class="ms-title">纳客宝管理后台</div>
    <div class="ms-login">
      <el-form :model="userForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
        <el-form-item prop="phoneNum" label="手机号">
          <el-input v-model="userForm.phoneNum" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" placeholder="密码" v-model="userForm.password"
            @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登陆</el-button>
          <br>
          <div class="other-zone">
            <el-button type="text" @click="goToForgot">忘记密码</el-button>
            <el-button type="text" @click="goToRegister">注册</el-button>
          </div>
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
        appId:'tpulse',
        phoneNum: '',
        password: ''
      },
      rules: {
        phoneNum: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
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
          LoginApi.loginPhone(Object.assign({},this.userForm,{password:md5(this.userForm.password)}))
          .then((res) => {
            console.log('登陆成功');
            this.toastData.msg = '登陆成功';
            this.toastVisible = true;
            console.log(res);
            this.$router.push({
              path: '/home'
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
    goToRegister(){
      this.$router.push({path:'/register'});
    },
    goToForgot(){
      this.$router.push({path:'/forgot'});
    }
  }
}
</script>
<style scoped lang="stylus" src="@/stylus/login/common.styl"></style>