<script setup>
import { ref } from 'vue';
import BadgeGrid from '@/features/profile/BadgeGrid.vue';
import UserStats from '@/features/profile/UserStats.vue';
import Completed from '@/features/profile/completed.vue';



</script>
<template>

<div class="container mx-auto p-4 space-y-6 dark:text-white">

    <UserStats />
    
    <div class=" grid md:flex gap-6 w-full dark:text-white">

      
            <Completed />
     
            <BadgeGrid />
     
    </div>
    </div>
</template>