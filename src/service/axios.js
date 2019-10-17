import axios from 'axios'
import $router from '@/router/index'
import { Message } from 'element-ui';
const APP_HOST = process.env.VUE_APP_APP_HOST;
// 添加请求拦截器
axios.interceptors.request.use( (config)=> {
  config.headers['WALLAN-TOKEN'] = localStorage.getItem('ticket')?JSON.parse(localStorage.getItem('ticket'))["WALLAN-TOKEN"]:'';
  // 在发送请求之前做些什么
  // if(!JSON.parse(localStorage.getItem('SESSION_KEY'))){
    // console.log('token不存在');
    // Message({
    //   showClose: true,
    //   message: 'token不存在，请重新登陆',
    //   type: 'error'
    // });
    // $router.push({name:'login'})
  // }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 全局的 axios 默认值
axios.defaults.baseURL = APP_HOST;

// axios响应拦截器
axios.interceptors.response.use((res) => {
  console.log(res);
  if (res.data.state === '000000' ) {
    return res.data;
  }
  else if(res.data.state === '000004' ){
    Message({
      duration:1000,
      showClose: true,
      message:`请登陆后操作`,
      type: 'error'
    });
    // $router.push({name:'login'});
    return Promise.reject(res.data);
  }
  else if (res.data.state === '038006'){
    Message({
      duration:1000,
      showClose: true,
      message:`${res.data.msg}`,
      type: 'error'
    });
    return Promise.reject(res.data);
  }
  else if (res.data.state === '038003'){
    Message({
      duration:2000,
      showClose: true,
      message:`${res.data.msg}`,
      type: 'error'
    });
    return Promise.reject(res.data);
  }
  else {
    Message({
      duration:1000,
      showClose: true,
      message:`${res.data.msg}`,
      type: 'error'
    });
    return Promise.reject(res.data);
  }
}, (error) => {
  console.log(error);
  Message({
    duration:1000,
    showClose: true,
    message:`网络请求异常`,
    type: 'error'
  });
  return Promise.reject(error);
})

export default axios;
