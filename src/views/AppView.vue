<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import CourseData from '@/data/courses.json'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import AuthViews from '@/features/auth/AuthViews.vue'

const testUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password456' },
  { id: 3, name: 'Hermès H', email: 'test@test.com', password: 'test' },
]

const usersData = ref(JSON.parse(localStorage.getItem('users') || JSON.stringify(testUsers)))
const route = useRoute()
const catalog = CourseData

const isLogin = ref(localStorage.getItem('token') === 'true')
</script>
<template>
  <div class="w-full">
    <Header />
    <Sidebar />
    <div class="w-full">
      <div
        class="min-h-screen bg-gray-50 dark:bg-gray-900 relative inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap w-full text-sm py-2.5 lg:ps-65"
      >
        <RouterView :catalog="catalog" :usersData="usersData"></RouterView>
      </div>
      <Footer />
    </div>
  </div>
</template>
