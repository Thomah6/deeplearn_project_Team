<script setup>
import { ref } from 'vue';
import CourseCard from './CourseCard.vue';
import courses from '@/data/courses.json'
// import { RouterLink } from 'vue-router';

const coursesData = ref(JSON.parse(localStorage.getItem('courses')) || courses)
</script>


<template>
<div class="">

<CourseCard :course="coursesData" />
</div>
</template>


<style scoped>


</style>
