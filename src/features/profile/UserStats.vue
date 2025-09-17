<script setup>
const props = defineProps({
  user: Object,
})

const image = '/user.png'
const add = '/add_reaction_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png'
</script>

<template>
  <div
    class="flex items-center space-x-4 p-4 bg-white rounded-lg border border-sky-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="rounded-full overflow-hidden w-25 h-30 relative">
      <div class="bg-yellow-300 absolute right-1 rounded-full top-16 p-1">⭐</div>
      <span><img :src="image" alt="" /></span>
    </div>
    <div>
      <h2 class="text-xl font-bold dark:text-white">{{ user?.name }}</h2>
      <p class="text-gray-600 dark:text-white">Student</p>
      <p class="text-gray-600 dark:text-white">{{ user?.email }}</p>
    </div>
  </div>
</template>
