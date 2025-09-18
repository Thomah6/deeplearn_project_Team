<script setup>
defineProps({
  courses: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['add-lesson', 'delete-course', 'edit-course'])
</script>

<template>
  <div>
    <h3 class="font-semibold mb-4 text-xl text-gray-800 dark:text-white">Liste des cours :</h3>

    <!-- Table Section -->
    <div class="mx-auto">
      <!-- Card -->
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              <!-- Table -->
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-start">
                      <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Titre</span>
                    </th>
                    <th scope="col" class="px-6 py-3 text-start">
                      <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Description</span>
                    </th>
                    <th scope="col" class="px-6 py-3 text-start">
                      <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="course in courses" :key="course.id" class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <td class="size-px whitespace-nowrap align-top p-5 text-gray-800 dark:text-gray-200">{{ course.title }}</td>
                    <td class="size-px whitespace-nowrap align-top p-5 text-gray-800 dark:text-gray-200">{{ course.description }}</td>
                    <td class="size-px whitespace-nowrap align-top p-5">
                      <button @click="emit('add-lesson', course)" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2 cursor-pointer">
                        Leçons
                      </button>
                      <button @click="emit('edit-course', course)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2 cursor-pointer">
                        Modifier
                      </button>
                      <button @click="emit('delete-course', course.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2 cursor-pointer">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="!courses || courses.length === 0" class="p-4 text-yellow-800 rounded-lg mb-4 text-center dark:text-yellow-300">
                Aucun cours disponible.
              </div>
              <!-- End Table -->
            </div>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
  </div>
</template>