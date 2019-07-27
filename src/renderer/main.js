import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
var VueCookie = require('vue-cookie')
Vue.use(VueCookie)
import App from './App'
Vue.use(ElementUI);
import router from './router'
import store from './store'
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
export const eventBus = new Vue();
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
