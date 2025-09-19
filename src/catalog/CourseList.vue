<script setup>
import CourseCard from './CourseCard.vue';
import courses from '@/data/courses.json'
// import { RouterLink } from 'vue-router';






</script>


<template>
<div class="">

<CourseCard :course="courses" />
</div>
</template>


<style scoped>


</style>
