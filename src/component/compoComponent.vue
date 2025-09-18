<script setup>
import { ref } from "vue";


const comment = ref([]);


const com = ref("");
localStorage.setItem("com", JSON.stringify(com))

// // Plus tard... Tu veux les relire
// const donnees = localStorage.getItem('com');
// const utilisateursRecup = JSON.parse(donnees);


let i = 1;


const ajouter = (e) => {
  if (com.value === "") return;
  e.preventDefault();

  const ob = {
    courseId: 101,
    commentId: comment.value.length + 1,
    userId: i++,
    text: com.value,
  };

  comment.value.unshift(ob);
  com.value = "";
};

const btn11 = (id) => {
  comment.value = comment.value.filter((el) => el.commentId !== id);
};


const editingId = ref(null);
const editingText = ref("");

const modifierCommentaire = (id, text) => {
  editingId.value = id;
  editingText.value = text;
};


const sauvegarderCommentaire = () => {
  const c = comment.value.find((c) => c.commentId === editingId.value);
  if (c) {
    c.text = editingText.value;
  }
  editingId.value = null;
  editingText.value = "";
};
</script>

<template>
  <div class="">
    <h3 class="bg-gray-500 text-white  mb-5 p-5">Commentaires</h3>


    <form @submit="ajouter">
      <div class="container">


        <input type="textarea" placeholder="Écris ton commentaire..." v-model="com" class=" outline-none border-none p-7 bg-gray-200  hover:bg-gray-400 hover:text-white input" />
        <button class="btn3">
          <div class="absolute bottom-5 left-75">

            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000">
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
          </div>
        </button>

      </div>
    </form>


    <div class="pdiv">
      <div class="oui" v-for="c in comment" :key="c.commentId">

        <div v-if="editingId === c.commentId">
          <input class="inputest" v-model="editingText" placeholder="modifier" />
          <button @click="sauvegarderCommentaire"> Sauvegarder</button>
        </div>

        <div v-else class="flex justify-between">
          <p class="max-w-50">{{ c.text }}</p>
          <div  >
            <button @click="modifierCommentaire(c.commentId, c.text)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="20px" height="20px">
                <path
                  d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z" />
              </svg>
            </button>
            <button class="btn1" @click="btn11(c.commentId)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22px" height="22px">
                <path
                  d="M 13.59375 4 L 13.28125 4.28125 L 12.5625 5 L 6 5 L 6 7 L 7 7 L 7 25 C 7 26.644531 8.355469 28 10 28 L 22 28 C 23.644531 28 25 26.644531 25 25 L 25 7 L 26 7 L 26 5 L 19.4375 5 L 18.71875 4.28125 L 18.40625 4 Z M 14.4375 6 L 17.5625 6 L 18.28125 6.71875 L 18.59375 7 L 23 7 L 23 25 C 23 25.554688 22.554688 26 22 26 L 10 26 C 9.445313 26 9 25.554688 9 25 L 9 7 L 13.40625 7 L 13.71875 6.71875 Z M 11 11 L 11 22 L 13 22 L 13 11 Z M 15 11 L 15 22 L 17 22 L 17 11 Z M 19 11 L 19 22 L 21 22 L 21 11 Z" />
              </svg></button>
          </div>

        </div>
      </div>
    </div>
  </div>




</template>
<style scoped>
.oui {


  width: 400px;
  height: fit-content;
  transform: scale(1.1);


  margin: 50px;
  box-shadow: 10px;
  color: black;
  border-bottom: 1px solid gray;




}

.pdiv {
  position: relative;
  top: 10px;
  left: 10px;

}

.btn1 {

  border-radius: 100%;
  cursor: pointer;

}

.btn2 {

  border-radius: 100%;
  cursor: pointer;
}

h3 {
  border-radius: 5px;

  width: 300px;
  font-size: 30px;
  text-align: center;
  border-radius: 10px;
  position: relative;
  left: 30px;


}



/* .input:hover {
  border: none;
  background-color: rgb(218, 209, 231);
} */

.btn3 {
  /* border: 1px solid;
  border-radius: 5px; */
  /* background-color:rgb(206, 195, 231); */
  /* color: white;
  height: 35px;
  width: 100px; */




}

.inputest {
  width: fit-content;
  height: fit-content;
  background-color: rgb(221, 213, 235);
  color: black;
  border-radius: 10px;
}

.input {
  height: 50px;

  width: 300px;
  border-radius: 10px;
  position: relative;
  left: 20px;
  margin: 10px;

}

.container {
  position: relative;
}

.enfant {
  position: absolute;

}
</style>