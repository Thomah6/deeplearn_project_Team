<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import courseData from '@/data/courses.json'

// Récupération de la route
const route = useRoute()


const search = computed(() => route.query.q?.toString().toLowerCase() || '')


// Filtrage des cours selon search (titre, catégorie, titre des lessons)
const filteredCourses = computed(() => {
    if (!search.value) return courseData

    return courseData.filter(course => {
        const searchTerm = search.value

        // titre cours
        const matchTitle = course.title.toLowerCase().includes(searchTerm)

        // catégorie
        const matchCategory = course.category.toLowerCase().includes(searchTerm)

        // titre lessons
        const matchLessonTitle = course.lessons.some(lesson =>
            lesson.title.toLowerCase().includes(searchTerm)
        )

        return matchTitle || matchCategory || matchLessonTitle
    })
})

</script>

<template>
    <div class="text-white w-full ">
        <p class="page text-black px-1 dark:text-white">Résultats pour : "{{ search }}"</p>

        <div v-if="filteredCourses.length" class="grid md:grid-cols-3 justify-center md:justify-between w-full gap-15 px-10">
            <div v-for="course in filteredCourses" :key="course.id" class="my-4 p-4 bg-neutral-800 rounded-lg bg-white border border-gray-200 dark:bg-gray-800">
                <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-100">{{ course.title }}</h2>
                <p class="text-sm text-gray-400 py-4">{{ course.category }}</p>
                <p class="text-sm text-gray-600">{{ course.description }}</p>
                <p class="text-sm text-sky-400 mt-2">Nombre de leçons : {{ course.lessons_count }}</p>
            </div>
        </div>

        <div v-else>
            <p class="text-red-400">Aucun cours trouvé.</p>
        </div>

    </div>
</template>

<style scoped>
.page {
    font-size: 1.5rem;
    font-weight: bold;
   margin-bottom: 1rem;
}
</style>