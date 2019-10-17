<template>
  <div class="wrapper">
    <!-- 头部 -->
    <v-header></v-header>
    <!-- 侧边栏 -->
    <Menu mode="vertical"/>
    <!-- 显示内容区域   -->
    <div class="content-box">
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
  import vHeader from '@/components/index/Header'
  import Menu from '@/components/index/Menu'

  export default {
    name: "Home",
    components: {vHeader, Menu}
  }
</script>

<style scoped>
  .wrapper{
    background: #f0f0f0;
  }
</style>
