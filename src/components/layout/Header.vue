<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()



const router = useRouter()
const image = '/user.png'
const searchInput = ref(null)
const search = ref(route.query.q || '')

const showMobileSearch = ref(false)

const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}



const user = ref(null)
const isLogin = computed(() => localStorage.getItem('token') === 'true')

function handleKeyDown(e) {
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
  router.push('/auth').then(() => window.location.reload())
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  if (isLogin.value) {
    user.value = JSON.parse(localStorage.getItem('user'))
  }
  const savedTheme = localStorage.getItem('theme')

  isDark.value = document.documentElement.classList.contains('dark')
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// Watch dynamique : met à jour le query param ?q=...
watch(search, (newValue) => {
  router.replace({
    query: {
      ...route.query,
      q: newValue || undefined, // Supprime q si vide
    }
  })
})

</script>


<template>
 
  <header
    class="sticky top-0 inset-x-0 flex  flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-sky-50 border-b border-sky-200 text-sm py-4 lg:ps-65 dark:bg-slate-900 dark:border-slate-800">
    <nav class="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
      <div class="me-5 lg:me-0 lg:hidden">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex-none rounded-md text-xl md:text-3xl text-black dark:text-white inline-block font-semibold focus:outline-hidden focus:opacity-80"
          aria-label="Preline"
          style="font-family: 'Caveat', cursive"
        >
          DeepLearn.io
        </router-link>
      </div>
   
      <div
        class="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3"
      >
        <div class="hidden md:block">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
              <!-- Icon -->
              <svg class="shrink-0 size-4 text-gray-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <form @submit.prevent="SearchSend">
              <input
                ref="searchInput"
                type="text"
                class="py-2 ps-10 pe-16 block w-full border border-gray-200 bg-white border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:bg-gray-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-sky-500"
                placeholder="Search"
                v-model="search"
              />
            </form>
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
              <span class="text-xs">Ctrl+K</span>
            </div>
          </div>
        </div>

        <!-- Right Controls -->
        <div class="flex flex-row items-center justify-end gap-1">
          <button
            @click="toggleDark()"
            type="button"
            class="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-sky-200 focus:outline-hidden focus:bg-sky-200 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-slate-800 dark:focus:bg-slate-800"
          >
            <svg
              v-if="isDark"
              class="shrink-0 size-5"
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
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <svg v-else class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <span class="sr-only">Toggle dark mode</span>
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

            <!-- Dropdown content -->
            <div
              class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
              role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-account">

              <div class="py-3 px-5 bg-sky-50 rounded-t-lg dark:bg-slate-800">
                <p class="text-sm text-gray-500 dark:text-neutral-400">Connecté en tant que</p>
                <p class="text-sm font-medium text-gray-800 dark:text-neutral-200">{{ user.name }}</p>
                <p class="text-xs text-gray-600 dark:text-neutral-300">{{ user.email }}</p>
              </div>

              <div class="p-1.5 space-y-0.5">
                <router-link to="/profile"
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
                  Profile
                </router-link>
                <a
                  @click="logout"
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 cursor-pointer"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>

          <!-- Get Started Button -->
          <router-link v-if="!isLogin" to="/auth"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
            Get Started
          </router-link>
        </div>
      </div>
    </nav>
  </header>

  <!-- Breadcrumb Mobile -->
  <div class="-mt-px">
    <div
      class="sticky top-0 inset-x-0 z-20 bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700"
    >
      <div class="flex justify-between items-center py-2 gap-x-2">
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
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M15 3v18" />
            <path d="m8 9 3 3-3 3" />
          </svg>
        </button>
        <!-- End Navigation Toggle -->

        <!-- Search Input -->
        <div class="relative w-full" v-if="showMobileSearch">
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
            class="py-2 ps-10 pe-4 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-sky-500"
            placeholder="Search"
          />
        </div>

        <!-- Search -->
        <button
          @click="showMobileSearch = !showMobileSearch"
          type="button"
          class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-hidden focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
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
            <template v-if="showMobileSearch">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </template>
            <template v-else>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </template>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>


