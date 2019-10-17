import Vue from 'vue'
export default{
  KEEP_ALIVE (state, payload) {
    // 注：防止重复添加（当然也可以使用Set）
    !state.keepAliveComponents.includes(payload) &&
      state.keepAliveComponents.push(payload)
  },
  NO_KEEP_ALIVE (state, payload) {
    const index = state.keepAliveComponents.indexOf(payload)
    index !== -1 &&
      state.keepAliveComponents.splice(index, 1)
  },
  // 改变角色列表
  SET_ROLESLIST(state,payload){
    state.rolesList = payload;
  },
  // 日志的缓存及删除
  SET_LOGDATA(state, payload) {
    state.logData = payload;
  },
  CLEAR_LOGDATA(state) {
    state.logData = {};
  }
}
