import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from '@/views/CatalogView.vue'
import HomeView from '@/views/HomeView.vue'
import Welcome from '@/features/auth/Welcome.vue'
import CourseData from '@/data/courses.json'

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
      component: () => import('@/features/auth/AuthViews.vue'),
      props: true,
      meta: { title: 'AuthViews - DeepLearn' },
    },
    {
      path: '/c',
      name: 'chatai',
      component: () => import('@/views/ChatAiView.vue'),
      props: true,
      meta: { title: 'ChatAI - DeepLearn', requiresAuth: true },
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
      component: () => import('@/views/CourseView.vue'),
      props: true,
      meta: { title: 'Cours - DeepLearn' },
    },
    {
      path: '/description/:id',
      name: 'description.show',
      component: () => import('@/cours/CoursesDescription.vue'),
      props: (route) => ({ id: Number(route.params.id) }),
      meta: { title: 'Description - DeepLearn' },
    },
    {
      path: '/lessons/:id',
      name: 'lessons.show',
      component: () => import('@/cours/LessonItem.vue'),
      props: (route) => ({ id: parseInt(route.params.id) }),
      meta: { title: 'Lessons - DeepLearn', requiresAuth: true },
    },

    {
      path: '/modifycourse',
      name: 'modifyourscourse',
      component: () => import('@/features/Admin/Admin.vue'),
      props: true,
      meta: { title: 'modifycourses - DeepLearn' },
    },

    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { title: 'Profil - DeepLearn', requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component:() => import('@/views/AdminView.vue'),
      meta: { title: 'Administration - DeepLearn', requiresAuth: true, isAdmin: true },
    },
    {
      path: '/verification',
      name: 'Verification',
      component: () => import('@/features/auth/VerificationCodeViews.vue'),
      meta: { title: 'Vérification - DeepLearn' },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/features/auth/Welcome.vue'),
    },
    {
      path: '/quizz/:id',
      name: 'quizz',
      component: () => import('@/quizz/Quizz.vue'),
      props: route => ({
        catalog: CourseData,
        usersData: JSON.parse(localStorage.getItem('users')),
        courses: CourseData
      })
    },
    {
      path: '/coursecard',
      name: 'coursecard',
      component: () => import('@/catalog/CourseCard.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Si l'utilisateur revient en arrière, on restaure la position de défilement
    if (savedPosition) {
      return savedPosition
    }
    // Sinon, on remonte en haut de la page avec un effet fluide
    return { top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'DeepLearn'

  const isAuthenticated = localStorage.getItem('token') === 'true'
  const user = JSON.parse(localStorage.getItem('user'))
  const isAdmin = user && user.isAdmin

  // Si la route nécessite d'être admin mais l'utilisateur ne l'est pas
  if (to.meta.isAdmin && !isAdmin) {
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
