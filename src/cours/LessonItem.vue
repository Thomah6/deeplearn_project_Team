<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import courseData from '@/data/courses.json';
import Ressource from './Ressource.vue';

const props = defineProps({
  id: Number,
});

const getData = ref([])
const currentLesson = ref(null)
const openLessonId = ref(null)
const showLessonsOnMobile = ref(false)

function getCourse() {
  getData.value = courseData.filter((cour) => cour.id === props.id)
  // Set the first lesson as default when course is loaded
  // and open the first lesson accordion
  if (getData.value.length > 0 && getData.value[0].lessons.length > 0) {
    currentLesson.value = getData.value[0].lessons[0]
    openLessonId.value = getData.value[0].lessons[0].id
  }
};

onMounted(() => {
  getCourse()
});

watch(() => props.id, () => getCourse())

function openLesson(lesson) {
  currentLesson.value = lesson
  if (openLessonId.value === lesson.id) {
    openLessonId.value = null // Close if already open
  } else {
    openLessonId.value = lesson.id // Open the clicked one
  }
}



console.log(getData);

</script>

<template>
  <div class="flex flex-col lg:flex-row">
    <section class="w-full lg:w-96 flex-shrink-0">
      <!-- Bouton pour afficher/masquer les leçons sur mobile -->
      <div class="p-4 text-center lg:hidden">
        <button
          @click="showLessonsOnMobile = !showLessonsOnMobile"
          class="w-full px-6 py-3 font-semibold text-white transition duration-500 ease-in-out transform bg-sky-600 rounded-lg hover:bg-sky-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
        >
          {{ showLessonsOnMobile ? 'Cacher les leçons' : 'Voir toutes les leçons' }}
        </button>
      </div>

      <article class="mx-4 sm:mx-10 mt-8 gap-4" :class="[showLessonsOnMobile ? 'grid' : 'hidden', 'lg:grid']">
        <div class="max-w-3xl mx-auto space-y-4 w-full" v-for="course in getData" :key="course.id">
          <!-- Loop through lessons instead of course -->
          <div v-for="lesson in course.lessons" :key="lesson.id"
               class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div
                   class="flex items-center justify-between p-4 bg-gray-800 text-white cursor-pointer hover:bg-gray-600 transition-colors"
                   @click="openLesson(lesson)">
              <span class="text-lg font-semibold">Leçon {{ lesson.id }} - {{ lesson.title }}</span>
              <svg class="w-6 h-6 transition-transform" :class="{ 'rotate-180': openLessonId === lesson.id }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            <div class="max-h-0 overflow-hidden transition-all duration-300" :class="{ 'max-h-screen': openLessonId === lesson.id }">
              <div class="p-4 bg-white dark:bg-gray-700">
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center justify-center gap-2">
                    <p class="text-gray-700 dark:text-white/80 text-base leading-relaxed">{{ lesson.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="flex-grow">
      <Ressource :lesson="currentLesson"/>
    </section>
  </div>
</template>
