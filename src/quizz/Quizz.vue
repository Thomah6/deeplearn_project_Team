<script setup>
import { computed, ref } from 'vue';
import QuizzData from '@/data/quiz.json'
import { useRoute } from 'vue-router';
console.log(QuizzData);
const route = useRoute();
const courseId = Number(route.params.id);
const quiz = QuizzData.quizzes.find(q => q.course_id === courseId);

// Vérifie si quiz est trouvé
const title = quiz ? quiz.title : '';

const userAnswers = ref(Array(quiz?.questions.length).fill(null));

// console.log(courseId);

const filteredQuizzes = QuizzData.quizzes.filter((quiz) => quiz.course_id == courseId);


const QuizzDataFiltered = computed(() => QuizzData.quizzes.filter((quiz) => quiz.title == title))

console.log(QuizzDataFiltered.value);



// Score & état du quiz
const score = ref(0);
const isFinished = ref(false);

// Fonction pour soumettre le quiz et calculer le score
const submitQuiz = () => {
    if (!quiz) return;
    let count = 0;
    quiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers.value[index];
        if (userAnswer && userAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase()) {
            count++;
        }
    });
    score.value = count;
    isFinished.value = true;
};

// Pour recommencer le quiz (optionnel)
const resetQuiz = () => {
    if (!quiz) return;
    userAnswers.value = Array(quiz?.questions.length).fill(null);
    score.value = 0;
    isFinished.value = false;
};

const percentage = computed(() => {
    if (!quiz) return 0;
    return ((score.value / quiz.questions.length) * 100).toFixed(2);
});


</script>


<template>

    <div v-if="quiz" class="w-full px-4 py-16 mx-auto md:px-24 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">Testez vos
                connaissances !</h2>
            <p class="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/80">Répondez aux questions suivantes
                pour évaluer votre compréhension du cours.</p>
        </div>
        <form v-if="quiz && !isFinished" @submit.prevent="submitQuiz" class="max-w-3xl mx-auto mt-12 space-y-8">
            <div v-for="(quizz, index) in QuizzDataFiltered[0].questions" :key="index"
                class="p-6 border  border-gray-200 rounded-lg shadow-sm dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Question {{ index + 1 }}: {{
                    quizz.question }}</h3>
                <div class="mt-4 space-y-2">
                    <div v-for="(opt, optIndex) in quizz.options" :key="optIndex" class="flex items-center">
                        <input  :id="`q${index}opt${optIndex}`" type="radio" :name="`question-${index}`" :value="opt" v-model="userAnswers[index]"
                            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <label :for="`q${index}opt${optIndex}`"  class="ml-2 text-gray-700 dark:text-white">{{ option }}</label>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button @click="submitQuiz" :disabled="userAnswers.includes(null)"
                    class="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Soumettre</button>
            </div>
        </form>
     </div>

     <div v-if="isFinished" class="text-center mt-8">
      <h3 class="text-2xl font-semibold mb-4">Résultat</h3>
      <p class="mb-2">Vous avez obtenu <strong>{{ score }}</strong> bonnes réponses sur <strong>{{ quiz.questions.length }}</strong>.</p>
      <p>Soit <strong>{{ percentage }}%</strong> de réussite.</p>
      <button
        @click="resetQuiz"
        class="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Recommencer le quiz
      </button>
    </div>

</template>


<style scoped></style>