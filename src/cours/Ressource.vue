<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { defineProps, ref, watch } from 'vue';
import CourseProgress from './CourseProgress.vue';

const props = defineProps({
  lesson: Object,
  nombre: Number
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

 const progresse = ref(0)

 function markAsCompleted(){
  if(progresse.value < 100){
    progresse.value += ( 100 / props.nombre)
  }
  console.log(progresse.value);
}

</script>

<template>
  <CourseProgress :progress="progresse"/>
  <section class="p-4 md:p-6 lg:p-10">
    <iframe
      v-if="videoId"
       class="w-full aspect-video my-4 md:my-10 rounded-lg xl:w-[60vw] xl:h-[60vh]"
      :src="`https://www.youtube.com/embed/${videoId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>

    <div v-if="props.lesson" class="mt-6">
      <h2 class="text-xl md:text-2xl dark:text-sky-400 font-bold mb-4 dark:text-white">{{ props.lesson.title }}</h2>
      <p class="text-gray-700 dark:text-white dark:text-white/80 text-base md:text-lg">{{ props.lesson.contenu }}</p>
    </div>

   <div v-else class="mt-6">
      <p>Sélectionnez une leçon pour voir le contenu</p>
    </div>
    <div class="flex justify-end">
      <button
        class="font-semibold rounded-lg p-2  bg-green-500 text-lg dark:text-white cursor-pointer transition-colors"
        @click.prevent="markAsCompleted">
        Marqué comme terminé
      </button>
    </div>

    <!-- Message de progression complète -->
    <!-- <div v-if="progress === 100" class="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
      <p class="text-center">Félicitations ! Leçon terminée ✅</p>
      <p v-if="props.progressComplete" class="text-center text-sm mt-2">Passage à la leçon suivante...</p>
    </div> -->


  </section>
</template>

<style scoped>
</style>
