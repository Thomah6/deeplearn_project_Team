<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['save-lesson'])

const newLesson = ref({
  title: '',
  description: '',
  contenu: '',
  link_video: '',
})

const handleAddLesson = () => {
  if (!newLesson.value.title) return
  emit('save-lesson', { ...newLesson.value })
  // Reset form
  newLesson.value = { title: '', description: '', contenu: '', link_video: '' }
}

const lessonFormTitle = computed(() => {
  return `Ajouter une leçon à: "${props.course.title}"`
})
</script>

<template>
  <div>
    <form @submit.prevent="handleAddLesson" class="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 border border-sky-200 dark:border-sky-700 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">{{ lessonFormTitle }}</h2>

      <!-- Form fields -->
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-white mb-2" for="lessonTitle">Titre de la leçon:</label>
        <input v-model="newLesson.title" class="w-full px-4 py-2 rounded border border-gray-300 dark:border-sky-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-sky-500" type="text" id="lessonTitle" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-white mb-2" for="lessonDesc">Description courte:</label>
        <input v-model="newLesson.description" class="w-full px-4 py-2 rounded border border-gray-300 dark:border-sky-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-sky-500" type="text" id="lessonDesc" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 dark:text-white mb-2" for="lessonVideo">Lien vidéo (YouTube):</label>
        <input v-model="newLesson.link_video" class="w-full px-4 py-2 rounded border border-gray-300 dark:border-sky-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-sky-500" type="url" id="lessonVideo" required />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 dark:text-white mb-2" for="lessonContent">Contenu de la leçon:</label>
        <textarea v-model="newLesson.contenu" class="w-full px-4 py-2 rounded border border-gray-300 dark:border-sky-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-sky-500" id="lessonContent" required rows="6"></textarea>
      </div>

      <div class="flex justify-center">
        <button type="submit" class="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded shadow transition duration-200 cursor-pointer">Ajouter la leçon</button>
      </div>
    </form>
  </div>
</template>