<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['delete-user', 'toggle-admin'])
</script>

<template>
  <div>
    <h3 class="font-semibold mb-4 text-xl text-gray-800 dark:text-white">Liste des utilisateurs :</h3>

    <div class="mx-auto">
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-start">
                      <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Nom</span>
                    </th>
                    <th scope="col" class="px-6 py-3 text-start">
                      <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Email</span>
                    </th>
                    <th scope="col" class="px-6 py-3 text-start">
                      <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Statut</span>
                    </th>
                    <th scope="col" class="px-6 py-3 text-start">
                      <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="user in users" :key="user.id" class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <td class="size-px whitespace-nowrap align-top p-5 text-gray-800 dark:text-gray-200">{{ user.name }}</td>
                    <td class="size-px whitespace-nowrap align-top p-5 text-gray-800 dark:text-gray-200">{{ user.email }}</td>
                    <td class="size-px whitespace-nowrap align-top p-5">
                      <span :class="user.isAdmin ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'" class="px-2 py-1 text-xs font-medium rounded-full">
                        {{ user.isAdmin ? 'Admin' : 'Utilisateur' }}
                      </span>
                    </td>
                    <td class="size-px whitespace-nowrap align-top p-5">
                      <button @click="emit('delete-user', user.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2">Supprimer</button>
                      <button v-if="!user.isAdmin" @click="emit('toggle-admin', user)" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2">Promouvoir Admin</button>
                      <button v-else @click="emit('toggle-admin', user)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2">Rétrograder</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="!users || users.length === 0" class="p-4 text-yellow-800 rounded-lg mb-4 text-center dark:text-yellow-300">
                Aucun utilisateur disponible.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>