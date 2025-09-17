<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
// import { useRouter } from 'vue-router';
import courseData from '@/data/courses.json'

const props = defineProps({
  id: Number,
});

// const route = useRouter()
const dataTable = ref([])

const getCourse = () => {
  dataTable.value = courseData.find((cour) => cour.id === props.id)
}
console.log(dataTable);

onMounted(() => {
  getCourse()
});

watch(() => props.id, getCourse)


</script>


<template>

  <div class="w-full">
    <section class="text-blueGray-700 w-full ">
      <div class="container w-full flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
          <div class="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
               <span class="inline-block py-2 px-4  bg-gray-700 dark:bg-white text-white dark:text-gray-700 text-xs font-bold tracking-widest mb-2"><i class="fa-solid fa-map-pin"></i>{{dataTable.category}}</span>
              <h1 class="mb-8 mt-5 text-2xl font-black tracking-tighter text-black dark:text-sky-400 md:text-5xl title-font"> {{dataTable.title}} </h1>
              <p class="mb-8 text-base leading-relaxed text-left text-gray-500 dark:text-white/80 "> {{dataTable.description}} </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center pb-12">
                  <div class="h-12 w-12">
                    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/testimonials/t_1.png" alt class="h-full w-full object-cover overflow-hidden rounded-full" />
                  </div>
                  <p class="text-indigo-500 dark:text-indigo-200 font-bold ml-3">
                    Jane Doe <br />
                    <span class="text-indigo-500 dark:text-indigo-200 text-base font-light">Apple Inc</span>
                  </p>
                </div>
              </div>
              <div class="flex flex-col justify-center lg:flex-row">
                  <RouterLink :to="{ name:'lessons.show',  params: {id: dataTable.id}}">
                    <button class="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-gray-700 dark:bg-sky-600 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"> S'incrire au cours </button>
                  </RouterLink>
              </div>
          </div>
          <div class="w-full lg:w-1/3 lg:max-w-lg md:w-1/2">
              <img class="w-full object-cover object-center rounded-lg " alt="hero" src="https://dummyimage.com/720x600/F3F4F7/8693ac">
          </div>
      </div>
    </section>

    <!-- component -->
    <section class="lg:mx-20 dark:bg-gray-900 ">
      <div class="container   px-6 py-10 mx-auto ">
          <div class="grid   xl:grid-cols-2 xl:gap-8 xl:items-center justify-center xL:-mx-4  w-full">
              <div class="grid 0 justify-center grid-cols-1 mt-8 xl:mt-0 border bg-sky-50 dark:bg-gray-700 border-gray-200  dark:border-sky-200 rounded-lg p-4 " v-for="lesson in dataTable.lessons" :key="lesson.id">
                  <div class=" text-xl gap-4 p-2 md:grid-cols-2  md:grid text-center">
                        <img class="object-cover mx-auto rounded-xl h-60 w-full" src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">
                        <div class="text-left">
                       <p class="mt-2 text-gray-500 capitalize dark:text-gray-300">
                         <strong>Leçon n°{{ lesson.id }} sur {{ dataTable.lessons_count }}</strong>
                       </p>
                       <h1 class="mt-2 text-md font-bold text-blue-700 capitalize dark:text-white">{{lesson.title}}</h1>
                       <div class="pt-8 ">
                        <strong class="text-gray-700 dark:text-white/80 ">
                         {{ lesson.description }}
                       </strong>
                       </div>
                     
                     </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  </div>
</template>


<style scoped>


</style>
