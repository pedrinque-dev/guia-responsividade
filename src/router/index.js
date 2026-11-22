import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Capa', chapter: '00' }
  },
  {
    path: '/responsividade',
    name: 'responsividade',
    component: () => import('@/views/ResponsividadeView.vue'),
    meta: { title: '01 · Por que responsividade importa', chapter: '01' }
  },
  {
    path: '/unidades',
    name: 'unidades',
    component: () => import('@/views/UnidadesView.vue'),
    meta: { title: '02 · Unidades CSS', chapter: '02' }
  },
  {
    path: '/layouts',
    name: 'layouts',
    component: () => import('@/views/LayoutsView.vue'),
    meta: { title: '03 · Flexbox e Grid', chapter: '03' }
  },
  {
    path: '/imagens',
    name: 'imagens',
    component: () => import('@/views/ImagensView.vue'),
    meta: { title: '04 · Imagens responsivas', chapter: '04' }
  },
  {
    path: '/vue',
    name: 'vue',
    component: () => import('@/views/VueView.vue'),
    meta: { title: '05 · Boas práticas em Vue', chapter: '05' }
  },
  {
    path: '/desafio',
    name: 'desafio',
    component: () => import('@/views/DesafioView.vue'),
    meta: { title: '06 · Desafio final', chapter: '06' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const suffix = 'Guia de Responsividade — GRID'
  document.title = to.meta?.title ? `${to.meta.title} | ${suffix}` : suffix
})

export default router
