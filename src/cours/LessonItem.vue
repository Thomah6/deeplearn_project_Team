<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import courseData from '@/data/courses.json';
import Ressource from './Ressource.vue';
import CompoComponent from '@/component/compoComponent.vue';

const props = defineProps({
  id: Number,
});

const getData = ref([])
const currentLesson = ref(null)
const openLessonId = ref(null)

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
</script>

<template>
  <div class="flex">
    <section>
      <article class="mx-10 mt-8 grid w-70 gap-4">
        <div class="max-w-3xl mx-auto space-y-4" v-for="course in getData" :key="course.id">
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
              <div class="p-1.5 bg-white dark:bg-gray-700">
                
                <div class="mt-2 flex items-center justify-between p-2 ">
                  <div class="flex items-center justify-center gap-2">
                    <p class="text-gray-700 dark:text-white/80 text-lg font-semibold  leading-relaxed">{{ lesson.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section>
      <Ressource :lesson="currentLesson" />
      <CompoComponent/>
    </section>
  </div>
</template>
