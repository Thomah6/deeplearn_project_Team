<script setup>

import CourseData from '@/data/Courses.json';

console.log(CourseData);

</script>


<template>
    <form class="w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg" action="">
        <h1 class="text-2xl font-bold text-white mb-6 text-center">Formulaire Admin Cour</h1>
        <div class="mb-4">
            <label class="block text-white mb-2" for="title">Titre du cours:</label>
            <input
                class="w-full px-4 py-2 rounded border border-sky-700 bg-gray-700 text-white focus:outline-none focus:border-sky-500"
                type="text"
                id="title"
                name="title"
                required
            >
        </div>
        <div class="mb-4">
            <label class="block text-white mb-2" for="level">Level</label>
            <input
                class="w-full px-4 py-2 rounded border border-sky-700 bg-gray-700 text-white focus:outline-none focus:border-sky-500"
                type="text"
                id="level"
                name="level"
                required
            >
        </div>
        <div class="mb-4">
            <label class="block text-white mb-2" for="category">Category</label>
            <input
                class="w-full px-4 py-2 rounded border border-sky-700 bg-gray-700 text-white focus:outline-none focus:border-sky-500"
                type="text"
                id="category"
                name="category"
                required
            >
        </div>
        <div class="mb-4">
            <label class="block text-white mb-2" for="lessons_count">Lessons Count</label>
            <input
                class="w-full px-4 py-2 rounded border border-sky-700 bg-gray-700 text-white focus:outline-none focus:border-sky-500"
                type="number"
                id="lessons_count"
                name="lessons_count"
                required
            >
        </div>
        <div class="mb-6">
            <label class="block text-white mb-2" for="description">Description:</label>
            <textarea
                class="w-full px-4 py-2 rounded border border-sky-700 bg-gray-700 text-white focus:outline-none focus:border-sky-500"
                id="description"
                name="description"
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