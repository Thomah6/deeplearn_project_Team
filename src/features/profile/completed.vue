<script setup>
defineProps({
  courses: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
    <div class="md:w-2/3 p-4 bg-white rounded-lg  border border-sky-200  dark:bg-gray-800 dark:border-gray-700">
        <h2 class="mb-4 text-2xl font-bold text-center cursor-pointer">Cours Terminés</h2>
        <ul class="list-none p-0">
            <li
                v-for="course in courses"
                :key="course.id"
                class="bg-gray-100 mb-2 p-4 rounded shadow-sm hover:bg-gray-200 transition-colors duration-200 shadow-md dark:bg-gray-700 dark:hover:bg-gray-600"
            >
                <strong class="font-bold text-gray-800 dark:text-white">{{ course.title }}</strong> <br>
                <small class="text-gray-500 dark:text-gray-400">{{ course.category }}</small>
            </li>
        </ul>
        <div v-if="!courses || courses.length === 0" class="text-center text-gray-500 mt-4">
            Aucun cours terminé pour le moment.
        </div>
    </div>
</template>
