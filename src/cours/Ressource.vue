<script setup>
import { defineProps, ref, watch } from 'vue';
import CourseProgress from './CourseProgress.vue';

const props = defineProps({
  lesson: Object,
})

const videoId = ref('')

// Extract YouTube video ID from URL
const extractYoutubeId = (url) => {
  if (!url) return ''
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : '';
}

watch(() => props.lesson, (newLesson) => {
  if (newLesson && newLesson.link_video) {
    videoId.value = extractYoutubeId(newLesson.link_video)
  }
}, { immediate: true })

//Nbre total de cours

</script>

<template>
  <section class="p-4 md:p-6 lg:p-10">
    <CourseProgress />
    <iframe
      v-if="videoId"
      class=" aspect-video my-4 md:my-10 rounded-lg w-full xl:h-[60vh]"
      :src="`https://www.youtube.com/embed/${videoId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
      <div>
        <button
        class="  font-semibold bg-green-500 rounded-lg p-2 text-lg dark:text-white cursor-pointer"
        @click="markAsCompleted(index)"></button>
      </div>
    <div v-if="props.lesson" class="mt-6">
      <h2 class="text-xl md:text-2xl dark:text-sky-400 font-bold mb-4 dark:text-white">{{ props.lesson.title }}</h2>
      <p class="text-gray-700 dark:text-white dark:text-white/80 text-base md:text-lg">{{ props.lesson.contenu }}</p>
    </div>

    <div v-else class="mt-6">
      <p>Sélectionnez une leçon pour voir le contenu</p>
    </div>
  </section>
</template>

<style scoped>
</style>
