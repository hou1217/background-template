<template>
  <div class="wrapper">
    <!-- 头部 -->
    <Header :showMenu="!showMenu"/>
    <!-- 侧边栏 -->
    <Menu mode="vertical" v-if="showMenu"/>
    <!-- 显示内容区域   -->
    <div class="content-box" :class="{vertical:showMenu,'content-collapse':collapse}">
      <div class="content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  
  
  </div>
</template>

<script>
  import Header from '@/components/index/Header';
  import bus from '@/assets/js/Bus';
  import Menu from '@/components/index/Menu'
  
  export default {
    name: "home",
    components: {Header, Menu},
    data() {
      return {
        showMenu: false,
        collapse: false,
        // 角色数组，目前写在前台
      }
    },
    created() {
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })
    }
  }
</script>

<style scoped>
  .wrapper {
    background: #f0f0f0;
  }
</style>
