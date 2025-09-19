<script setup>
defineProps({
  coursesCount: {
    type: Number,
    required: true,
  },
  usersCount: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['manage-courses', 'add-course', 'manage-users'])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Courses Card -->
    <div class="flex-1 bg-white rounded-md p-5 border border-sky-200 text-center dark:bg-gray-700">
      <h2 class="mb-3 text-lg font-semibold text-gray-700 dark:text-white">Nombre de cours</h2>
      <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ coursesCount }}</p>
      <div class="mt-4 space-y-2">
        <button class="w-full p-3 rounded-lg font-bold cursor-pointer transition-colors bg-sky-500 hover:bg-sky-600 text-white" @click="emit('manage-courses')">Gérer les cours</button>
        <button class="w-full p-3 rounded-lg font-bold cursor-pointer transition-colors bg-green-500 hover:bg-green-600 text-white" @click="emit('add-course')">Ajouter un cours</button>
      </div>
    </div>

    <!-- Users Card -->
    <div class="flex-1 bg-white rounded-md p-5 border border-sky-200 text-center dark:bg-gray-700">
      <h2 class="mb-3 text-lg font-semibold text-gray-700 dark:text-white">Nombre d'utilisateurs</h2>
      <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ usersCount }}</p>
      <div class="mt-4">
        <button class="w-full p-3 mt-9 rounded-lg font-bold cursor-pointer transition-colors bg-sky-500 hover:bg-sky-600 text-white" @click="emit('manage-users')">Gérer les utilisateurs</button>
      </div>
    </div>
  </div>
</template>