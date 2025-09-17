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

  <div>
    <section class="text-blueGray-700 mt-20">
      <div class="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
          <div class="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
               <span class="inline-block py-1 px-2 rounded-full bg-green-600 text-white  text-xs font-bold tracking-widest mb-2">{{dataTable.category}}</span>
              <h1 class="mb-8 mt-5 text-2xl font-black tracking-tighter text-black md:text-5xl title-font"> {{dataTable.title}} </h1>
              <p class="mb-8 text-base leading-relaxed text-left text-blueGray-600 "> {{dataTable.description}} </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center pb-12">
                  <div class="h-12 w-12">
                    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/testimonials/t_1.png" alt class="h-full w-full object-cover overflow-hidden rounded-full" />
                  </div>
                  <p class="text-indigo-200 font-bold ml-3">
                    Jane Doe <br />
                    <span class="text-indigo-200 text-base font-light">Apple Inc</span>
                  </p>
                </div>
              </div>
              <div class="flex flex-col justify-center lg:flex-row">
                  <RouterLink :to="{ name:'lessons.show',  params: {id: dataTable.id}}">
                    <button class="flex items-center px-6 py-2 mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-gray-900 rounded-lg hover:bg-blue-700 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"> S'incrire au cours </button>
                  </RouterLink>
              </div>
          </div>
          <div class="w-full lg:w-1/3 lg:max-w-lg md:w-1/2">
              <img class="object-cover object-center rounded-lg " alt="hero" src="https://dummyimage.com/720x600/F3F4F7/8693ac">
          </div>
      </div>
    </section>

    <!-- component -->
    <section class="mx-15 dark:bg-gray-900 border">
      <div class="container px-6 py-10 mx-auto border">
          <div class="xl:grid xl:grid-cols-6 xl:gap-8 xl:items-center xl:justify-center xL:-mx-4 w-[75vw]">
              <div class="grid grid-cols-1 mt-8 xl:mt-0 xl:w-1/2 md:grid-cols-2" v-for="lesson in dataTable.lessons" :key="lesson.id">
                  <div class="w-60 p-2 text-center">
                        <img class="object-cover rounded-xl h-60 w-60" src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">
                      <h1 class="mt-2 text-md font-bold text-gray-700 capitalize dark:text-white">{{lesson.title}}</h1>
                      <p class="mt-2 text-gray-500 capitalize dark:text-gray-300"><strong>Leçon n°{{ lesson.id }} sur {{ dataTable.lessons_count }}</strong></p>
                  </div>
              </div>
          </div>
      </div>
    </section>
  </div>
</template>


<style scoped>


</style>
