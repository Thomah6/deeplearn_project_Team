<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  usersData: Array,
})

const route = useRoute()
const router = useRouter()
const userCode = ref(['', '', '', '', '', ''])
const expectedCode = ref(route.query.code || '123456')
const newUser = ref(route.query.newUser ? JSON.parse(route.query.newUser) : null)
const inputRefs = ref([])
const errorMessage = ref('')
const isVerifying = ref(false)

// Focus sur le premier input au montage
onMounted(() => {
  if (inputRefs.value[0]) {
    inputRefs.value[0].focus()
  }
})

function handleInput(index, event) {
  const value = event.target.value

  // Ne permettre que des lettres et des chiffres, et convertir en majuscules
  if (!/^[a-zA-Z0-9]*$/.test(value)) {
    event.target.value = userCode.value[index] = ''
    return
  }

  // Mettre à jour la valeur
  const upperValue = value.toUpperCase()
  userCode.value[index] = event.target.value = upperValue

  // Passer à l'input suivant si un chiffre est saisi
  if (value && index < 5) {
    inputRefs.value[index + 1].focus()
  }

  // Effacer le message d'erreur lors de la saisie
  errorMessage.value = ''
}

function handleBackspace(index, event) {
  if (event.key === 'Backspace' && !userCode.value[index] && index > 0) {
    inputRefs.value[index - 1].focus()
  }
}

function handlePaste(event) {
  event.preventDefault()
  const pasteData = event.clipboardData.getData('text').toUpperCase().slice(0, 6)

  if (/^[a-zA-Z0-9]+$/.test(pasteData)) {
    const digits = pasteData.split('')
    digits.forEach((digit, index) => {
      if (index < 6) {
        userCode.value[index] = digit
      }
    })

    // Focus sur le dernier input rempli
    const lastIndex = Math.min(5, digits.length - 1)
    if (inputRefs.value[lastIndex]) {
      inputRefs.value[lastIndex].focus()
    }
  }
}

async function verifyCode() {
  isVerifying.value = true
  errorMessage.value = ''

  // Vérifier si tous les champs sont remplis
  if (userCode.value.some((digit) => !digit)) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    isVerifying.value = false
    return
  }

  const enteredCode = userCode.value.join('')

  // Simuler une vérification asynchrone
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (enteredCode === expectedCode.value) {
    // Logique d'enregistrement après vérification réussie
    if (newUser.value) {
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
      allUsers.push(newUser.value)
      localStorage.setItem('users', JSON.stringify(allUsers))

      localStorage.setItem('token', 'true')
      localStorage.setItem('user', JSON.stringify(newUser.value))
    }

    // Redirection après validation réussie
    router.push('/welcome')
  } else {
    errorMessage.value = 'Code incorrect. Veuillez réessayer.'
    // Réinitialiser les champs
    userCode.value = ['', '', '', '', '', '']
    if (inputRefs.value[0]) {
      inputRefs.value[0].focus()
    }
  }

  isVerifying.value = false
}
</script>

<template>
  <div
    class="verification-code-container min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12"
  >
    <div class="w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Vérification de sécurité
        </h2>
        <p class="text-gray-600 dark:text-neutral-400">
          Entrez le code à 6 chiffres envoyé à votre adresse email
        </p>
      </div>

      <form @submit.prevent="verifyCode" class="space-y-6">
        <div class="flex justify-between space-x-2 mb-2">
          <input
            v-for="(digit, index) in userCode"
            :key="index"
            :ref="(el) => (inputRefs[index] = el)"
            v-model="userCode[index]"
            @input="handleInput(index, $event)"
            @keydown="handleBackspace(index, $event)"
            @paste="handlePaste"
            type="text"
            inputmode="text"
            pattern="[A-Za-z0-9]*"
            maxlength="1"
            class="w-12 h-12 text-center text-xl font-semibold bg-gray-100 dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:text-white transition-colors"
            :class="{ 'border-red-500 dark:border-red-400': errorMessage }"
          />
        </div>

        <div v-if="errorMessage" class="text-red-500 dark:text-red-400 text-sm text-center">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="isVerifying"
          class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
        >
          <span v-if="!isVerifying">Vérifier le code</span>
          <span v-else>Vérification...</span>
        </button>
      </form>

      <!-- <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 dark:text-neutral-400">
          Vous n'avez pas reçu de code?
          <a href="#" class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
            Renvoyer le code
          </a>
        </p>
      </div> -->
    </div>
  </div>
</template>
