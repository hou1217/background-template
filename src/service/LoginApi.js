import axios from 'axios'
import md5 from 'js-md5'
const LOCAL_STORAGE_SESSIONKEY = "SESSION_KEY";
const URL_LOGIN_CHECK = "/api/auth/login";
// axios响应拦截器
axios.interceptors.response.use((res) => {
  console.log(res);
  if (res.data.status === 200) {
    return res.data
  } else {
    return Promise.reject(res.data)
  }
}, (error) => {
  console.log(error.response);
  return Promise.reject(error)
})

export default{
  //登录
  login(payload){
    console.log('调用登录接口');
    console.log(payload);
    console.warn(process.env.VUE_APP_LOGIN_HOST);
    let loginUrl = process.env.VUE_APP_LOGIN_HOST + URL_LOGIN_CHECK;
    return new Promise((resolve,reject) => {

      axios({
        method: 'GET',
        url: loginUrl,
        params: {
          username: payload.username, 
          password: md5(payload.password)
        },
      })
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          
          let  data = res.data;
          this.setSession(
            {username: payload.username, token: data.token}
          );
          
          resolve(res);
         
        }
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },
  /**
   * 设置会话
   * @param id
   * @param phoneNum
   * @param token
   */
  setSession(payload) {
    if (typeof payload === 'object') {
      localStorage.setItem(LOCAL_STORAGE_SESSIONKEY, JSON.stringify(payload));
    }
  },

  clearSession(payload) {
    if (!payload) {
      localStorage.removeItem(LOCAL_STORAGE_SESSIONKEY);
    }
  },
}