import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/index/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/loginPhone'
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
          import ( /* webpackChunkName: "login" */ '@/views/login/Login'),
      meta: { keepAlive: false },
    },
    {
      path: '/loginPhone',
      name: 'loginPhone',
      component: () =>
          import ( /* webpackChunkName: "loginPhone" */ '@/views/login/LoginPhone'),
      meta: { keepAlive: false },
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
          import ( /* webpackChunkName: "register" */ '@/views/login/Register'),
      meta: { keepAlive: false },
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () =>
          import ( /* webpackChunkName: "register" */ '@/views/login/ForgotPassword'),
      meta: { keepAlive: false },
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/hello',
      children: [
        {  
          path: '/hello',
          name: 'hello',
          component: () =>
          import ('@/views/Hello'),
          meta: { keepAlive: false },
        },
        /**
        * APP管理
        * */
        {  
          path: '/app',
          name: 'app',
          component: () =>
          import ('@/views/app/App'),
          meta: { keepAlive: false },
        },
        { 
          path: '/appCreateNew',
          name: 'appCreateNew',
          component: () =>
              import ('@/views/app/AppCreateNew'),
          meta: { keepAlive: false },
        },
        { 
          path: '/appEdit',
          name: 'appEdit',
          component: () =>
              import ('@/views/app/AppEdit'),
          meta: { keepAlive: false },
        },
        /**
        * 账户管理
        * */
        { 
          path: '/account',
          name: 'account',
          component: () =>
          import ('@/views/account/Account'),
          meta: { keepAlive: false },
        },
        { 
          path: '/accountEdit',
          name: 'accountEdit',
          component: () =>
              import ('@/views/account/AccountEdit'),
          meta: { keepAlive: false },
        },
        /**
         * 权限管理——权限
         * */
        { 
          path: '/rights',
          name: 'rights',
          component: () =>
              import ('@/views/rights/Rights'),
          meta: { keepAlive: false },
        },
        { 
          path: '/rightsCreateNew',
          name: 'rightsCreateNew',
          component: () =>
              import ('@/views/rights/RightsCreateNew'),
          meta: { keepAlive: false },
        },
        { 
          path: '/rightsEdit',
          name: 'rightsEdit',
          component: () =>
              import ('@/views/rights/RightsEdit'),
          meta: { keepAlive: false },
        },
        /**
         * 权限管理——路径
         * */
        { 
          path: '/path',
          name: 'path',
          component: () =>
              import ('@/views/rights/Path'),
          meta: { keepAlive: false },
        },
        { 
          path: '/pathCreateNew',
          name: 'pathCreateNew',
          component: () =>
              import ('@/views/rights/PathCreateNew'),
          meta: { keepAlive: false },
        },
        { 
          path: '/pathEdit',
          name: 'pathEdit',
          component: () =>
              import ('@/views/rights/PathEdit'),
          meta: { keepAlive: false },
        },
        /**
         * 权限管理——vue路径
         * */
        { 
          path: '/vuePath',
          name: 'vuePath',
          component: () =>
              import ('@/views/rights/VuePath'),
          meta: { keepAlive: false },
        },
        { 
          path: '/vuePathCreateNew',
          name: 'vuePathCreateNew',
          component: () =>
              import ('@/views/rights/VuePathCreateNew'),
          meta: { keepAlive: false },
        },
        { 
          path: '/vuePathEdit',
          name: 'vuePathEdit',
          component: () =>
              import ('@/views/rights/VuePathEdit'),
          meta: { keepAlive: false },
        },
        /**
         * 权限管理——角色
         * */
        { 
          path: '/role',
          name: 'role',
          component: () =>
              import ('@/views/rights/Role'),
          meta: { keepAlive: false },
        },
        { // 创建新角色
          path: '/roleCreateNew',
          name: 'roleCreateNew',
          component: () =>
              import ('@/views/rights/RoleCreateNew'),
          meta: { keepAlive: false },
        },
        { // 编辑角色
          path: '/roleEdit',
          name: 'roleEdit',
          component: () =>
              import ('@/views/rights/RoleEdit'),
          meta: { keepAlive: false },
        },
      ]
    },
  ]
})
