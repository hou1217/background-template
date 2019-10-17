<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">Tpulse管理后台</div>
    <!-- 侧边栏 -->
    <Menu mode="horizontal"/>
    <div class="header-right">
      <user-panel></user-panel>
    </div>
  </div>
</template>

<script>
  import bus from '@/assets/js/Bus';
  import UserPanel from '@/views/user/widget/UserPanel'
  import Menu from '@/components/index/Menu';
  
  export default {
    name: "nkbHeader",
    components: {UserPanel,Menu},
    data() {
      return {
        collapse: false,
        fullscreen: false,
        name: 'linxin',
        message: 2
      }
    },
    methods: {
      collapseChage() {
        // this.collapse = !this.collapse;
        // bus.$emit('collapse', this.collapse);
      },
    }
  }
</script>

<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
  }
  
  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
  
  .header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }
  
  .header-right {
    float: right;
    /*padding-right: 50px;*/
  }
</style>
