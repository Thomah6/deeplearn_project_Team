<script setup>
const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="sticky top-20 w-full bg-gray-200/80 bg-opacity-90 backdrop-blur-md rounded-full dark:bg-gray-700/80">
    <div
      class="bg-sky-600 text-xs font-medium text-blue-100 text-center p-2 leading-none rounded-full transition-all duration-500 ease-out"
      :style="{ width: `${progress}%` }"
    >
      <span v-if="progress > 10">{{ Math.round(progress) }}%</span>
    </div>
  </div>
</template>
