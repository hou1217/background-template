<template>
  <div class="header-user-con">
    <!-- 全屏显示 -->
    <div class="btn-fullscreen" @click="handleFullScreen">
      <el-tooltip effect="dark" placement="bottom" :content="fullscreen?`取消全屏`:`全屏`">
        <i class="el-icon-rank"></i>
      </el-tooltip>
    </div>
    <!-- 消息中心 -->
    
    <!-- 用户头像 -->
    <div class="user-avator">
      <img src="@/assets/logo.png" style="width: 100%; height: 100%; border-radius: 50%;">
    </div>
    <!-- 用户名下拉菜单 -->
    <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}} <i class="el-icon-caret-bottom"></i>
          </span>
      <el-dropdown-menu slot="dropdown">
        <!-- vfor循环显示用户信息 -->
        <el-dropdown-item v-for="(item,index) in hasSelectList" :key="index">{{item}}</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import LoginApi from '@/service/login'  
import {accountApi} from '@/service/account'
export default {
  name: "UserPanel",
  data() {
    return{
      params: {
        username: '',
        token: ''
      },
      hasSelectList:[],
      // todo 获取用户名并显示
      username: localStorage.getItem('USER_NAME')?localStorage.getItem('USER_NAME'):'请重新登陆',
      fullscreen: false,
    }
  },
  created(){
    this.hasSelectList = localStorage.getItem('ticket')?JSON.parse(localStorage.getItem('ticket'))["ROLE-LIST"]:[]
  },
  methods: {
    //获取用户详情
    handleCommand(command) {
      if (command === 'logout') {
        LoginApi.logout()
        .then((res)=>{
          console.log(res);
          if(res.state === "000000"){
            localStorage.removeItem('ticket');
            localStorage.removeItem('USER_NAME');
            this.$router.push({path:'login'})
          }else{
            this.$message({
              duration:1500,
              type: 'error',
              message: '退出失败!'
            });
          }
        }).catch((err)=>{
          console.error(err);
          if(err.state === "000004"){
            localStorage.removeItem('ticket');
            localStorage.removeItem('USER_NAME');
            this.$router.push({path:'login'})
          }
        })
        
      }
    },
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
}
</script>

<style scoped>
  .header-user-con {
    width: 250px;
    height: 70px;
  }
  
  .btn-fullscreen {
    /*background: blue;*/
    /*padding-top: 10px;*/
    width: 26px;
    float: left;
    padding-top: 25px;
  }
  
  .user-avator {
    background: #fff;
    width: 38px;
    height: 38px;
    margin-left: 20px;
    margin-top: 16px;
    border-radius: 50%;
    float: left;
  }
  
  .user-name {
    float: left;
    margin-left: 20px;
    margin-top: 25px;
    color: #fff;
  }
</style>
