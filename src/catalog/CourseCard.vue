<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Props
const props = defineProps({
  course: {
    type: Array,
    default: () => [],
  }
})

// Recherche via l'URL
const search = computed(() => route.query.q?.toString().toLowerCase() || '')

// Dropdown open/close
const isOpen = ref(false)
function toggleDropdown() {
  isOpen.value = !isOpen.value
}

// Liste des catégories
const categorys = ref([])

// Filtres actifs
const activeLevel = ref('all')
const activeCategory = ref('all')

// Initialisation des catégories uniques
onMounted(() => {
  const allCategories = props.course.map(course => course.category)
  categorys.value = [...new Set(allCategories)]
})

// Filtrage global
const filteredCourses = computed(() => {
  console.log(search.value);
  if (!props.course || !Array.isArray(props.course)) return []
  return props.course.filter(course => {
    const keyword = search.value

    const matchKeyword =
      course.title.toLowerCase().includes(keyword) ||
      course.category.toLowerCase().includes(keyword) ||
      course.lessons.some(lesson =>
        lesson.title.toLowerCase().includes(keyword)
      )

    const matchLevel = activeLevel.value === 'all' || course.level === activeLevel.value
    const matchCategory = activeCategory.value === 'all' || course.category === activeCategory.value

    return matchKeyword && matchLevel && matchCategory
  })
})

</script>


<template>
  <div class=" w-full">


    <div class="px-4 sm:px-6 lg:px-8 pt-4 flex flex-col sm:flex-row items-center  gap-4 sm:gap-6">
      <!-- Filtre par niveau -->
      <div class="relative  inline-block text-left">
        <!-- Bouton -->
        <button @click="toggleDropdown"
          class="flex cursor-pointer items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-full sm:w-auto"
          type="button">
          <svg class="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path clip-rule="evenodd" fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
          Level
        </button>
        <!-- Dropdown -->
        <div v-if="isOpen"
          class="absolute left-0 mt-2 z-10 w-44 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
          <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li><span @click="activeLevel = 'Débutant'"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">Débutant</span>
            </li>
            <li><span @click="activeLevel = 'Intermédiaire'"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">Intermédiaire</span>
            </li>
            <li><span @click="activeLevel = 'Avancé'"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">Avancé</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Filtres par catégorie -->
      <div class="flex flex-wrap justify-center gap-3">
        <button
          class="flex cursor-pointer items-center justify-center px-4 h-10 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-3xl focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          type="button" @click="activeCategory = 'all'">
          Tous
        </button>

        <button v-for="cat in categorys" :key="cat"
          class="flex cursor-pointer items-center justify-center text-nowrap px-4 h-10 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-3xl focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          type="button" @click="activeCategory = cat">
          {{ cat }}
        </button>
      </div>
    </div>



    <TransitionGroup name="fade" tag="article"
      class="grid w-full mt-16 justify-center sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8">
      <div class="relative w-full " v-for="cours in filteredCourses" :key="cours.id">
        <div
          class="h-full border border-sky-200 justify-center  mx-auto hover:shadow-2xl rounded-2xl cursor-pointer transition ease-in duration-500  transform ">
          <!-- Centering wrapper -->
          <div
            class="relative flex reltive  w-full max-w-[26rem] flex-col h-full rounded-xl bg-white dark:bg-gray-800 bg-clip-border text-gray-700 dark:text-white/80 shadow-lg">
            <div
              class="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
              <img
                 :src="`/${cours.lessons[0].link_miniature}`"
                alt="ui/ux review check" class="object-fit h-sm" />
              <div
                class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
              </div>
            </div>
            <div class="p-6 flex-grow">
              <div class="flex items-center justify-between mb-3">
                <h5
                  class="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                  {{ cours.title }}
                </h5>
              </div>
              <p
                class="block font-sans text-base antialiased font-light leading-relaxed text-gray-700 dark:text-white/80">
                {{ cours.description.slice(0, 40) }}...
              </p>
              <div class="inline-flex flex-wrap items-center gap-4 mt-8 group">
                <div class="flex gap-2 items-center">
                  <span
                    class="cursor-pointer rounded-full border border-gray-900/5  dark:bg-gray-600 bg-gray-900/5 p-3 text-gray-900 dark:text-gray-300 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    <i class="fa-solid fa-book"></i>
                  </span>
                  <strong>{{ cours.lessons_count }} Leçons</strong>

                </div>
                <div class="flex gap-2 text-sky-900  dark:text-sky-200 items-center">
                  <span
                    class="cursor-pointer rounded-full border border-gray-900/5  dark:bg-gray-600 p-3 text-sky-900 dark:text-sky-200 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    <i class="fa-solid fa-flag-checkered"></i>
                  </span>
                  <strong>{{ cours.level }}</strong>
                </div>
              </div>
            </div>
            <div class="p-6 pt-0">
              <RouterLink :to="{ name: 'description.show', params: { id: cours.id } }"
                class="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                En savoir plus
              </RouterLink>
            </div>
            <span
              class="absolute top-0  right-0  py-2 px-8 rounded-bl-xl rounded-tr-xl  dark:text-white/80 font-semibold bg-sky-100 border border-sky-200 dark:bg-gray-700">{{
                cours.category }}</span>
          </div>
        </div>

      </div>
    </TransitionGroup>
  </div>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
