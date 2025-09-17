<script setup>
import { ref, onMounted, computed } from 'vue'
import BadgeGrid from '@/features/profile/BadgeGrid.vue'
import UserStats from '@/features/profile/UserStats.vue'
import Completed from '@/features/profile/completed.vue'
import { getEarnedBadges } from '@/data/badges.js'

const props = defineProps({
  courses: Array,
})

const user = ref(null)
const earnedBadges = ref([])
const completedCoursesDetails = ref([])

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)

    if (user.value && user.value.completedCourses && props.courses) {
      // Get full course details for completed courses
      completedCoursesDetails.value = props.courses.filter((course) =>
        user.value.completedCourses.includes(course.id),
      )

      // Calculate earned badges
      earnedBadges.value = getEarnedBadges(completedCoursesDetails.value)
    }
  }
})
</script>
<template>
  <div class="container mx-auto p-4 space-y-6 dark:text-white">
    <UserStats v-if="user" :user="user" />

    <div class="grid md:flex gap-6 w-full dark:text-white">
      <Completed :courses="completedCoursesDetails" />
      <BadgeGrid :badges="earnedBadges" />
    </div>
  </div>
</template>
