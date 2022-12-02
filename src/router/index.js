import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    name: "notFound",
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/flat-map-demo',
    name: 'FlatMapDemo',
    component: () => import('@/components/FlatMapDemo.vue')
  },
  {
    path: '/scan-demo',
    name: 'ScanDemo',
    component: () => import('@/views/ScanDemo.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  },
  {
    path: '/ant-design-demo',
    name: 'AntDesignDemo',
    component: () => import('@/views/AntDesignDemo.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
