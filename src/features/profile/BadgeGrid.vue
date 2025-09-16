<script setup>
import BadgeCard from "./BadgeCard.vue";

import { ref } from "vue"
//Mes badges
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
      <div class="bg-white rounded-lg  md:w-1/3 border border-sky-200 dark:bg-gray-800 dark:border-gray-700">
          <h2 class="text-2xl font-bold mb-4 light:text-gray-800 dark:text-white text-center hover:underline cursor-pointer">Mes Badges</h2>
            <!-- Responsive grid -->
            <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 light:bg-gray-100 p-4 rounded-lg ">
              <BadgeCard
          v-for="badge in badges"
          :key="index"
          :icon="badge.icon"
          :label="badge.label"
          :color="badge.color"
          
              />
            </div>
      </div>
</template>
<style scoped></style>