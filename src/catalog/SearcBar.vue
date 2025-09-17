<script setup>
import { onMounted, } from 'vue';


onMounted(()=>{
  function handlekeyDown() {
    if (event.ctrlkey && event.key.toLowercase() === 'k') {
      event.preventDefault();
    }
  }
  handlekeyDown();

  // const searchTerm = ref('')
  // function search(){

  // }
})

</script>


<template>

<div class="">
  <form @submit.prevent="onSubmit" class="">
    <input type="text" class="" @keydown="handlekeyDown" v-model="searchTerm" placeholder="Recherchez votre cours !">
  </form>
</div>

</template>


<style scoped>


</style>
