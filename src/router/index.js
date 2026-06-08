import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Área do cliente
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/reservar',
      name: 'reservar',
      component: () => import('../views/ReservarView.vue'),
    },
    {
      path: '/minhas-reservas',
      name: 'minhas-reservas',
      component: () => import('../views/MinhasReservasView.vue'),
    },

    // Área do admin
    {
      path: '/admin',
      name: 'admin-login',
      component: () => import('../views/admin/LoginView.vue'),
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/reservas',
      name: 'admin-reservas',
      component: () => import('../views/admin/ReservasView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/reservas/:id',
      name: 'admin-reserva-detalhe',
      component: () => import('../views/admin/ReservaDetalheView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/mesas',
      name: 'admin-mesas',
      component: () => import('../views/admin/MesasView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/admins',
      name: 'admin-admins',
      component: () => import('../views/admin/AdminsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/logs',
      name: 'admin-logs',
      component: () => import('../views/admin/LogsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/perfil',
      name: 'admin-perfil',
      component: () => import('../views/admin/PerfilView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Redireciona para login se não autenticado
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) {
    next({ name: 'admin-login' })
  } else {
    next()
  }
})

export default router