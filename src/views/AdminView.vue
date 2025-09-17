<script setup>
import { ref, onMounted } from 'vue'
//Valeur pour afficher le nombre de cours
const coursesCount = ref(0)
//Valeur pour afficher le nombre d'utilisateurs
const usersCount = ref(0)
//Valeur pour afficher les utilisateurs
const showUsers = ref(false)
//Valeur pour afficher les cours
const showCourses = ref(false)

let id;
//Tableau des utilisateurs
const userArray = ref([
    { id: 1, name: 'Alice', email: 'nadegedjossou299@gmail.com' ,statues:'Débutant'},
    { id: 2, name: 'Bob', email: 'bob@gmail.com',statues:'Intermédiaire' },
    { id: 3, name: 'Charlie', email: 'charlie@gmail.com',statues:'Expert' },
])
//Tableau des cours
const courseArray = ref([
    { id: 1, title: 'Introduction to Vue.js', description: 'Apprenez les bases en vue js' },
    { id: 2, title: 'Advanced JavaScript',description: 'Approfondissez vos connaissances en JavaScript' },
    { id: 3, title: 'Web Development Basics', description: 'Les bases du développement web'},
])
//Simuler la récupération des données depuis une API ou une base de données
onMounted(() => {
    coursesCount.value = 12
    usersCount.value = 45
})
//Fonction pour afficher les utilisateurs
function userButton() {
    showUsers.value = !showUsers.value
}
//Fonction pour afficher les cours
function courseButton() {
  showCourses.value = !showCourses.value
}

//Fonction pour supprimer un cours
function SupButton(courseId) {
  id = courseId;
  //filter pour supprimer le cours avec l'id correspondant
  console.log(id);
courseArray.value = courseArray.value.filter(course => course.id !== id);
// coursesCount.value = courseArray.value.length;
}
</script>

<template>
    <div class=" bg-gray-200 dark:bg-gray-900 w-full ">
        <div class="w-full mx-auto mt-2 p-6 bg-gray-100 rounded-lg dark:bg-gray-900">
            <h1 class="text-2xl font-bold text-center mb-6 text-white">Tableau de bord Admin</h1>
            <div class="flex flex-col md:flex-row gap-6 mt-6">
                <div class="flex-1 bg-white rounded-md shadow p-5 text-center dark:bg-gray-700 text-white">
                    <h2 class="mb-3 text-lg font-semibold">Nombre de cours</h2>
                    <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ coursesCount }}</p>
                    <div class="bg-sky-300 w-full flex justify-center items-center p-5 mt-5 border border-gray-700 rounded-lg font-bold cursor-pointer">
                        <button class="cursor-pointer"@click="courseButton">Gérer les cours</button>
                    </div>
                </div>
                 
                 
                <div class="flex-1 bg-white rounded-md shadow p-5 text-center dark:bg-gray-700 text-white">
                    <h2 class="mb-3 text-lg font-semibold dark:text-white">Nombre d'utilisateurs</h2>
                    <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ usersCount }}</p>
                    <div class="bg-sky-300 w-full flex justify-center items-center p-5 mt-5 border border-gray-700 rounded-lg font-bold cursor-pointer">
                        <button class="cursor-pointer" @click="userButton">Gérer les utilisateurs</button>
                    </div>
        
                </div>
            </div>
        </div>
        <!-- //Affichage des utilisateurs -->
         <div v-if="showUsers" class="mt-4 text-left text-white m-2 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                        <h3 class="font-semibold mb-2 ">Liste des utilisateurs :</h3>



                                                       <!-- Table Section -->
<div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <!-- Card -->
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
       
 
          <!-- Table -->
          <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead class="bg-gray-50 dark:bg-neutral-800">
              <tr>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                      Nom
                    </span>
                  </div>
                </th>
 
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                      Email
                    </span>
                  </div>
                </th>
 
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                  Statues
                    </span>
                  </div>
                </th>

                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                     Actions
                    </span>
                  </div>
                </th>
 
               
              </tr>
            </thead>
 
            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
              <tr v-for="user in userArray" :key="user.id" class="bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                <td class="size-px whitespace-nowrap align-top p-5">{{ user.name }} </td>
                 
                   
               
                <td class="size-px whitespace-nowrap align-top p-5">{{ user.email }} </td>
                 
                   
                 <td class="size-px whitespace-nowrap align-top p-5">{{ user.statues }} </td>
             
                   <td class="size-px whitespace-nowrap align-top p-5">
                    <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2">Supprimer</button>
                    <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Modifier</button>
                   </td>
                 
      
              
               
              </tr>
 
 
            </tbody>
          </table>
          <!-- End Table -->

        </div>
      </div>
    </div>
  </div>
  <!-- End Card -->
</div>
                  
                    </div>
    <!-- //Affichage des cours -->
             <div v-if="showCourses" class="mt-4 text-left text-white m-2 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                        <h3 class="font-semibold mb-2 ">Liste des cours :</h3>
                   
                               <!-- Table Section -->
<div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <!-- Card -->
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
       
 
          <!-- Table -->
          <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead class="bg-gray-50 dark:bg-neutral-800">
              <tr>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                      Titre
                    </span>
                  </div>
                </th>
 
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                      Description
                    </span>
                  </div>
                </th>
 
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                     Actions
                    </span>
                  </div>
                </th>
 
               
              </tr>
            </thead>
 

            <div v-if="courseArray.length === 0" class="p-4 text-yellow-800 rounded-lg mb-4"> Aucnun cours disponible.</div>
                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                  <tr v-for="course in courseArray" :key="course.id" class="bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                    <td class="size-px whitespace-nowrap align-top p-5">{{ course.title }} </td>
                
                
                
                    <td class="size-px whitespace-nowrap align-top p-5">{{ course.description }} </td>
                
                
                
                
                       <td class="size-px whitespace-nowrap align-top p-5">
                        <button @click="SupButton(course.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2 cursor-pointer">Supprimer</button>
                        <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-poniter">Modifier</button>
                       </td>
                
                
                
                  </tr>
                </tbody>
            
          </table>
          <!-- End Table -->
 
        </div>
      </div>
    </div>
  </div>
  <!-- End Card -->
</div>
                       

                     
                    </div> 
    </div>

</template>
