// router.js
import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: () => {
        if (localStorage.getItem('access_token')) {
          return '/dashboard'
        } else {
          return '/auth'
        }
      }
    },

    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/Auth/Login/LoginView.vue'),
      meta: { layout: 'Auth' }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/students',
      name: 'Students',
      component: () => import('@/views/Dashboard/views/Students/StudentsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/students/:id',
      name: 'Student',
      component: () => import('@/views/Dashboard/views/Students/StudentDetails.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/new-student',
      name: 'NewStudent',
      component: () => import('@/views/Dashboard/views/Students/CreateNewStudentView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/sponsors',
      name: 'Sponsors',
      component: () => import('@/views/Dashboard/views/Sponsors/SponsorsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/sponsors/:id',
      name: 'Sponsor',
      component: () => import('@/views/Dashboard/views/Sponsors/SponsorDetails.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  await auth.$statePromise

  // Check if the user is authenticated using Pinia store
  const isAuthenticated = auth.isAuthenticated()

  const token = localStorage.getItem('access_token') || ''

  if (!isAuthenticated && to.name !== 'Auth') {
    next({ name: 'Auth' })
  } else if (isAuthenticated && to.name === 'Auth') {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
