<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  lesson: Object
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
</script>

<template>
  <section class="mx-6 relative bottom-13 p-10">
    <iframe
      v-if="videoId"
      class="xl:w-[60vw] xl:h-[60vh] my-10 rounded-lg md:h-80"
      :src="`https://www.youtube.com/embed/${videoId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>

    <div v-if="props.lesson" class="mt-6">
      <h2 class="text-2xl font-bold mb-4">{{ props.lesson.title }}</h2>
      <p class="text-gray-700">{{ props.lesson.contenu }}</p>
    </div>

    <div v-else class="mt-6">
      <p>Sélectionnez une leçon pour voir le contenu</p>
    </div>
  </section>
</template>

<style scoped>
</style>
