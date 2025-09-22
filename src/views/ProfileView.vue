<script setup>
import { ref, onMounted, } from 'vue'
import BadgeGrid from '@/features/profile/BadgeGrid.vue'
import UserStats from '@/features/profile/UserStats.vue'
import Completed from '@/features/profile/completed.vue'
import { getEarnedBadges } from '@/data/badges.js'

const props = defineProps({
  courses: Array,
  usersData: Array, // Receive the full, up-to-date list of users
})

const user = ref(null)
const earnedBadges = ref([])
const completedCoursesDetails = ref([])

onMounted(() => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'))
  if (loggedInUser && props.usersData) {
    // Find the most up-to-date user data from the main list
    const currentUserData = props.usersData.find(u => u.id === loggedInUser.id)

    if (currentUserData) {
      user.value = currentUserData
      // console.log('Utilisateur actuel:', user.value)

      // Get full course details for completed courses
      if (user.value.completedCourses && props.courses) {
        completedCoursesDetails.value = props.courses.filter((course) =>
          user.value.completedCourses.includes(course.id),
        )
        // Calcule les badges en passant un objet de contexte
        earnedBadges.value = getEarnedBadges({
          completedCourses: completedCoursesDetails.value,
          user: user.value,
        })
      }
    }
  }
})
</script>
<template>
  <div class="container mx-auto p-4 space-y-6 dark:text-white">
    <UserStats  :user="user" />

    <div class="grid md:flex gap-6 w-full dark:text-white">
      <Completed :courses="completedCoursesDetails" />
      <BadgeGrid :badges="earnedBadges" />
    </div>
  </div>
</template>
