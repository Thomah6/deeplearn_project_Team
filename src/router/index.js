import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import CatalogView from '@/views/CatalogView.vue'
import HomeView from '@/views/HomeView.vue'
import CourseView from '@/views/CourseView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AuthViews from '@/features/auth/AuthViews.vue'
import VerificationCodeViews from '@/features/auth/VerificationCodeViews.vue'
import Welcome from '@/features/auth/Welcome.vue'
import Admin from '@/features/Admin/Admin.vue'
import ChatAiView from '@/views/ChatAiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home_catalogue',
      component: HomeView,
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
      meta: { title: 'ChatAI - DeepLearn' , requiresAuth: true },
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
    meta: { title: 'Lessons - DeepLearn', requiresAuth: true }
  },

      {
      path: '/modifycourse',
      name: 'modifyourscourse',
      component: Admin,
      props: true,
      meta: { title: 'modifycourses - DeepLearn' },
    },


    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { title: 'Profil - DeepLearn', requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { title: 'Administration - DeepLearn', requiresAuth: true },
    },
    {
      path: '/verification',
      name: 'Verification',
      component: VerificationCodeViews,
      meta: { title: 'Vérification - DeepLearn' },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/searchcours',
      name: 'searchcours',
      component: () => import("@/catalog/SearchCours.vue"),
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'DeepLearn'

  const isAuthenticated = localStorage.getItem('token') === 'true'
  const userStatus = localStorage.getItem('status') // "user" ou "admin"

  // Si la route nécessite d'être admin mais l'utilisateur ne l'est pas
  if (to.meta.isAdmin && userStatus !== 'admin') {
    next({ name: 'home_catalogue' }) // Redirige vers l'accueil
  }
  // Si la route nécessite d'être authentifié mais l'utilisateur ne l'est pas
  else if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirige vers la page de connexion, sauf si on y est déjà
    if (to.name !== 'authviews') {
      next({ name: 'authviews' })
    } else {
      next()
    }
  } else {
    // Dans tous les autres cas, autorise la navigation
    next()
  }
})

export default router
