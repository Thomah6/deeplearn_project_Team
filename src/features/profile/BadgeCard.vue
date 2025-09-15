<script setup>

import { ref } from "vue"

// Nombre de cours terminés
const completedCourses = ref(12)

// Liste des badges
const badges = ref([
  { icon: "⭐", label: "Débutant", color: "bg-yellow-300" },
  { icon: "🔥", label: "Intermédiaire", color: "bg-green-300" },
  { icon: "🏆", label: "Expert", color: "bg-purple-300" },
])
</script>


<template>
<div v-for="value in source" class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
      
      <!-- Titre -->
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        Mon Tableau de progression
      </h2>

      <!-- Cours terminés -->
      <div class="bg-blue-100 text-blue-800 p-4 rounded-xl flex items-center justify-between mb-6">
        <span class="text-lg font-semibold">Cours terminés</span>
        <span class="text-2xl font-bold">{{ completedCourses }}</span>
      </div>

      <!-- Badges -->
      <h3 class="text-lg font-semibold text-gray-700 mb-3">🏅 Mes Badges</h3>
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="(badge, index) in badges"
          :key="index"
          class="flex flex-col items-center"
        >
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            :class="badge.color"
          >
            {{ badge.icon }}
          </div>
          <p class="text-sm font-medium mt-2">{{ badge.label }}</p>
        </div>
      </div>

    </div>
  </div>

</template>


<style scoped>


</style>