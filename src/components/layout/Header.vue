<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const image = '/user.png';

const searchInput = ref(null)
const router = useRouter()

const user = ref(null)
const isLogin = computed(() => localStorage.getItem('token') === 'true')

const handleKeyDown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    searchInput.value?.focus()
  }
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('status')
  user.value = null
  router.push('/auth').then(() => {
    window.location.reload()
  })
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  if (isLogin.value) {
    user.value = JSON.parse(localStorage.getItem('user'))
  }
})
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))
</script>

<template>
  <!-- ========== HEADER ========== -->
  <header
    class="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-sky-50 border-b border-sky-200 text-sm py-2.5 lg:ps-65 dark:bg-slate-900 dark:border-slate-800"
  >
    <nav class="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
      <div class="me-5 lg:me-0 lg:hidden">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex-none rounded-md text-3xl text-black dark:text-white inline-block font-semibold focus:outline-hidden focus:opacity-80"
          aria-label="Preline"
          style="font-family: 'Caveat', cursive"
        >
          DeepLearn.io
        </router-link>
        <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"></span>

        <!-- End Logo -->

        <div class="lg:hidden ms-1"></div>
      </div>

      <div
        class="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3"
      >
        <div class="hidden md:block">
          <!-- Search Input -->
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5"
            >
              <svg
                class="shrink-0 size-4 text-gray-400 dark:text-white/60"
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              ref="searchInput"
              type="text"
              class="py-2 ps-10 pe-16 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-sky-500"
              placeholder="Search"
            />
            <div class="hidden absolute inset-y-0 end-0 flex items-center z-20 pe-1">
              <button
                type="button"
                class="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                aria-label="Close"
              >
                <span class="sr-only">Close</span>
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </button>
            </div>
            <div
              class="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400"
            >
              <svg
                class="shrink-0 size-3 text-gray-400 dark:text-white/60"
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
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span class="mx-1">
                <svg
                  class="shrink-0 size-3 text-gray-400 dark:text-white/60"
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
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </span>
              <span class="text-xs">/</span>
            </div>
          </div>
          <!-- End Search Input -->
        </div>

        <div class="flex flex-row items-center justify-end gap-1">
          <button
            type="button"
            class="md:hidden size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-sky-200 focus:outline-hidden focus:bg-sky-200 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-slate-800 dark:focus:bg-slate-800"
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
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span class="sr-only">Search</span>
          </button>




          <!-- Dropdown -->
          <div
            v-if="isLogin && user"
            class="hs-dropdown [--placement:bottom-right] relative inline-flex"
          >
            <button
              id="hs-dropdown-account"
              type="button"
              class="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none dark:text-white"
            >
              <img
                class="shrink-0 size-9.5 rounded-full"
                :src="image"
                alt="Avatar"
              />
            </button>

            <div
              class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
              role="menu"
            >
              <div class="py-3 px-5 bg-sky-50 rounded-t-lg dark:bg-slate-800">
                <p class="text-sm text-gray-500 dark:text-neutral-400">Connecté en tant que</p>
                <p class="text-sm font-medium text-gray-800 dark:text-neutral-200">
                  {{ user.name }}
                </p>
                <p class="text-xs text-gray-600 dark:text-neutral-300">{{ user.email }}</p>
              </div>
              <div class="p-1.5 space-y-0.5">
                <router-link
                  to="/profile"
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                >
                  Profile
                </router-link>
                <a
                  @click="logout"
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300 cursor-pointer"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
          <div v-else class="flex items-center gap-x-2">

            <router-link
              to="/auth"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
             Get Started
            </router-link>
          </div>
          <!-- End Dropdown -->
        </div>
      </div>
    </nav>
  </header>

  <div class="-mt-px">
    <!-- Breadcrumb -->
    <div
      class="sticky top-0 inset-x-0 z-20 bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700"
    >
      <div class="flex items-center py-2">
        <!-- Navigation Toggle -->
        <button
          type="button"
          class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-hidden focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-application-sidebar"
          aria-label="Toggle navigation"
          data-hs-overlay="#hs-application-sidebar"
        >
          <span class="sr-only">Toggle Navigation</span>
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
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M15 3v18" />
            <path d="m8 9 3 3-3 3" />
          </svg>
        </button>
        <!-- End Navigation Toggle -->
      </div>
    </div>
    <!-- End Breadcrumb -->
  </div>
</template>
