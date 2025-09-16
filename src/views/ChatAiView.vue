<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const chatContainer = ref(null)

const OPENROUTER_API_KEY = "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"

const YOUR_SITE_URL = 'http://localhost:5173' // Remplacez par l'URL de votre site
const YOUR_SITE_NAME = 'DeepLearn.io' // Remplacez par le nom de votre site

const systemPrompt = {
  role: 'system',
  content: `Tu es un mentor expert en apprentissage qui accompagne un apprenant dans son parcours e-learning. Ton rôle est d’expliquer clairement, de manière simple et bienveillante, les concepts pédagogiques demandés, en les adaptant au niveau et aux besoins de l’apprenant. Tu donnes des exemples concrets, des exercices pratiques, tu proposes un suivi structuré et tu encourages la progression pas à pas.

Reste toujours positif et patient, même en cas de répétition ou d’erreurs de l’apprenant.

Ne donne pas de réponses toutes faites sans explications : favorise la compréhension active.

Gère les sujets avec rigueur, évite toute spéculation, jugement ou hors sujet.

En cas de question hors cadre pédagogique, redirige poliment vers le sujet d’apprentissage.

Sois clair, concis et utilise un langage accessible.

Propose des mini-objectifs, des exercices courts et des ressources complémentaires.

Adapte toujours ta réponse au niveau actuel et au rythme de l’apprenant.

Favorise l’autonomie progressive, en guidant sans faire à la place.`
}

onMounted(() => {
  const savedMessages = localStorage.getItem('chatHistory')
  if (savedMessages) {
    messages.value = JSON.parse(savedMessages)
  }
})

watch(
  messages,
  (newMessages) => {
    localStorage.setItem('chatHistory', JSON.stringify(newMessages))
    scrollToBottom()
  },
  { deep: true }
)

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const userMessage = {
    role: 'user',
    content: userInput.value
  }
  messages.value.push(userMessage)
  userInput.value = ''
  isLoading.value = true

  const messagesForApi = [
    systemPrompt,
    ...messages.value.map(({ role, content }) => ({ role, content }))
  ]

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': YOUR_SITE_URL,
        'X-Title': YOUR_SITE_NAME,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat', 
        messages: messagesForApi
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'An error occurred with the API.')
    }

    const data = await response.json()
    const aiMessage = data.choices[0].message
    messages.value.push(aiMessage)
  } catch (error) {
    console.error('Error calling OpenRouter API:', error)
    messages.value.push({
      role: 'assistant',
      content: `Désolé, une erreur est survenue. Veuillez vérifier votre clé d'API et la console pour plus de détails. (${error.message})`
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <!-- Content -->
  <div class="relative h-screen w-full">
    <div class="py-10 lg:py-14">
      <!-- Title -->
      <div class="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
        <h1 class="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
          Welcome to DeepLearn AI
        </h1>
        <p class="mt-3 text-gray-600 dark:text-gray-400">Your AI-powered deepseek for the web</p>
      </div>
      <!-- End Title -->
    </div>
    <div
      ref="chatContainer"
      class="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto pb-24 overflow-y-auto"
    >
      <div class="space-y-8">
        <!-- Messages Loop -->
        <div v-for="(message, index) in messages" :key="index">
          <!-- User Message -->
          <div v-if="message.role === 'user'" class="flex justify-end gap-x-4">
            <div class="grow text-end space-y-2">
              <div class="inline-block bg-sky-600 dark:bg-sky-500 rounded-2xl p-4 shadow-sm">
                <p class="text-sm text-white">{{ message.content }}</p>
              </div>
            </div>
          </div>
          <!-- End User Message -->

          <!-- AI Message -->
          <div v-if="message.role === 'assistant'" class="flex gap-x-4">
            <!-- AI Avatar -->
            <div class="shrink-0">
              <div
                class="flex size-10 bg-sky-100 dark:bg-sky-900/30 rounded-full items-center justify-center"
              >
                <svg
                  class="size-6 text-sky-600 dark:text-sky-400"
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
              </div>
            </div>

            <div class="grow space-y-2">
              <div
                class="inline-block border border-sky-200 dark:border-sky-400 rounded-2xl p-4"
              >
                <p class="text-sm text-gray-800 dark:text-white">{{ message.content }}</p>
              </div>
            </div>
          </div>
          <!-- End AI Message -->
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex gap-x-4">
          <div class="shrink-0">
            <div
              class="flex size-10 bg-sky-100 dark:bg-sky-900/30 rounded-full items-center justify-center"
            >
              <svg
                class="size-6 text-sky-600 dark:text-sky-400"
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
            </div>
          </div>
          <div class="grow space-y-2">
            <div class="inline-block border border-sky-200 dark:border-sky-400 rounded-2xl p-4 ">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                <div class="w-2 h-2 bg-sky-500 rounded-full animate-pulse delay-75"></div>
                <div class="w-2 h-2 bg-sky-500 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Loading Indicator -->
      </div>
    </div>
    <div
      class="sticky bottom-0 z-10 bg-white border-t border-gray-200 pt-2 pb-3 sm:pt-4 sm:pb-6 dark:bg-gray-900 dark:border-gray-700"
    >
      <!-- Textarea -->
      <div
        class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 border-sky-600 dark:bg-sky-500 border rounded-lg"
      >
        <!-- Input -->
        <form @submit.prevent="sendMessage" class="relative">
          <textarea
            v-model="userInput"
            @keydown.enter.exact.prevent="sendMessage"
            class="p-3 outline-none sm:p-4 pb-12 sm:pb-12 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600"
            placeholder="Ask me anything..."
            :disabled="isLoading"
          ></textarea>

          <!-- Toolbar -->
          <div class="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-gray-900">
            <div class="flex flex-wrap justify-between items-center gap-2">
              <!-- Button Group -->
              <div class="flex items-center"></div>
              <!-- End Button Group -->

              <!-- Button Group -->
              <div class="flex items-center gap-x-1">
                <!-- Send Button -->
                <button
                  type="submit"
                  :disabled="isLoading || !userInput.trim()"
                  class="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-hidden focus:bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  <svg
                    class="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"
                    />
                  </svg>
                </button>
                <!-- End Send Button -->
              </div>
              <!-- End Button Group -->
            </div>
          </div>
          <!-- End Toolbar -->
        </form>
        <!-- End Input -->
      </div>
      <!-- End Textarea -->
    </div>
  </div>
  <!-- End Content -->
</template>
