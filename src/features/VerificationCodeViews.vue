<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userCode = ref('')
const expectedCode = ref('') // Tu vas passer ce code via props ou via un store

// Par exemple on récupère expectedCode via route params, props ou composable (simplification ici)
const route = useRoute()
expectedCode.value = route.query.code || ''

function verifyCode() {
  if (userCode.value === expectedCode.value) {
    alert('Code validé avec succès !')
    router.push('/welcome') // Ou autre page après validation
  } else {
    alert('Code invalide, veuillez réessayer.')
  }
}
</script>

<template>
  <div class="verification-code-container">
    <h2>Entrez votre code de vérification</h2>
    <input v-model="userCode" placeholder="Code de vérification" />
    <button @click="verifyCode">Valider</button>
  </div>
</template>