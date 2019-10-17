import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, {size: 'small'});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')