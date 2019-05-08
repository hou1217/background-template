<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from '@/components/base/bus';

  export default {
    data() {
      return {
        collapse: false,
        items: []
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    created() {
      this.judgeRole();
      bus.$on('collapse', data => {
        this.collapse = data;
      })
    },
    methods: {
      judgeRole() {
        this.items = [
          // {
          //   icon: 'el-icon-document',
          //   index: 'bbsUser',
          //   title: '用户'
          // },
          // {
          //   icon: 'el-icon-document',
          //   index: 'bbsGroup',
          //   title: '群'
          // },
          // {
          //   icon: 'el-icon-document',
          //   index: 'Indicatrix',
          //   title: '指标图',
          //   subs: [{
          //     title: 'bbs',
          //     index: 'bbsIndicatrix'
          //   },{
          //     title: 'personalDynamics',
          //     index: 'personalDynamicsIndicatrix'
          //   }]
          // },
          // {
          //   icon: 'el-icon-document',
          //   index: 'userList',
          //   title: '个人动态'
          // },
          // {
          //   icon: 'el-icon-document',
          //   index: 'subscribeUser',
          //   title: '订阅个人动态'
          // },
          // {
          //   icon: 'el-icon-document',
          //   index: 'subscribeGroup',
          //   title: '订阅群动态'
          // },
          // {
          //   icon: 'el-icon-document',
          //   index: 'gameManage',
          //   title: '游戏管理',
          //   subs: [{
          //     title: '游戏列表',
          //     index: 'gameList'
          //   },{
          //     title: '游戏分类管理',
          //     index: 'gameCategories'
          //   },{
          //     title: '游戏区域管理',
          //     index: 'gameAreas'
          //   }]
          // },
          // {
          //   icon: 'el-icon-document',
          //   index: 'gameCategories',
          //   title: '游戏类别搜索'
          // },
          // {
          //   icon: 'el-icon-document',
          //   index: 'adManage',
          //   title: '广告管理',
          //   subs: [{
          //     title: '广告主列表',
          //     index: 'advertiserList'
          //   }, {
          //     title: '广告列表',
          //     index: 'advertisementList'
          //   }, {
          //     title: '广告计划列表',
          //     index: 'ADScheduleList'
          //   }]
          // }
        ];


      }
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
