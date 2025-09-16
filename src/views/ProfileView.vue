<script setup>
import { ref } from 'vue';
import BadgeGrid from '@/features/profile/BadgeGrid.vue';
import UserStats from '@/features/profile/UserStats.vue';
import Completed from '@/features/profile/completed.vue';


</script>
<template>

<div class="container mx-auto p-4 space-y-6">
    <UserStats />
    <Completed />
    <BadgeGrid />
    </div>
</template>