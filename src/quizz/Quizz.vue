<script setup>
import { ref } from 'vue';
import QuizzData from '@/data/quiz.json'
console.log(QuizzData);

</script>


<template>

    <div class="w-full px-4 py-16 mx-auto md:px-24 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">Testez vos connaissances !</h2>
        <p class="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/80">Répondez aux questions suivantes pour évaluer votre compréhension du cours.</p>
        </div>
        <div class="max-w-3xl mx-auto mt-12 space-y-8">
        <div v-for="(quiz, index) in QuizzData" :key="index.id" class="p-6 border  border-gray-200 rounded-lg shadow-sm dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Question {{ index + 1 }}: {{ quiz.question }}</h3>
            <div class="mt-4 space-y-2">
            <div v-for="(option, optIndex) in quiz.options" :key="optIndex" class="flex items-center">
                <input type="radio" :name="'question' + index" :value="option" class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label class="ml-2 text-gray-700 dark:text-white">{{ option }}</label>
            </div>
            </div>
        </div>
        <div class="text-center">
            <button class="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Soumettre</button>
        </div>
        </div>
    </div>      

</template>


<style scoped>


</style> 
 