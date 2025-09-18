<script setup>
const props = defineProps({
  progress : Number
})

</script>


<template>


  <div class="absolute right-21 w-280 bg-gray-200 rounded-full dark:bg-gray-700">
    <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-4" :style="{width: props.progress + '%'}"></div>
  </div>


</template>


<style scoped>


</style>
