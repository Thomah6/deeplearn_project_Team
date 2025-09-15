<script setup>
import { ref } from 'vue';
import userImage from '/deeplearn_project_Team/public/user.png';
const image = ref(userImage);   
import addIcon from '/deeplearn_project_Team/public/add.png';
const add = ref(addIcon);
</script>


<template>
<div class="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
    
    <div class="rounded-full overflow-hidden w-20 h-20">
        <img :src="add" alt="">
        <span><img :src="image" alt=""></span>
    </div>
    <div>
        <h2 class="text-xl font-bold">Nadège Djossou</h2>
        <p class="text-gray-600">Student</p>
    </div>
</div>


</template>


<style scoped>


</style>