import axios from 'axios'
let instance = axios.create();
const APP_HOST = process.env.VUE_APP_APP_HOST;
export default{
  /**
   * 登录
   * @param params
   */
  rootLogin(params){
    console.log('调用ROOT登录接口');
    console.log(params);
    localStorage.setItem('USER_NAME', JSON.stringify(params.username));
    
    let url = APP_HOST + '/nakebao-admin-app/nakebao/root/login';
    return new Promise((resolve,reject) => {

      instance({
        method: 'POST',
        url: url,
        data: params
      })
      .then((res) => {
        console.log(res);
     
        if(res.data.state === '000000'){
          this.setSession(
            {
              "WALLAN-TOKEN": res.data.data.token
            }
          );
          localStorage.setItem('USER_ROLE', JSON.stringify(res.data.data.roleNames));
          resolve(res.data);
         
        }else{
          reject(res)
        }
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },
  /**rootLogin
   * 登录
   * @param params
   */
  login(params){
    console.log('调用登录接口');
    console.log(params);
    localStorage.setItem('USER_NAME', params.appUid);
    
    let url = APP_HOST + '/authenticate-app/account/login/uid';
    return new Promise((resolve,reject) => {

      instance({
        method: 'POST',
        url: url,
        data: params
      })
      .then((res) => {
        console.log(res);
     
        if(res.data.state === '000000'){
          this.setSession(
            {
              "WALLAN-TOKEN": res.data.data.authToken,
              "ROLE-LIST": res.data.data.roleNameList
            }
          );
          resolve(res.data);
         
        }else{
          reject(res)
        }
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },
  loginPhone(params){
    console.log('调用登录接口');
    console.log(params);
    localStorage.setItem('USER_NAME', params.appUid || params.phoneNum);
    
    let url = APP_HOST + '/authenticate-app/account/login/phone/pswd';
    return new Promise((resolve,reject) => {

      instance({
        method: 'POST',
        url: url,
        data: params
      })
      .then((res) => {
        console.log(res);
     
        if(res.data.state === '000000'){
          this.setSession(
            {
              "WALLAN-TOKEN": res.data.data.token,
            }
          );
          resolve(res.data);
         
        }else{
          reject(res)
        }
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },

  /**Register
   * 注册
   * @param params
   */
  register(params){
    console.log('调用注册接口');
    console.log(params);
    let url = APP_HOST + '/authenticate-app/account/register/phone/do-register';
    return new Promise((resolve,reject) => {

      instance({
        method: 'POST',
        url: url,
        data: params
      })
      .then((res) => {
        console.log(res);
        if(res.data.state === '000000'){
          resolve(res.data);
        }else{
          reject(res)
        }
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },
  resetPassword(params){
    console.log('重置密码');
    console.log(params);
    let url = APP_HOST + '/authenticate-app/account/pswd/reset/phone/do-reset';
    return new Promise((resolve,reject) => {

      instance({
        method: 'POST',
        url: url,
        data: params
      })
      .then((res) => {
        console.log(res);
        if(res.data.state === '000000'){
          resolve(res.data);
        }else{
          reject(res)
        }
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },
  getCode(params){
    console.log('调用注册接口');
    console.log(params);
    let url = APP_HOST + '/authenticate-app/account/register/phone/send-code';
    return new Promise((resolve,reject) => {

      instance({
        method: 'POST',
        url: url,
        data: params
      })
      .then((res) => {
        console.log(res);
        if(res.data.state === '000000'){
          resolve(res.data);
        }else{
          reject(res)
        }
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },
  getResetCode(params){
    console.log('调用注册接口');
    console.log(params);
    let url = APP_HOST + '/authenticate-app/account/pswd/reset/phone/send-code';
    return new Promise((resolve,reject) => {

      instance({
        method: 'POST',
        url: url,
        data: params
      })
      .then((res) => {
        console.log(res);
        if(res.data.state === '000000'){
          resolve(res.data);
        }else{
          reject(res)
        }
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },
  getRouterList(params){
    const url = APP_HOST + '/security-app/permission/vue/router/list';
    return new Promise((resolve,reject) => {
      axios({
        method: 'POST',
        url: url,
        data:params,
        headers: {
          'WALLAN-TOKEN' : localStorage.getItem('ticket')?JSON.parse(localStorage.getItem('ticket'))["WALLAN-TOKEN"]:''
        }
      })
      .then((res) => {
        console.log(res);
        if(res.state === '000000'){
          resolve(res);
        }else{
          reject(res)
        }
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },
  /**
   * 
   * @param {*} params 
   */
  logout(){
    console.log('调用退出接口');
    const url = APP_HOST + '/security-app/app/logout';
    return new Promise((resolve,reject) => {
      axios({
        method: 'POST',
        url: url,
        headers: {
          'WALLAN-TOKEN' : localStorage.getItem('ticket')?JSON.parse(localStorage.getItem('ticket'))["WALLAN-TOKEN"]:''
        }
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err)=>{
        console.error('数据异常：', err);
        reject(err)
      });
    })
  },
  setSession(params) {
    if (typeof params === 'object') {
      localStorage.setItem('ticket', JSON.stringify(params));
    }
  },
}
