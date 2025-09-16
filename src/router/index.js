import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import CatalogView from '@/views/CatalogView.vue'
import CourseView from '@/views/CourseView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AuthViews from '@/features/AuthViews.vue'
import VerificationCodeViews from '@/features/VerificationCodeViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'home_catalogue',
    component: CatalogView,
    meta: { title: 'Accueil - DeepLearn' }
  },
  // {
  //   path: '/authviews',
  //   name: 'authviews',
  //   component: AuthViews,
  //   meta: { title: 'AuthViews - DeepLearn' }
  // },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogView,
    meta: { title: 'Catalogue - DeepLearn' }
  },
  {
    path: '/course/:id',
    name: 'course',
    component: CourseView,
    props: true,
    meta: { title: 'Cours - DeepLearn' }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { title: 'Profil - DeepLearn', requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { title: 'Administration - DeepLearn', requiresAuth: true, isAdmin: true }
  },
  {
    path: '/verification',
    name: 'Verification',
    component: VerificationCodeViews
  }
  ],
})

// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title || 'DeepLearn'

//   const isAuthenticated = localStorage.getItem('token')
//   const userStatus = localStorage.getItem('status') // "user" ou "admin"

//   if (!isAuthenticated && to.meta.requiresAuth) {
//     // Non connecté → direction login
//     next({ name: 'login' })
//   } else if (isAuthenticated && userStatus === 'admin' && to.name !== 'admin') {
//     // Connecté ET admin → on force vers /admin (sauf si déjà dessus)
//     next({ name: 'admin' })
//   } else {
//     // Sinon accès normal
//     next({ name: 'home_catalogue' })
//   }
// })



export default router
