<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { RouterLink } from 'vue-router';
const user = ref(null)

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) user.value = JSON.parse(storedUser);
})

</script>

<template>
  <!-- Sidebar -->
  <div
    id="hs-application-sidebar"
    class="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-65 h-full hidden fixed inset-y-0 start-0 z-50 bg-sky-50 border-e border-sky-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-slate-900 dark:border-slate-800"
    role="dialog"
    tabindex="-1"
    aria-label="Sidebar"
  >
    <div class="relative flex flex-col h-full max-h-full">
      <div class="px-6 pt-4 flex items-center">
        <!-- Logo -->
        <router-link
          to="/"
          style="font-family: 'Caveat', cursive"
          class="text-black dark:text-white text-3xl flex-none rounded-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
          aria-label="Preline"
        >
          DeepLearn.io
        </router-link>
        <!-- End Logo -->

        <div class="hidden lg:block ms-2"></div>
      </div>

      <!-- Content -->
      <div
        class="pt-8 mt-4 border-t border-sky-200 dark:border-gray-700 h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-sky-100 [&::-webkit-scrollbar-thumb]:bg-sky-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500"
      >
        <nav
          class="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul class="flex  flex-col space-y-1">
            <li>
              <router-link
                to="/"
                class="text-xl flex items-center gap-x-3.5 py-2 px-2.5 bg-sky-100  text-slate-700 rounded-lg hover:bg-sky-200 focus:outline-hidden focus:bg-sky-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:bg-slate-700 dark:text-white"
              >
                <svg
                  class="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Home
              </router-link>
            </li>

            <li class="hs-accordion" id="users-accordion">
              <router-link
                to="/catalog"
                type="button"
                class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-xl text-slate-700 rounded-lg hover:bg-sky-200 focus:outline-hidden focus:bg-sky-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:focus:bg-slate-800 dark:text-neutral-200"
                aria-expanded="true"
                aria-controls="users-accordion-child"
              >
                <svg
                  class="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Catalog
              </router-link>
            </li>

             <li class="hs-accordion" id="users-accordion">
              <router-link
                to="/c"
                type="button"
                class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-xl text-slate-700 rounded-lg hover:bg-sky-200 focus:outline-hidden focus:bg-sky-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:focus:bg-slate-800 dark:text-neutral-200"
                aria-expanded="true"
                aria-controls="users-accordion-child"
              >


                <svg
                  class="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
                AI Chatbot
              </router-link>
            </li>

             <li v-if="user && user.isAdmin" class="hs-accordion" id="users-accordion">
              <router-link
                to="/admin"
                type="button"
                class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-xl text-slate-700 rounded-lg hover:bg-sky-200 focus:outline-hidden focus:bg-sky-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:focus:bg-slate-800 dark:text-neutral-200"
                aria-expanded="true"
                aria-controls="users-accordion-child"
              >
                Admin Space
              </router-link>
            </li>

          </ul>
        </nav>
      </div>
      <!-- End Content -->
    </div>
  </div>
</template>
