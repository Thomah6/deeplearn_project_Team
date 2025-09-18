<script setup>
defineProps({
  message: String,
  type: {
    type: String,
    default: 'success', // 'success' or 'error'
  },
})
</script>

<template>
  <div
    v-if="message"
    class="fixed top-20 right-5 z-50 p-4 rounded-md shadow-lg text-white"
    :class="{
      'bg-green-500': type === 'success',
      'bg-red-500': type === 'error',
    }"
  >
    <div class="flex items-center">
      <svg v-if="type === 'success'" class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
      <svg v-else class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      <span>{{ message }}</span>
    </div>
  </div>
</template>