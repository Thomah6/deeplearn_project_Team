import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import CatalogView from '@/views/CatalogView.vue'
import CourseView from '@/views/CourseView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AuthViews from '@/features/AuthViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'home_catalogue',
    component: CatalogView,
    meta: { title: 'Accueil - DeepLearn' }
  },
  {
    path: '/authviews',
    name: 'authviews',
    component: AuthViews,
    meta: { title: 'AuthViews - DeepLearn' }
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
})

export default router
