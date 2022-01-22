import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue')
  },
  {
    path: '/list', 
    children:[
      // {
      //   path: 'list',
      //   component: () => import('@/views/list/list.vue'),
      //   name: 'list',
      // },
      // {
      //   path: 'serchList',
      //   component: () => import('@/views/list/serchList.vue'),
      //   name: 'serchList',
      // },
      // {
      //   path: 'info',
      //   component: () => import('../views/list/info.vue'),
      //   name: 'info',
      // },
    ],
  },
  {
    path: '/list/list', 
    name: 'list',
    component: () => import('../views/list/list.vue')
  },
  {
    path: '/list/serchList', 
    name: 'serchList',
    component: () => import('../views/list/serchList.vue')
  },
  {
    path: '/list/info', 
    name: 'info',
    component: () => import('../views/list/info.vue')
  },
  
  
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
     } else {
      return { x: 0, y: 0 }
     }
   }
})

export default router
