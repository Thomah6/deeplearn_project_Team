<script setup>
import BadgeCard from './BadgeCard.vue'

defineProps({
  badges: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div
    class="bg-white rounded-lg md:w-1/3 border border-sky-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <h2
      class="text-2xl font-bold mb-4 light:text-gray-800 dark:text-white text-center hover:underline cursor-pointer"
    >
      Mes Badges
    </h2>
    <!-- Responsive grid -->
    <div
      class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 light:bg-gray-100 p-4 rounded-lg"
    >
      <BadgeCard
        v-for="badge in badges"
        :key="badge.id"
        :icon="badge.icon"
        :label="badge.label"
        :color="badge.color"
      />
      <div v-if="!badges.length" class="col-span-full text-center text-gray-500 py-4">
        Aucun badge gagné pour le moment.
      </div>
    </div>
  </div>
</template>
<style scoped></style>
