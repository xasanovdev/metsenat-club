import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/Auth/LoginView.vue'),
      meta: { layout: 'Auth' }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/DashboardView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/students',
      name: 'Students',
      component: () => import('@/views/Students/StudentsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/students/:id',
      name: 'Student',
      component: () => import('@/views/Students/StudentDetails.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/new-student',
      name: 'NewStudent',
      component: () => import('@/views/Students/CreateNewStudentView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/sponsors',
      name: 'Sponsors',
      component: () => import('@/views/Sponsors/SponsorsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/sponsors/:id',
      name: 'Sponsor',
      component: () => import('@/views/Sponsors/SponsorDetails.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // Check if the user is authenticated using Pinia store
  const isAuthenticated = auth.isAuthenticated()

  if (!isAuthenticated && to.name !== 'Auth') {
    next({ name: 'Auth' })
    localStorage.clear()

    return
  }

  if (isAuthenticated && to.name === 'Auth') {
    next({ name: 'Dashboard' })
    return
  }

  next()
})

export default router
