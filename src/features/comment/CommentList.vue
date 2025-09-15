<script setup>
import{ref} from 'vue'




const comment = ref("");
const tab = ref([]);
const ajouter = () => {
    if(comment.value !== ""){
        tab.value.push(comment.value)
        comment.value = ""
    }
}


</script>


<template>
    <div>
        <input type="textarea" placeholder="envoyer vos commentaire" v-model="comment">
<button @click="ajouter">envoyer</button>
<h3>commentaire</h3>
<div>
    <div v-for="(com,index) in comment" :key="index">
        {{ com }}

    </div>
</div>
    </div>




</template>


<style scoped>


</style>