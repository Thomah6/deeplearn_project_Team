import { computed, ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

// stores/courseProgress.js
import { defineStore } from 'pinia'

export const useCourseProgressStore = defineStore('courseProgress', {
  state: () => ({
    completedLessons: new Set(), // Leçons avec checkbox cochée + bouton cliqué
    checkedLessons: new Set(),   // Leçons avec seulement checkbox cochée
    totalLessons: 0
  }),
  actions: {
    setTotalLessons(count) {
      this.totalLessons = count;
    },
    toggleLessonCheck(lessonId, isChecked) {
      if (isChecked) {
        this.checkedLessons.add(lessonId);
      } else {
        this.checkedLessons.delete(lessonId);
        this.completedLessons.delete(lessonId); // Si décoché, retirer aussi des complétés
      }
    },
    markLessonCompleted(lessonId) {
      if (this.checkedLessons.has(lessonId)) {
        this.completedLessons.add(lessonId);
      }
    },
    getProgress() {
      if (this.totalLessons === 0) return 0;
      return Math.round((this.completedLessons.size / this.totalLessons) * 100);
    }
  }
})
