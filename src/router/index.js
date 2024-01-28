// router.js
import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import Login from '@/views/Auth/Login/LoginView.vue';
import Dashboard from '@/views/Dashboard/views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home/HomeView.vue')
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Login,
      meta: { layout: 'Auth' }
    },
    {
      path: '/dashboard',
      name: 'Home',
      component: () => import('@/views/Home/HomeView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
          meta: { layout: 'Dashboard', requiresAuth: true }
        },
        {
          path: '/students',
          name: 'Students',

          component: () => import('@/views/Dashboard/views/Students/StudentsView.vue'),
          meta: { requiresAuth: true, title: 'Students', layout: 'Dashboard' },
          children: [
            {
              path: '/students/:id',
              name: 'Student',
              component: () => import('@/views/Dashboard/views/Students/StudentDetails.vue'),
              meta: { layout: 'Details', requiresAuth: true },
              children: [
                {
                  path: '/students/:id/edit',
                  name: 'EditStudent',
                  component: () => import('@/views/Dashboard/views/Students/EditStudentView.vue'),
                  meta: { layout: 'Details', requiresAuth: true }
                },
                {
                  path: '/students/:id/add-sponsor',
                  name: 'AddSponsor',
                  component: () => import('@/views/Dashboard/views/Students/AddSponsorView.vue'),
                  meta: { layout: 'Details', requiresAuth: true }
                },
                {
                  path: '/students/:id/edit-sponsor',
                  name: 'EditSponsor',
                  component: () => import('@/views/Dashboard/views/Students/EditSponsorView.vue'),
                  meta: { layout: 'Details', requiresAuth: true }
                }
              ]
            }
          ]
        },
        {
          path: '/sponsors',
          name: 'Sponsors',
          component: () => import('@/views/Dashboard/views/Sponsors/SponsorsView.vue'),
          meta: { requiresAuth: true, layout: 'Dashboard', title: 'Sponsors' },
          children: [
            {
              path: '/sponsors/filter',
              name: 'SponsorsFilter',
              component: () => import('@/views/Dashboard/views/Sponsors/FilterView.vue'),
              meta: {
                requiresAuth: true,
                layout: 'Details',
                title: 'Sponsors',
                modalType: 'SponsorsFilter'
              }
            }
          ]
        },
        {
          path: '/sponsors/:id',
          name: 'SponsorDetails',
          component: () => import('@/views/Dashboard/views/Sponsors/SponsorDetails.vue'),
          meta: { layout: 'Details', requiresAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // Wait for the authentication status to be determined
  await auth.$statePromise

  // Check if the user is authenticated using Pinia store
  const isAuthenticated = auth.isAuthenticated()

  console.log('Is Authenticated:', isAuthenticated)

  const token = localStorage.getItem('access_token') || ''

  console.log('Token:', token)

  if (!isAuthenticated && to.name !== 'Auth') {
    console.log('No token, redirecting to Auth')
    next({ name: 'Auth' })
  } else if (isAuthenticated && to.name === 'Auth') {
    console.log('Authenticated, redirecting to Dashboard')
    next({ name: 'Dashboard' })
  } else {
    console.log('Continue with the route navigation')
    next()
  }
})

export default router
