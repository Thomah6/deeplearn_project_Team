<script setup>
import BadgeCard from "./BadgeCard.vue";

import { ref } from "vue"

const badges = ref([
  { icon: "⭐", label: "Débutant", color: "bg-yellow-300" },
  { icon: "🔥", label: "Intermédiaire", color: "bg-green-300" },
  { icon: "🏆", label: "Expert", color: "bg-purple-300" },
  { icon: "🚀", label: "Avancé", color: "bg-blue-300" },
  { icon: "🎯", label: "Pro", color: "bg-red-300" },
  { icon: "👑", label: "Maître", color: "bg-pink-300" },
])
</script>

<template>
  <!-- Responsive grid -->
  <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 light:bg-gray-100 p-4 rounded-lg  dark:bg-gray-800">
    <BadgeCard
      v-for="badge in badges"
      :key="index"
      :icon="badge.icon"
      :label="badge.label"
      :color="badge.color"
    />
  </div>
</template>
<style scoped></style>