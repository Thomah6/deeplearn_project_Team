<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import courseData from '@/data/courses.json';
import Ressource from './Ressource.vue';

const props = defineProps({
  id: Number,
});

const getData = ref([])
const currentLesson = ref(null)

function getCourse() {
  getData.value = courseData.filter((cour) => cour.id === props.id)
  // Set the first lesson as default when course is loaded
  if (getData.value.length > 0 && getData.value[0].lessons.length > 0) {
    currentLesson.value = getData.value[0].lessons[0]
  }
};

onMounted(() => {
  getCourse()
});

watch(() => props.id, () => getCourse())

function openLesson(lesson) {
  currentLesson.value = lesson
}
</script>

<template>
  <div class="flex">
    <section>
      <article class="mx-10 mt-8 grid w-70 gap-4">
        <div class="max-w-3xl mx-auto space-y-4" v-for="course in getData" :key="course.id">
          <!-- Loop through lessons instead of course -->
          <div v-for="lesson in course.lessons" :key="lesson.id"
               class="bg-white rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" :id="`accordion${lesson.id}`" class="peer hidden">
            <label :for="`accordion${lesson.id}`"
                   class="flex items-center justify-between p-4 bg-gray-800 text-white cursor-pointer hover:bg-gray-600 transition-colors"
                   @click="openLesson(lesson)">
              <span class="text-lg font-semibold">Leçon {{ lesson.id }} - {{ lesson.title }}</span>
              <svg class="w-6 h-6 transition-transform peer-checked:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </label>
            <div class="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div class="p-1.5">
                <div class="h-full w-full">
                  <div class="mt-5 flex items-center justify-between">
                    <div class="ml-2.5">
                      <a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <label class="inline-flex items-center text-xs text-gray-700">
                          <input type="checkbox" class="form-checkbox h-5 w-5 bg-blue-800 cursor-pointer" />
                          <p class="text-sm ml-2 font-bold text-navy-700 dark:text-white">
                            {{ lesson.title }}
                          </p>
                        </label>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="mt-2 flex items-center justify-between p-2">
                  <div class="flex items-center justify-center gap-2">
                    <input type="checkbox" class="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center">
                    <p class="text-gray-700 leading-relaxed">{{ lesson.description }}</p>
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
    </section>
  </div>
</template>
