<script setup>
const props = defineProps({
  progress : Number
})
// console.log(props.progress);


</script>



<template>

<div class="absolute right-21 w-280 bg-gray-200 rounded-full dark:bg-gray-700">
    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[4%] h-4" :style="{width: props.progress + '%'}">{{ progress }} %</div>
  </div>


</template>


<style scoped>


</style>
<!-- <script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  progress: Number
})

const animatedProgress = ref(0)

watch(() => props.progress, (newProgress) => {
  // Animation fluide de la barre de progression
  const animate = () => {
    if (animatedProgress.value < newProgress) {
      animatedProgress.value += 1
      requestAnimationFrame(animate)
    }
  }
  animate()
}, { immediate: true })
</script>

<template>
  <div class="absolute right-21 w-280 bg-gray-200 rounded-full dark:bg-gray-700">
    <div
      class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-4 transition-all duration-500 ease-in-out"
      :style="{ width: animatedProgress + '%' }">
      {{ animatedProgress }}%
    </div>
  </div>
</template> -->
