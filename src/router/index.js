import { createRouter, createWebHistory } from 'vue-router'
import routers from './routers'

let routes=[
  {
    path: '/',
    name: 'home',
    component: ()=>import('../views/home/home.vue')
},
...routers
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes:routes
})

export default router
