<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import emailjs from '@emailjs/browser'

const router = useRouter()

// Champs pour l'inscription
const registrationName = ref('')
const registrationEmail = ref('')
const registrationPassword = ref('')
// Champs pour la connexion
const loginEmail = ref('')
const loginPassword = ref('')

const props = defineProps({
  usersData: Array,
})
const users = ref([])
onMounted(() => {
  // Initialise EmailJS avec ta clé publique
  emailjs.init('2V_Zjk6uljc9CuaIx')
  console.log('EmailJS initialized')
  users.value = props.usersData
  console.log(users.value)
})

function generateCode(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

async function Register() {
  const verificationCode = generateCode()

  const NewUser = ref({
    id: users.value.length + 1,
    name: registrationName.value,
    email: registrationEmail.value,
    password: registrationPassword.value,
    completedCourses: [],
  })

  // Préparer les paramètres pour EmailJS
  const templateParams = {
    to_name: registrationName.value,
    to_email: registrationEmail.value,
    verification_code: verificationCode,
  }

  try {
    // Envoi du mail via EmailJS (à configurer avec tes infos EmailJS)
    await emailjs.send('service_4w6lah4', 'template_4ogofrt', {
      passcode: verificationCode,
      time: 5,
      email: registrationEmail.value,
    })
    alert('Email envoyé ! Vérifie ta boîte mail.')

    // Puis redirection vers la page de vérification
    router.push({
      name: 'Verification',
      query: { code: verificationCode, newUser: JSON.stringify(NewUser.value) },
    })
  } catch (error) {
    alert("Erreur lors de l'envoi du mail : " + error.text)
  }
}

function Login() {
  const user = users.value.find(
    (u) => u.email === loginEmail.value && u.password === loginPassword.value,
  )

  if (user) {
    // Utilisateur trouvé, on crée la session
    localStorage.setItem('token', 'true')
    localStorage.setItem('user', JSON.stringify(user))
    if (user.email === 'admin@gmail.com') {
      localStorage.setItem('status', 'admin')
      router.push('/admin') // Redirection vers la page admin
    } else {
      localStorage.setItem('status', 'user')
      router.push('/') // Redirection vers la page d'accueil
    }
  } else {
    // Utilisateur non trouvé
    alert('Email ou mot de passe incorrect.')
  }
}

const isActive = ref(false)

function handleRegister() {
  isActive.value = true
}

function handleLogin() {
  isActive.value = false
}
</script>

<template>
  <div class="body bg-gray-50 dark:bg-gray-900">
    <router-link to="/">
      <h1
        class="flex-none rounded-md cursor-pointer text-7xl mt-24 text-black dark:text-white inline-block font-semibold focus:outline-hidden focus:opacity-80"
        aria-label="Preline"
        style="font-family: 'Caveat', cursive"
      >
        DeepLearn.io
      </h1>
    </router-link>
    <div class="container mt-16" :class="{ active: isActive }">
      <div class="form-container sign-up">
        <form @submit.prevent="Login">
          <h1>Connection</h1>

          <input type="email" placeholder="Email" required v-model="loginEmail" />
          <input type="password" placeholder="Password" required v-model="loginPassword" />
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div class="form-container sign-in">
        <form @submit.prevent="Register">
          <h1>Insciption</h1>

          <input type="text" placeholder="Name" required v-model="registrationName" />
          <input type="email" placeholder="Email" required v-model="registrationEmail" />
          <input type="password" placeholder="Password" required v-model="registrationPassword" />
          <a href="#">Forget your password?</a>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1>Welcome Back</h1>
            <p>Enter your personal details to use all of site features</p>
            <button @click="handleLogin">Sign Up</button>
          </div>
          <div class="toggle-panel toggle-right">
            <h1>Hello, Friend</h1>
            <p>Register with your personal details to use all of site features</p>
            <button @click="handleRegister">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

h1 {
  font-size: 1.7rem;
}

.body {
  /* background-color: #c9d6ff; */
  /* background: linear-gradient(to right, #e2e2ee, #c9d6ff); */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 95vh;
  margin-top: -45px;
  width: 100%;
  /* border: 1px solid red; */
}

.container {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  width: 1100px;
  /* +30px */
  max-width: 100%;
  min-height: 630px;
  margin-top: 50px;
  /* +30px */
}

.container p {
  font-size: 18px;
  /* légèrement plus grand */
  line-height: 22px;
  letter-spacing: 0.3px;
  margin: 20px 0;
}

.container span {
  font-size: 18px;
}

.container a {
  color: #333;
  font-size: 15px;
  text-decoration: none;
  margin: 15px 0 10px;
}

.container button {
  background-color: #222125;
  color: #fff;
  font-size: 16px;
  padding: 13px 50px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

.container button.hidden {
  background-color: transparent;
  border-color: #fff;
}

.container form {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
}

.container input {
  background-color: #eee;
  border: none;
  margin: 10px 0;
  padding: 12px 18px;
  font-size: 16px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.active .sign-in {
  transform: translateX(100%);
}

.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: move 0.6s;
}

@keyframes move {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.social-icons {
  margin: 20px 0;
}

.social-icons a {
  border: 1px solid #ccc;
  border-radius: 20%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  width: 45px;
  height: 45px;
  font-size: 18px;
}

.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 150px;
  z-index: 1000;
}

.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 150px 150px 0;
}

.toggle {
  background-color: skyblue;
  height: 100%;
  background: linear-gradient(to right, skyblue, #132642);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.container.active .toggle {
  transform: translateX(50%);
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}

.toggle-left {
  transform: translateX(-200%);
}

.container.active .toggle-left {
  transform: translateX(0);
}

.toggle-right {
  right: 0;
  transform: translateX(0);
}

.container.active .toggle-right {
  transform: translateX(200%);
}
</style>
