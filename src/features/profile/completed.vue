<script setup>
import { ref } from 'vue'

const completedCourses = ref([
    { id: 1, code: 'VUE101', title: 'Introduction à Vue.js', date: '2024-05-10' },
    { id: 2, code: 'JAVA202', title: 'Introduction en Java', date: '2024-05-15' },
    { id: 3, code: 'WEB303', title: 'Développement Web Avancé', date: '2024-06-01' },
    { id: 4, code: 'PHP100', title: 'Introduction à PHP', date: '2024-07-10' },
    { id: 5, code: 'PHYT00', title: 'Introduction en Phyton', date: '2025-05-15' },
    { id: 6, code: 'HTML11', title: 'Introduction en HTML', date: '2025-08-25' }
])
</script>

<template>
    <div class="md:w-2/3 p-4 bg-white rounded-lg  border border-sky-200  dark:bg-gray-800 dark:border-gray-700">
        <h2 class="mb-4 text-2xl font-bold text-center hover:underline cursor-pointer">Cours Terminés</h2>
        <ul class="list-none p-0">
            <li
                v-for="course in completedCourses"
                :key="course.id"
                class="bg-gray-100 mb-2 p-4 rounded shadow-sm hover:bg-gray-200 transition-colors duration-200 shadow-md dark:bg-gray-700 dark:hover:bg-gray-600"
            >
                <strong class="font-bold">{{ course.code }}</strong> - {{ course.title }} <br>
                <small class="text-gray-500 dark:gray-800">Date terminée : {{ course.date }}</small>
            </li>
        </ul>
        <div v-if="completedCourses.length === 0" class="text-gray-500 mt-4">
            Aucun cours terminé pour le moment.
        </div>
    </div>
</template>
