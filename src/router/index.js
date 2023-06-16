import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
   {
      path: '/',
      name: 'antv',
      component: () => import('@/views/antv'),
    },
    {
      path: '/antvShow',
      name: 'antvShow',
      component: () => import('@/views/antvShow'),
    },
    
  ]
})
