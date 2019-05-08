import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/user/User'
import Login from '@/components/login/Login'
import Home from '@/components/index/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      // children: []
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})
