<script setup>
import CourseCard from './CourseCard.vue';
import courses from '@/data/courses.json'
import { RouterLink } from 'vue-router';






</script>


<template>
<div class="max-w-[85rem] mt-14 mb-10 px-4 sm:px-6 lg:px-8 mx-auto">
  <div class="bg-blue-600 flex items-center justify-center min-h-[100px] bg-[url('https://preline.co/assets/svg/examples/abstract-1.svg')] bg-no-repeat bg-cover bg-center p-4 rounded-lg text-center">
    <div class="flex flex-wrap justify-center items-center gap-2">
      <p class="inline-block text-white font-medium">
        Découvrez notre nouveau Chatbot IA pour vous guider dans votre apprentissage !
      </p>
      <RouterLink to="/c" class="py-1.5 px-2.5 md:py-2 md:px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border-2 border-white text-white hover:border-white/70 hover:text-white/70 focus:outline-hidden focus:border-white/70 focus:text-white/70 disabled:opacity-50 disabled:pointer-events-none">
        Essayer maintenant
        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </RouterLink>
    </div>
  </div>
</div>

<CourseCard :course="courses" />
</template>


<style scoped>


</style>
