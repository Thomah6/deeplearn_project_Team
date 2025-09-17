<script setup>
// import CategoryFilter from './CategoryFilter.vue';
import { ref,onMounted } from 'vue'

const props = defineProps({
  course : Array
})
console.log(props.course);

const categorysAll=ref([])
const categorys=ref([])

const isOpen = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}


const DataFiltered=ref(props.course)


function filter(cat) {
if(cat=="all"){
DataFiltered.value=props.course
}else{
 DataFiltered.value = props.course.filter(el => el.category === cat)


}

}

function filterByLevel(level) {
  if(level!=="all"){

    DataFiltered.value = props.course.filter(el => el.level === level)
  }
}

onMounted(()=>{
 props.course.map((cour)=>{categorysAll.value.push(cour.category)})
  categorys.value=[...new Set(categorysAll.value)]
  filterByLevel("all")
})

</script>


<template>
 <div class="relative top-8">
    <div class="absolute left-40 inline-block text-left">
      <!-- Bouton -->
      <button
        @click="toggleDropdown"
        class="flex cursor-pointer items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="button"
      >
        <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
        Level
      </button>
      <!-- Dropdown -->
      <div
        v-if="isOpen"
        class="absolute left-0 mt-2 z-10 w-44 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 p-4"
      >
        <div class="py-1">
          <span @click="()=>{filterByLevel('Débutant')}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Débutant</span>
        </div>
        <div class="py-1">
          <span @click="()=>{filterByLevel('Intermédiaire')}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Intermédiaire</span>
        </div>
        <div class="py-1">
          <span @click="()=>{filterByLevel('Avancé')}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Avancé</span>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center absolute left-66 gap-6 border-l-[1px] pr-10 h-10"></div>


    <div class="flex absolute left-70 text-left gap-3 ">
      <button
          class="flex cursor-pointer items-center justify-center w-20 h-10 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-3xl focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          type="button"
          @click="()=>{filter('all')}"
        >
          Tous
      </button>

      <button v-for="cat in categorys" :key="cat"
          class="flex cursor-pointer items-center justify-center text-nowrap px-8 h-10 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-3xl focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          type="button"
          @click="()=>{filter(cat)}"
        >
          {{cat}}
      </button>

    </div>
 </div>



<article class="grid grid-cols-3 mx-40 gap-10 relative mt-20">
  <div class="flex justify-center items-center min-h-[65vh]" v-for="cours in DataFiltered" :key="cours.id">
      <div class="max-w-[720px] mx-auto hover:shadow-2xl rounded-2xl cursor-pointer transition ease-in duration-500  transform hover:scale-105">
          <!-- Centering wrapper -->
          <div class="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div
            class="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">

                  <img
                      src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                      alt="ui/ux review check" />
                  <div
                      class="absolute  inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
                  </div>
              </div>
              <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                      <h5 class="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                          {{ cours.title}}
                      </h5>
                  </div>
                  <p class="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                     {{cours.description}}
                  </p>
                  <div class="inline-flex flex-wrap items-center gap-3 mt-8 group">
                      <span
                          class="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                          <i class="fa-solid fa-book"></i>
                        </span>
                         <strong>{{cours.lessons_count}} Leçons</strong>
                  </div>
              </div>
              <div class="p-6 pt-3">
                  <RouterLink :to="{ name: 'description.show', params: {id: cours.id}}"
                      class="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button">
                      En savoir plus
                  </RouterLink>
              </div>
          </div>
      </div>
  </div>
</article>

</template>


<style scoped>


</style>
