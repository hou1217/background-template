import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
Vue.use(Vuex)
const state = {
  keepAliveComponents: [], // 缓存数组
  rolesList: [], // 角色列表
  logData: {}, // 缓存的日志数据
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})