<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import CourseData from '@/data/courses.json'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import AuthViews from '@/features/auth/AuthViews.vue'

const testUsers = [
  {
    id: 0,
    name: 'Hermès',
    email: 'admin@gmail.com',
    password: 'admin',
    completedCourses: [1, 2, 3, 5, 6],
  },
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    completedCourses: [1, 2, 3, 5, 6],
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password456',
    completedCourses: [1],
  },
  {
    id: 3,
    name: 'Hermès H',
    email: 'test@test.com',
    password: 'test',
    completedCourses: [2],
  },
]

const usersData = ref(JSON.parse(localStorage.getItem('users') || JSON.stringify(testUsers)))
const route = useRoute()
const catalog = CourseData
// console.log(route.path)

const isLogin = ref(localStorage.getItem('token') === 'true')

const showLayout = computed(() => {
  const pathsToHideOn = ['/auth', '/verification', '/welcome']
  return !pathsToHideOn.includes(route.path)
})
const showFooter = computed(() => {
  const pathsToHideOn = ['/c']
  return !pathsToHideOn.includes(route.path)
})
</script>
<template>
  <div class="w-full">
    <Header v-if="showLayout" />
    <Sidebar v-if="showLayout" />
    <div class="w-full">
      <div style="height: 100%;" :class="showLayout
          ? 'h-[fit-content] min-h-screen  bg-gray-50 dark:bg-gray-900 relative inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap w-full text-sm py-2.5 lg:ps-65'
          : ''
        ">
        <RouterView :catalog="catalog" :usersData="usersData" :courses="catalog"></RouterView>
      </div>
      <Footer v-if="showFooter" />
    </div>
  </div>
</template>
