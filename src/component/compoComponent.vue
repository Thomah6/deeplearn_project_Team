<script setup>
import { ref, onMounted, computed } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
const image = '/user.png'

// --- Props ---
const props = defineProps({
  courseId: {
    type: Number,
    required: true,
  },
})

// --- State ---
const allComments = ref([])
const currentUser = ref(null)
const editingCommentId = ref(null)
const editingText = ref('')

// --- Tiptap Editor ---
const editor = useEditor({
  content: '',
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'prose prose-sm max-w-none dark:prose-invert focus:outline-none px-0 w-full text-sm text-gray-900 border-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800',
    },
  },
})

// --- Computed ---
// Filter comments for the current course
const courseComments = computed(() => {
  return allComments.value.filter((comment) => comment.courseId === props.courseId)
})

// --- Lifecycle Hooks ---
onMounted(() => {
  // Load all comments from localStorage
  const storedComments = localStorage.getItem('comments')
  if (storedComments) {
    allComments.value = JSON.parse(storedComments)
  }

  // Get current user
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser)
  }
})

// --- Methods ---
const saveCommentsToLocalStorage = () => {
  localStorage.setItem('comments', JSON.stringify(allComments.value))
}

const addComment = () => {
  if (!editor.value || !editor.value.getText().trim() || !currentUser.value) return

  const newComment = {
    courseId: props.courseId,
    id: Date.now(),
    userId: currentUser.value.id,
    userName: currentUser.value.name,
    userAvatar:
      currentUser.value.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.value.name)}&background=random`,
    // On sauvegarde le contenu en HTML généré par Tiptap
    text: editor.value.getHTML(),
    timestamp: new Date().toISOString(),


    replies: [], // tableau des réponses

    // Reactions initialisées
    likes: 0,
    dislikes: 0,
    reactions: {
      love: 0,
      laugh: 0,
      wow: 0,
    }

  

  }

  allComments.value.unshift(newComment)
  saveCommentsToLocalStorage()
  editor.value.commands.clearContent()
}

const replyingToCommentId = ref(null) // ID du commentaire auquel on répond
const replyEditor = useEditor({
  content: '',
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'prose prose-sm max-w-none dark:prose-invert focus:outline-none px-0 w-full text-sm text-gray-900 border-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800',
    },
  },
})

const addReply = (comment) => {
  // Vérifier que l'éditeur existe, que le texte n'est pas vide, et que l'utilisateur est connecté
  if (!replyEditor.value || !replyEditor.value.getText().trim() || !currentUser.value) return;

  // Initialiser le tableau replies si besoin
  if (!comment.replies) comment.replies = [];

  // Créer la nouvelle réponse avec le contenu HTML de l'éditeur
  const newReply = {
    id: Date.now(),
    userId: currentUser.value.id,
    userName: currentUser.value.name,
    userAvatar:
      currentUser.value.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.value.name)}&background=random`,
    text: replyEditor.value.getHTML(),
    timestamp: new Date().toISOString(),
    likes: 0,
    dislikes: 0,
    reactions: {
      love: 0,
      laugh: 0,
      wow: 0,
    },
    replies: [], // Pas de réponses imbriquées pour l'instant
  };

  // Ajouter la réponse en début de tableau
  comment.replies.unshift(newReply);

  // Sauvegarder dans localStorage
  saveCommentsToLocalStorage();

  // Vider le contenu de l'éditeur
  replyEditor.value.commands.clearContent();

  // Cacher le formulaire de réponse
  replyFormVisible.value = null;

  // Facultatif : réinitialiser la variable qui stocke l'id du commentaire en train de recevoir une réponse
  replyingToCommentId.value = null;
};


const replyText = ref('')

const replyFormVisible = ref(null);

function toggleReplyForm(commentId) {
  if (replyFormVisible.value === commentId) {
    replyFormVisible.value = null;
    // Vide aussi le contenu de l'éditeur quand on annule
    if (replyEditor.value) {
      replyEditor.value.commands.clearContent();
    }
  } else {
    replyFormVisible.value = commentId;
    // Quand on ouvre un formulaire, on vide le contenu
    if (replyEditor.value) {
      replyEditor.value.commands.clearContent();
    }
  }
}



const deleteComment = (commentId) => {
  allComments.value = allComments.value.filter((c) => c.id !== commentId)
  saveCommentsToLocalStorage()
}

const startEditing = (comment) => {
  editingCommentId.value = comment.id
  editingText.value = comment.text
}

const saveEdit = () => {
  if (!editingCommentId.value) return
  const comment = allComments.value.find((c) => c.id === editingCommentId.value)
  if (comment) {
    comment.text = editingText.value
    saveCommentsToLocalStorage()
  }
  cancelEditing()
}

const cancelEditing = () => {
  editingCommentId.value = null
  editingText.value = ''
}

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// --- Réactions ---

const like = (comment) => {
  comment.likes++
  saveCommentsToLocalStorage()
}

const dislike = (comment) => {
  comment.dislikes++
  saveCommentsToLocalStorage()
}

const react = (comment, type) => {
  if (comment.reactions[type] !== undefined) {
    comment.reactions[type]++
    saveCommentsToLocalStorage()
  }
}





</script>

<template>
  <div class="antialiased mx-auto p-4 dark:text-white">
    <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Commentaires</h3>

    <!-- Comment Form -->
    <form @submit.prevent="addComment" class="mb-6">
      <!-- Tiptap Toolbar -->
      <div v-if="editor"
        class="flex items-center justify-between px-3 py-2 border-t border-x border-gray-200 dark:border-gray-600 rounded-t-lg">
        <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
          <div class="flex items-center space-x-1 sm:pr-4">
            <button @click="editor.chain().focus().toggleBold().run()" type="button"
              class="p-2 text-gray-500 rounded cursor-pointer"
              :class="{ 'bg-gray-200 dark:bg-gray-700': editor.isActive('bold') }"><strong>B</strong></button>
            <button @click="editor.chain().focus().toggleItalic().run()" type="button"
              class="p-2 text-gray-500 rounded cursor-pointer"
              :class="{ 'bg-gray-200 dark:bg-gray-700': editor.isActive('italic') }"><em>I</em></button>
            <button @click="editor.chain().focus().toggleCode().run()" type="button"
              class="p-2 text-gray-500 rounded cursor-pointer"
              :class="{ 'bg-gray-200 dark:bg-gray-700': editor.isActive('code') }"><code>&lt;/&gt;</code></button>
            <button @click="editor.chain().focus().toggleBlockquote().run()" type="button"
              class="p-2 text-gray-500 rounded cursor-pointer"
              :class="{ 'bg-gray-200 dark:bg-gray-700': editor.isActive('blockquote') }">“ ”</button>
          </div>
        </div>
      </div>

      <div class="py-2 px-4 bg-white rounded-b-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label for="comment" class="sr-only">Votre commentaire</label>
        <EditorContent :editor="editor" class="min-h-[80px]" />
      </div>
      <button type="submit"
        class="inline-flex mt-8 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-sky-600 rounded-lg focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900 hover:bg-sky-700">
        Poster le commentaire
      </button>
    </form>

    <!-- Comments List -->
    <div v-if="courseComments.length > 0" class="space-y-6">
      <article v-for="comment in courseComments" :key="comment.id"
        class="p-6 text-base border border-gray-200 dark:border-sky-200 rounded-lg bg-gray-100  dark:bg-gray-900">
        <footer class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              <img class="mr-2 w-8 h-8 rounded-full" :src="image" :alt="comment.userName" />
              {{ comment.userName }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <time :datetime="comment.timestamp" :title="new Date(comment.timestamp).toUTCString()">{{
                formatTimestamp(comment.timestamp)
              }}</time>
            </p>
          </div>
        </footer>
        <div v-if="editingCommentId === comment.id">
          <textarea v-model="editingText" rows="3"
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 mb-2"></textarea>
          <button @click="saveEdit" class="text-xs text-white bg-sky-600 hover:bg-sky-700 rounded-md px-2 py-1 mr-2">
            Sauvegarder
          </button>
          <button @click="cancelEditing" class="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400">
            Annuler
          </button>
        </div>
        <div v-else>
          <div class="prose prose-sm max-w-none text-gray-500 dark:text-gray-400 dark:prose-invert"
            v-html="comment.text"></div>
          <div v-if="currentUser && currentUser.id === comment.userId" class="flex items-center mt-4 space-x-4">
            <button @click="startEditing(comment)"
              class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
              Modifier
            </button>
            <button @click="deleteComment(comment.id)"
              class="flex items-center text-sm text-red-500 hover:underline dark:text-red-400 font-medium">
              Supprimer
            </button>
          </div>

          <!-- Bouton Répondre visible si utilisateur connecté -->
          <button v-if="currentUser" @click="toggleReplyForm(comment.id)"
            class="text-sm text-blue-600 hover:underline font-medium">
            {{ replyFormVisible === comment.id ? 'Annuler' : 'Répondre' }}
          </button>
        </div>

        <!-- Formulaire de réponse -->
        <div v-if="replyFormVisible === comment.id" class="mt-4">
          <EditorContent :editor="replyEditor" class="w-full h-24 px-3 py-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" />

          <button @click="addReply(comment)"
            class="mt-2 inline-block bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700 text-sm">
            Envoyer la réponse
          </button>
        </div>


        <!-- Liste des réponses -->
        <div v-if="comment.replies && comment.replies.length > 0"
          class="mt-4 ml-6 border-l-2 border-gray-300 dark:border-gray-700 pl-4 space-y-4">
          <article v-for="reply in comment.replies" :key="reply.id" class="bg-gray-50 dark:bg-gray-800 p-3 rounded">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ reply.userName }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400" v-html="reply.text"></p>
            <p class="text-xs text-gray-400 dark:text-gray-500">{{ formatTimestamp(reply.timestamp) }}</p>
          </article>
        </div>



        <!-- Reactions Section -->
        <div class="flex items-center space-x-6 mt-4 text-gray-600 dark:text-gray-400">
          <button @click="like(comment)" class="flex items-center space-x-1 hover:text-green-600" title="J'aime">
            <span>👍</span>
            <span>{{ comment.likes }}</span>
          </button>

          <button @click="dislike(comment)" class="flex items-center space-x-1 hover:text-red-600"
            title="Je n'aime pas">
            <span>👎</span>
            <span>{{ comment.dislikes }}</span>
          </button>

          <button @click="react(comment, 'love')" class="flex items-center space-x-1 hover:text-pink-600" title="Love">
            <span>❤️</span>
            <span>{{ comment.reactions.love }}</span>
          </button>

          <button @click="react(comment, 'laugh')" class="flex items-center space-x-1 hover:text-yellow-600"
            title="Haha">
            <span>😂</span>
            <span>{{ comment.reactions.laugh }}</span>
          </button>

          <button @click="react(comment, 'wow')" class="flex items-center space-x-1 hover:text-blue-600" title="Wow">
            <span>😮</span>
            <span>{{ comment.reactions.wow }}</span>
          </button>
        </div>

      </article>
    </div>
    <div v-else class="text-center text-gray-500 dark:text-gray-400 py-6">
      Soyez le premier à commenter !
    </div>
  </div>
</template>




