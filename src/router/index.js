import Vue from 'vue'
import Router from 'vue-router'
import routerdata from './router.json'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '*',
    name: 'html404',
    component: resolve => require(['@/components/app/default'], resolve),
    meta: {
      config: require('@/components/app/default.json')
    }
  }]
})
routerdata.forEach(function (obj, index) {
  if (index === 0) {
    router.addRoutes([{
      path: '/',
      name: obj,
      component: resolve => require(['../' + obj], resolve),
      meta: {
        config: require('../' + obj + '.json')
      }
    }])
  }
  router.addRoutes([{
    path: '/' + obj,
    name: obj,
    component: resolve => require(['../' + obj], resolve),
    meta: {
      config: require('../' + obj + '.json')
    }
  }])
})
export default router
