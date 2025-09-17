<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(5)
const countdownProgress = ref(0)
let countdownInterval = null

// Fonction de redirection
const redirectNow = () => {
  
  clearInterval(countdownInterval)
  router.push('/')
}

// Démarrer le compte à rebours
onMounted(() => {
  countdownInterval = setInterval(() => {
    countdown.value -= 1
    countdownProgress.value = 100 - countdown.value * 20 // 5 secondes -> 20% par seconde

    if (countdown.value === 0) {
      redirectNow()
    }
  }, 1000)
})

// Nettoyer l'intervalle quand le composant est démonté
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<template>
  <div
    class="w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-neutral-800 px-4"
  >
    <div class="items-center h-full  w-full gap-8 py-8">
      <!-- Logo --><br /><br /><br /><br />
      <h1
        class="rounded-md mb-12 text-center text-3xl text-black dark:text-white font-semibold focus:outline-hidden focus:opacity-80"
        style="font-family: 'Caveat', cursive"
      >
        DeepLearn.io
      </h1>

      <!-- Carte de bienvenue -->
      <div
        style="max-width: 512px"
        class="text-center mx-auto grid gap-6 bg-white/80 dark:bg-neutral-800/90 backdrop-blur-md rounded-xl border border-sky-200 dark:border-neutral-700/30 px-8 py-8"
      >
        <!-- Icône de validation -->
        <div class="flex justify-center">
          <div
            class="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-12 h-12 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Titre et message -->
        <div class="grid gap-2">
          <h1 class="text-7xl font-bold text-gray-800 dark:text-white">Bienvenue !</h1>
          <p class="text-lg text-gray-600 dark:text-white">
            Votre compte a été vérifié avec succès. Vous serez redirigé vers la page d'accueil dans
            quelques instants.
          </p>
        </div>

        <!-- Compte à rebours visuel -->
        <div class="grid gap-2">
          <div class="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2.5">
            <div
              class="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-linear"
              :style="{ width: countdownProgress + '%' }"
            ></div>
          </div>
          <p class="text-sm text-gray-500 dark:text-neutral-400">
            Redirection dans {{ countdown }} seconde{{ countdown !== 1 ? 's' : '' }}
          </p>
        </div>

        <!-- Bouton de redirection manuelle -->
        <button
          @click="redirectNow"
          class="px-6 py-3 w-[fit-content] mx-auto text-center justify-self-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
        >
          Me rediriger maintenant
        </button>
        <br /><br />
      </div>
    </div>
  </div>
</template>


