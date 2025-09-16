<script setup>
const image = '/user.png';
const add = '/add_reaction_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png';
</script>


<template>
<div class="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
    
    <div class="rounded-full overflow-hidden w-25 h-30">
        <img :src="add" alt="">
        <span><img :src="image" alt=""></span>
    </div>
    <div>
        <h2 class="text-xl font-bold">Nadège Djossou</h2>
        <p class="text-gray-600">Student</p>
        <p class="text-gray-600">nadegedjossou299@gmail.com</p>
    </div>
</div>


</template>


<style scoped>


</style>