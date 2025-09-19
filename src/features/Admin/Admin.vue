<script setup>
import { ref } from 'vue';

// Définir les événements que ce composant peut émettre
const emit = defineEmits(['add-course']);

// Utiliser ref pour lier les données du formulaire
const course = ref({
    title: '',
    level: 'Débutant', // Valeur par défaut
    category: '',
    lessons_count: 0, // Initialisé à 0 car les leçons sont ajoutées après
    description: ''
});

const submitForm = () => {
    // Émettre un événement vers le parent avec les données du formulaire
    emit('add-course', { ...course.value });

    // Réinitialiser le formulaire après soumission
    course.value = {
        title: '',
        level: 'Débutant',
        category: '',
        lessons_count: 0,
        description: ''
    };
}

</script>


<template>
    <form @submit.prevent="submitForm" class="max-w-lg md:w-full  mx-auto h-[fit-content] bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 border border-sky-200 dark:border-sky-700 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Ajouter un nouveau cours</h1>
        <div class="mb-4">
            <label class="block text-gray-700 dark:text-white mb-2" for="title">Titre du cours:</label>
            <input
                class="w-full px-4 py-2 rounded border border-gray-300 dark:border-sky-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-sky-500"
                type="text"
                id="title"
                v-model="course.title"
                required
            >
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 dark:text-white mb-2" for="level">Niveau</label>
            <select 
                id="level" 
                v-model="course.level"
                class="w-full px-4 py-2 rounded border border-gray-300 dark:border-sky-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-sky-500"
            >
                <option>Débutant</option>
                <option>Intermédiaire</option>
                <option>Avancé</option>
            </select>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 dark:text-white mb-2" for="category">Catégorie</label>
            <input
                class="w-full px-4 py-2 rounded border border-gray-300 dark:border-sky-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-sky-500"
                type="text"
                id="category"
                v-model="course.category"
                required
                placeholder="Ex: Business, Software engineering & IT"
            >
        </div>
        <div class="mb-6">
            <label class="block text-gray-700 dark:text-white mb-2" for="description">Description:</label>
            <textarea
                class="w-full px-4 py-2 rounded border border-gray-300 dark:border-sky-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-sky-500"
                id="description"
                v-model="course.description"
                required
                rows="4"
            ></textarea>
        </div>
        <div class="flex justify-center">
            <button
                type="submit"
                class="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded shadow transition duration-200 cursor-pointer"
            >
                Ajouter le cours
            </button>
        </div>
    </form>
</template>