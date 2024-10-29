import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name:'createForm',
      component: () => import('../views/createForm.vue'),
    },
    {
      path: '/success',
      name:'success',
      component: () => import('../views/fromSuccess.vue'),
    },
  ],
})

export default router