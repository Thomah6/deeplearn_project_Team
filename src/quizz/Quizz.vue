<script setup>
import { computed, ref } from 'vue';
import QuizzData from '@/data/quiz.json'
import { useRoute } from 'vue-router';
console.log(QuizzData);
const route = useRoute();
const courseId = route.params.id;
console.log(courseId);
 const title = QuizzData.quizzes.filter((quiz) => quiz.course_id == courseId)[0].title
const QuizzDataFiltered = computed(()=>QuizzData.quizzes.filter((quiz) => quiz.title == title))
console.log(QuizzDataFiltered.value);


</script>


<template>
    <div class="w-full px-4 py-16 mx-auto md:px-24 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">Testez vos connaissances !</h2>
        <p class="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/80">Répondez aux questions suivantes pour évaluer votre compréhension du cours.</p>
        </div>
        <div class="max-w-3xl mx-auto mt-12 space-y-8">
       <div v-for="(quizz,index) in QuizzDataFiltered[0].questions" :key="index" class="p-6 border  border-gray-200 rounded-lg shadow-sm dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Question {{ index + 1 }}: {{ quizz.question }}</h3>
            <div class="mt-4 space-y-2">
             <div v-for="(opt, optIndex) in quizz.options" :key="optIndex" class="flex items-center">
                <input id="opt" type="radio" :name="'question' + index" :value="opt" class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label for="opt" class="ml-2 text-gray-700 dark:text-white">{{ opt }}</label>
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
 