<script setup>
// import CategoryFilter from './CategoryFilter.vue';

const props = defineProps({
  course : Array
})
console.log(props.course);

</script>


<template>

<article class="">
  <div class="" >
    <!-- <CategoryFilter /> -->
    <!-- <section class="text-gray-600 body-font">
    <div class="container px-5 py-10 mx-auto" >
      <div class="flex flex-wrap -m-4">
        <div class="p-4 lg:w-1/3" v-for="cours in course" :key="cours.id">
          <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative" >
            <img class="lg:h-48 md:h-36 w-full object-cover object-center" :src="cours.lessons.link_miniature" alt="blog">

            <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{{ cours.category}}</h2>
            <p class="text-indigo-500 inline-flex items-center">{{ cours.level }}</p>
            <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{{ cours.title}}</h1>
            <p class="leading-relaxed mb-3">{{cours.description}}</p>
            <a class="text-indigo-500 inline-flex items-center">Learn More
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
              <span class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>1.2K
              </span>
              <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
   </section> -->
  </div>
</article>
<!-- component -->
<!-- component -->
<article class="grid grid-cols-3 mx-80 relative left-60">
  <div class="flex justify-center items-center min-h-screen" v-for="cours in course" :key="cours.id">
      <div class="max-w-[720px] mx-auto">
          <div class="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
              <a
                  target="_blank"
                  href="https://www.material-tailwind.com/docs/html/card"
                  class="block w-full px-4 py-2 text-center text-slate-700 transition-all"
              >
                  More components on <b>Material Tailwind</b>.
              </a>
          </div>

          <!-- Centering wrapper -->
          <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
              <div
                  class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                  <img
                      src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
                      alt="card-image" />
              </div>
              <div class="p-6">
                  <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {{ cours.title}}
                  </h5>
                  <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                      {{cours.description}}
                  </p>
              </div>
              <div class="p-6 pt-0">
                  <button
                      class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                      type="button">
                      Read More
                  </button>
              </div>
          </div>
      </div>
  </div>
</article>

</template>


<style scoped>


</style>
