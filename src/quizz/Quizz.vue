<!-- eslint-disable vue/multi-word-component-names -->
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
const results = ref([])

// Fonction pour soumettre le quiz et calculer le score
const submitQuiz = () => {
    if (!quiz) return;
    let count = 0;
    const tempResults = []

    quiz.questions.forEach((question, index) => {
        const userAnswer = userAnswers.value[index];
        const isCorrect = userAnswer?.trim().toLowerCase() === question.answer.trim().toLowerCase();

        if (isCorrect) count++;

        tempResults.push({
            question: question.question,
            userAnswer: userAnswer || 'Aucune réponse',
            correctAnswer: question.answer,
            isCorrect
        });
    });

    score.value = count;
    results.value = tempResults;
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
    return ((score.value / quiz.questions.length) * 100).toFixed(0);
});


</script>


<template>
    <div class="body">

        <div v-if="quiz" class="w-full px-4 py-16 mx-auto md:px-24 lg:px-8">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">Testez
                    vos
                    connaissances !</h2>
                <p class="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/80">Répondez aux questions
                    suivantes
                    pour évaluer votre compréhension du cours.</p>
            </div>
            <form v-if="quiz && !isFinished" @submit.prevent="submitQuiz" class="max-w-3xl mx-auto mt-12 space-y-8">
                <div v-for="(quizz, index) in QuizzDataFiltered[0].questions" :key="index"
                    class="p-6 border  border-gray-200 rounded-lg shadow-sm dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Question {{ index + 1 }}: {{
                        quizz.question }}</h3>
                    <div class="mt-4 space-y-2">
                        <div v-for="(opt, optIndex) in quizz.options" :key="optIndex" class="flex items-center">
                            <input :id="`q${index}opt${optIndex}`" type="radio" :name="`question-${index}`" :value="opt"
                                v-model="userAnswers[index]"
                                class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                            <label :for="`q${index}opt${optIndex}`" class="ml-2 text-gray-700 dark:text-white">{{ opt
                            }}</label>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <button @click="submitQuiz" :disabled="userAnswers.includes(null)"
                        class="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Soumettre</button>
                </div>
            </form>
        </div>

     
    </div>


    <section v-if="isFinished"
        class="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen transition-colors duration-300">
        <main class="container mx-auto px-4 py-8">
            <div class="max-w-3xl mx-auto">
                <!-- En-tête des résultats -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                    <div class="text-center">
                        <h2 class="text-2xl font-bold mb-2">Résultats de votre quiz</h2>
                        <p class="text-gray-600 dark:text-gray-400 mb-6">Vous avez terminé le quiz sur "{{ score }}"</p>

                        <div class="flex flex-col items-center">
                            <!-- Cercle de score -->
                            <div class="relative w-48 h-48 mb-6 bg-white dark:bg-sky-800 dark:border-sky-400 rounded-full border-7">
                                <div class="absolute inset-0 flex flex-col items-center justify-center">
                                    <span class="text-4xl font-bold"> {{ percentage }} %</span>
                                    <span class="text-gray-600 dark:text-gray-400">Score</span>
                                </div>
                            </div>

                            <div class="grid grid-cols-2 gap-6 w-full max-w-md">
                                <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                                    <p class="text-2xl font-bold">{{ score }}/{{ quiz.questions.length }}</p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Bonnes réponses</p>
                                </div>
                                <button @click="resetQuiz"
                                    class="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                    Recommencer le quiz
                                </button>
                               
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Détails des résultats -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                    <h3 class="text-xl font-bold mb-4">Détail des réponses</h3>

                    <div v-for="(res, index) in results" :key="index" :class="res.isCorrect
                        ? 'mb-4 p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-r'
                        : 'mb-4 p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 rounded-r'">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-medium">{{ index + 1 }} - {{ res.question }}</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Votre réponse :
                                    <span :class="res.isCorrect ? 'text-green-600' : 'text-red-600'">
                                        {{ res.userAnswer }}
                                    </span>
                                </p>
                                <p v-if="!res.isCorrect" class="text-sm text-green-600 dark:text-green-400 mt-1">
                                    Réponse correcte : <span class="font-medium">{{ res.correctAnswer }}</span>
                                </p>
                            </div>
                            <span :class="res.isCorrect
                                ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'
                                : 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100'"
                                class="text-xs px-2 py-1 rounded-full">
                                {{ res.isCorrect ? 'Correct' : 'Incorrect' }}
                            </span>
                        </div>
                    </div>

                 


                    <!-- <button
                        class="w-full mt-4 text-primary-500 dark:text-primary-400 font-medium flex items-center justify-center">
                        Voir toutes les questions <i class="fas fa-chevron-down ml-2"></i>
                    </button> -->
                </div>

                <!-- Classement et partage -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <h3 class="text-xl font-bold mb-4">Votre classement</h3>
                        <div class="flex items-center justify-center mb-4">
                            <div class="relative">
                                <i class="fas fa-crown text-yellow-500 text-4xl"></i>
                                <span
                                    class="absolute top-0 right-0 bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">42</span>
                            </div>
                        </div>
                        <p class="text-center">Vous êtes classé <span class="font-bold">42ème</span> sur 256
                            participants</p>
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                        <h3 class="text-xl font-bold mb-4">Partager vos résultats</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">Faites savoir à vos amis comment vous avez
                            réussi!</p>
                        <div class="flex justify-center space-x-4">
                            <button class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full">
                                <i class="fab fa-facebook-f"></i>
                            </button>
                            <button class="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full">
                                <i class="fab fa-twitter"></i>
                            </button>
                            <button class="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full">
                                <i class="fab fa-whatsapp"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <h3 class="text-xl font-bold mb-4">Prochaines étapes</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            class="bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center">
                            <i class="fas fa-redo mr-2"></i> Refaire le quiz
                        </button>
                        <button
                            class="border border-primary-500 text-primary-500 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 py-3 px-4 rounded-lg font-medium flex items-center justify-center">
                            <i class="fas fa-home mr-2"></i> Retour à l'accueil
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </section>

</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
    font-family: 'Poppins', sans-serif;
}

.progress-ring {
    transition: stroke-dashoffset 0.5s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
}
</style>