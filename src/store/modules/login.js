import {Request} from '../../modules/request'
// const md5 = require('js-md5');
import md5 from 'js-md5'

const LOCAL_STORAGE_SESSIONKEY = "SESSION_KEY";
const URL_LOGIN_CHECK = "/api/auth/login";
// const URL_LOGIN_TEST = "http://fat.authcenter.dc.wallan-tech.com";

//定义state
const state = {

  context: null,
  session: null,

  event: {
    id: "",
    status: "",
    message: ""
  }
}

//getters
const getters = {

  /**
   * 创建基于session的post请求
   * 1.封装了会话headers
   * 2.网络异常的统一处理
   * @param state
   * @returns
   */
  createPost: (state, getters) => (url) => {

    let session = getters.getSession;
    if (session) {
      return Request.Post(url).headers({
        "WALLAN-TOKEN": state.session.token,
        "WALLAN-DEVICENUM": state.session.phoneNum,
        "DCTOKEN": state.session.token,
      })
    } else {
      state.context.$emit("exception.session", error);
    }

  }
  ,

  /**
   * 创建基于session的get请求
   * 1.封装了会话headers
   * 2.网络异常的统一处理
   * @param state
   * @returns
   */
  createGet: (state) => (url) => {

    let session = getters.getSession;
    if (session) {
      return Request.Get(url).headers({
        "WALLAN-TOKEN": state.session.token,
        "WALLAN-DEVICENUM": state.session.phoneNum,
        "DCTOKEN": state.session.token,
      })

    } else {
      state.context.$emit("exception.session", error);
    }

  },

  /**
   * 获取上下文
   * @param state
   * @returns {null|*}
   */
  context: (state) => {
    return state.context;
  },

  /**
   * 获取会话
   * @param state
   * @returns {*}
   */
  getSession: (state) => {
    if (state.session) {

      //TODO 刷新token

      return state.session
    } else {


      let sessionStr = localStorage.getItem(LOCAL_STORAGE_SESSIONKEY);
      // console.debug(sessionStr);
      if (sessionStr) {
        let session = JSON.parse(sessionStr);
        if (session.username && session.token) {
          state.session = session;
        }


        //TODO 刷新token
        return state.session
      } else {
        return null;
      }
    }

  }


}

//异步行为
const actions = {

  /**
   * 登录
   * @param commit
   * @param state
   * @param rootGetters
   * @param phoneNo
   * @param password
   * @returns {Promise<any>}
   */
  login({commit, state, rootGetters}, {username, password}) {
    console.warn(process.env.VUE_APP_LOGIN_HOST);
    var loginUrl = process.env.VUE_APP_LOGIN_HOST + URL_LOGIN_CHECK;
    Request.Get(loginUrl).body({username: username, password: md5(password)}).execute().then(function (res) {
      // console.debug('res');
      console.warn(res);
      if (res.status === 200) {
        var data = res.data;
        commit('setSession', {username: username, token: data.token});
      }
      commit('setEvent', {type: "login", status: res.status, message: res.message});
    }).catch(function (error) {
      commit('setEvent', {"type": "login", status: 500, message: "系统异常"});
      state.context.$emit("exception.session", error)
    })

  },


}

//同步行为

const mutations = {

  /**
   * 设置会话
   * @param state
   * @param id
   * @param phoneNum
   * @param token
   */
  setSession(state, payload) {
    if (typeof payload === 'object') {
      state.session = payload;
      localStorage.setItem(LOCAL_STORAGE_SESSIONKEY, JSON.stringify(payload));
    }
  },

  clearSession(state, payload) {
    if (!payload) {
      state.session = '';
      localStorage.removeItem(LOCAL_STORAGE_SESSIONKEY);
    }
  },

  /**
   * 设置上下文
   * @param state
   * @param context
   */
  setContext(state, context) {
    state.context = context;
  },

  /**
   * 设置变更事件
   * @param state
   * @param type
   * @param status
   * @param message
   */
  setEvent(state, payload) {
    state.event.id = new Date().getTime() + "";
    state.event.type = payload.type;
    state.event.status = payload.status;
    state.event.message = payload.message;
  }

}


export default {
  state,
  getters,
  actions,
  mutations
}

// export const changeNickname = ({ commit }) => {
//   this.$store.commit('changeNickname')
// }


