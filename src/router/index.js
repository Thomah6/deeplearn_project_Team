import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import CatalogView from '@/views/CatalogView.vue'
import CourseView from '@/views/CourseView.vue'
import ProfileView from '@/views/ProfileView.vue'
<<<<<<< HEAD
import AuthViews from '@/features/auth/AuthViews.vue'
import VerificationCodeViews from '@/features/auth/VerificationCodeViews.vue'
import Welcome from '@/features/auth/Welcome.vue'
import ChatAiView from '@/views/ChatAiView.vue'
=======
>>>>>>> 362162e707857e9103ef73a7cb6ab63243a38519

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
<<<<<<< HEAD
      path: '/',
      name: 'home_catalogue',
      component: CatalogView,
      meta: { title: 'Accueil - DeepLearn' },
    },
    {
      path: '/auth',
      name: 'authviews',
      component: AuthViews,
      props: true,
      meta: { title: 'AuthViews - DeepLearn' },
    },
    {
      path: '/c',
      name: 'chatai',
      component: ChatAiView,
      props: true,
      meta: { title: 'ChatAI - DeepLearn' },
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
      meta: { title: 'Catalogue - DeepLearn' },
    },
    {
      path: '/course/:id',
      name: 'course',
      component: CourseView,
      props: true,
      meta: { title: 'Cours - DeepLearn' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      props: true,
      meta: { title: 'Profil - DeepLearn', requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { title: 'Administration - DeepLearn', requiresAuth: true, isAdmin: true },
    },
    {
      path: '/verification',
      name: 'Verification',
      component: VerificationCodeViews,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
    },
  ],
=======
    path: '/',
    name: 'home_catalogue',
    component: CatalogView,
    meta: { title: 'Accueil - DeepLearn' }
  },
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
    path: '/description/:id',
    name: 'description.show',
    component: () => import('@/cours/CoursesDescription.vue'),
    props:(route) => ({id: parseInt(route.params.id)}),
    meta: { title: 'Description - DeepLearn' }
  },
  {
    path: '/lessons/:id',
    name: 'lessons.show',
    component: () => import('@/cours/LessonItem.vue'),
    props:(route) => ({id: parseInt(route.params.id)}),
    meta: { title: 'Lessons - DeepLearn' }
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
  }
  ],

  scrollBehavior(to, from, savedPosition) {
    // Si on a une position sauvegardée (ex: bouton "retour arrière")
    if (savedPosition) {
      return savedPosition
    } else {
      // Sinon scroll tout en haut
      return { top: 0 }
    }
  }
>>>>>>> 362162e707857e9103ef73a7cb6ab63243a38519
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

<<<<<<< HEAD
=======


>>>>>>> 362162e707857e9103ef73a7cb6ab63243a38519
export default router
