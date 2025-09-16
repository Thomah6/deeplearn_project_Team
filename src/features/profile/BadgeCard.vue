<script setup>
defineProps({
  icon: String,
  label: String,
  color: String
})
</script>

<template>

  <div class="flex flex-col items-center bg-white p-4 rounded-lg border border-gray-200  hover:shadow-lg transition-shadow duration-300">
    <!-- Cercle coloré avec icône -->
    <div
      class="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
      :class="color">
    
      {{ icon }}
    </div>
    <!-- Nom du badge -->
    <p class=" light:text-sm font-medium mt-2 dark:bg-gray-600">{{ label }}</p>
  </div>
</template>
<style scoped></style>