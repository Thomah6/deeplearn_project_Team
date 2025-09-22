<script setup>
import { defineProps, ref, onMounted, watch, computed } from 'vue'
import courseData from '@/data/courses.json';
import Ressource from './Ressource.vue';
import CompoComponent from '@/component/compoComponent.vue';
const data=ref(JSON.parse(localStorage.getItem('courses')) || courseData)

const props = defineProps({
  id: Number,
});

const getData = ref([])
const currentLesson = ref(null)
const lengthLessons = ref(null)
const completedLessons = ref(new Set())
const currentUser = ref(null)

const progress = computed(() => {
  if (!lengthLessons.value) return 0
  const percentage = Math.floor((completedLessons.value.size / lengthLessons.value) * 100)
  return percentage
})

const isCurrentLessonCompleted = computed(() => {
  return currentLesson.value && completedLessons.value.has(currentLesson.value.id)
})

function getCourse() {
  getData.value = data.value.filter((cour) => cour.id === props.id)
  const course = getData.value[0]
  if (course) {
    lengthLessons.value = course.lessons.length
    // Set the first lesson as default when course is loaded
    if (course.lessons.length > 0) {
      currentLesson.value = course.lessons[0]
    }
  }
}

function handleLessonCompleted(lessonId) {
  if (completedLessons.value.has(lessonId)) return

  completedLessons.value.add(lessonId)

  // Update user progress in localStorage
  if (currentUser.value) {
    currentUser.value.coursesProgress = currentUser.value.coursesProgress || {}
    currentUser.value.coursesProgress[props.id] = Array.from(completedLessons.value)

    // Check if course is completed
    if (completedLessons.value.size === lengthLessons.value) {
      currentUser.value.completedCourses = currentUser.value.completedCourses || []
      if (!currentUser.value.completedCourses.includes(props.id)) {
        currentUser.value.completedCourses.push(props.id)
      }
      // Clean up progress for this course
      delete currentUser.value.coursesProgress[props.id]
    }

    // Save to localStorage
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = allUsers.findIndex(u => u.id === currentUser.value.id)
    if (userIndex !== -1) {
      allUsers[userIndex] = currentUser.value
      localStorage.setItem('users', JSON.stringify(allUsers))
    }
    localStorage.setItem('user', JSON.stringify(currentUser.value))
  }
}

onMounted(() => {
  getCourse()
  currentUser.value = JSON.parse(localStorage.getItem('user'))
  if (currentUser.value?.coursesProgress?.[props.id]) {
    completedLessons.value = new Set(currentUser.value.coursesProgress[props.id])
  }
})

watch(() => props.id, () => {
  getCourse()
  // Reset progress when changing course
  if (currentUser.value?.coursesProgress?.[props.id]) {
    completedLessons.value = new Set(currentUser.value.coursesProgress[props.id])
  } else {
    completedLessons.value = new Set()
  }
})

function openLesson(lesson) {
  currentLesson.value = lesson
}
</script>

<template>
  <div class="flex">
    <section>
      <article class="sticky top-20 mx-10 mt-8 grid w-70 gap-4">
        <div class="max-w-3xl mx-auto space-y-4" v-for="course in getData" :key="course.id">
          <!-- Loop through lessons instead of course -->
          <div v-for="lesson in course.lessons" :key="lesson.id"
               class="bg-white dark:bg-gray-700 dark:text-white/80 rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" :id="`accordion${lesson.id}`" class="peer hidden">
            <label :for="`accordion${lesson.id}`"
                   class="flex items-center justify-between p-4 bg-sky-800 dark:bg-gray-800 text-white cursor-pointer hover:bg-gray-600 transition-colors"
                   @click="openLesson(lesson)">
              <span class="text-lg font-semibold">Leçon {{ lesson.id }} - {{ lesson.title }}</span>
              <svg class="w-6 h-6 transition-transform peer-checked:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </label>
            <div class="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div class="p-1.5">

                <div class="mt-2 flex items-center justify-between p-2">
                  <div class="flex items-center justify-center gap-2">
                    <input type="checkbox" :checked="completedLessons.has(lesson.id)" disabled class="defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center">
                    <p class="text-gray-700 dark:text-white/80 leading-relaxed">{{ lesson.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section>
      <Ressource
        :lesson="currentLesson"
        :progress="progress"
        :is-completed="isCurrentLessonCompleted"
        @lesson-completed="handleLessonCompleted"
      />
      <CompoComponent  :course-id="props.id" />
    </section>

  </div>
</template>
