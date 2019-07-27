import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies';
Vue.use(Router,VueCookies)
VueCookies.config('7d')
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/panel',
      name: 'panel',
      component: require('@/components/Panel').default
    },
    {
      path: '/installation',
      name: 'installation',
      component: require('@/components/Installation').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login').default
    }
  ]
})
