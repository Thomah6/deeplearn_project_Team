<script setup>
import { ref } from 'vue'
// import { useRouter } from "vue-router";
// import user from "@/user.json";
// console.log(user.users);

// const name = ref('');
// const password = ref('');
// const surname = ref('');
// const email = ref('');
// let id = 1;


// const router = useRouter()
// const inscription = ref(true)

// function login() {
//     console.log(name.value);

//     const foundUser = user.users.find(
//         el => el.name === name.value && el.password === password.value
//     );

//     if (foundUser) {
//         localStorage.setItem('token', true);
//         router.push('/PanierUser');
//     } else {
//         alert('error')
//         console.log("Erreur de connexion");
//         name.value = '';
//         password.value = '';
//     }
// }

// function register() {
//     const newUser = {
//         id: id++,
//         name: name.value,
//         surname: surname.value,
//         email: email.value,
//         password: password.value,
//         sex: "male" || "female"
//     };

//     user.users.push(newUser);

//     console.log(user.users);

//     name.value = '';
//     surname.value = '';
//     email.value = '';
//     password.value = '';

//     localStorage.setItem('token', true);
//     router.push({ name: 'PanierUser' });
// }

const isActive = ref(false)

function handleRegister() {
    isActive.value = true
}

function handleLogin() {
    isActive.value = false
}

</script>


<template>
    <div class="body">
        <div class="container" :class="{ active: isActive }">
            <div class="form-container sign-up">
                <form @submit.prevent="login">
                    <h1>Create Account</h1>
                    <div class="social-icons">
                        <a href="" class="icon"><i class="fa-brands fa-google"></i></a>
                        <a href="" class="icon"><i class="fa-brands fa-github"></i></a>
                        <a href="" class="icon"><i class="fa-brands fa-linkedin"></i></a>
                        <a href="" class="icon"><i class="fa-brands fa-facebook"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" required v-model="name" />
                    <input type="email" placeholder="Email" required v-model="email" />
                    <input type="password" placeholder="Password" required v-model="password" />
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div class="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <div class="social-icons">
                        <a href="" class="icon"><i class="fa-brands fa-google-plus-g"></i></a>
                        <a href="" class="icon"><i class="fa-brands fa-github"></i></a>
                        <a href="" class="icon"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="" class="icon"><i class="fa-brands fa-facebook-f"></i></a>
                    </div>
                    <span>or use your email password</span>
                    <input type="text" placeholder="Name" required v-model="name" />
                    <input type="email" placeholder="Email" required v-model="email" />
                    <input type="password" placeholder="Password" required v-model="password" />
                    <a href="#">Forget your password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>

            <div class="toggle-container">
                <div class="toggle">
                    <div class="toggle-panel toggle-left">
                        <h1>Welcome Back</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button  @click="handleLogin">Sign In</button>
                    </div>
                    <div class="toggle-panel toggle-right">
                        <h1>Hello, Friend</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button  @click="handleRegister">Sign Up</button>
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

.body {
    background-color: #c9d6ff;
    background: linear-gradient(to right, #e2e2ee, #c9d6ff);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90vh;
    margin-top: -45px;
}

.container {
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
    width: 930px;
    /* +30px */
    max-width: 100%;
    min-height: 530px;
    /* +30px */
}

.container p {
    font-size: 16px;
    /* légèrement plus grand */
    line-height: 22px;
    letter-spacing: 0.3px;
    margin: 20px 0;
}

.container span {
    font-size: 14px;
}

.container a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0 10px;
}

.container button {
    background-color: #512da8;
    color: #fff;
    font-size: 14px;
    padding: 12px 50px;
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
    font-size: 14px;
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
    background-color: #512da8;
    height: 100%;
    background: linear-gradient(to right, #5c6bc0, #512da8);
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