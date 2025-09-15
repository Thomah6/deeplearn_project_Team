<script setup>
import { ref } from 'vue';
import BadgeCard from './BadgeCard.vue';
const BadgeGrid = ref("");

</script>


<template>

<div>
    BadgeGrid  
    <BadgeCard  :tab="BadgeGrid"/>
</div>

</template>


<style scoped>


</style>