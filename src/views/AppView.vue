<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import CourseData from '@/data/courses.json'
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import AuthViews from '@/features/AuthViews.vue';

const usersData = ref([])
const route = useRoute()
const catalog = CourseData

const isLogin = ref(localStorage.getItem('token') || false)


</script>
<template>

   <div class="w-full">
      <Header />

<Sidebar />
<div class="w-full">
   <div class="min-h-screen bg-gray-50 dark:bg-gray-900 relative inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap w-full text-sm py-2.5 lg:ps-65">
      <AuthViews/>

    <RouterView :catalog="catalog"></RouterView>
   </div>
    <Footer />
</div>

   </div>

</template>