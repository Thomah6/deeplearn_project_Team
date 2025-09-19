<script setup>
import { ref, onMounted, computed } from 'vue'
import DashboardStats from '@/features/Admin/DashboardStats.vue'
import CoursesTable from '@/features/Admin/CoursesTable.vue'
import UsersTable from '@/features/Admin/UsersTable.vue'
import CourseForm from '@/features/Admin/CourseForm.vue'
import LessonForm from '@/features/Admin/LessonForm.vue'
import Notification from '@/features/Admin/Notification.vue'

const props = defineProps({
  courses: Array,
  usersData: Array,
})

// --- State Management ---
const currentView = ref('courses') // 'courses', 'users', 'editCourse', 'addLesson'

// Data arrays
const courseArray = ref([])
const userArray = ref([])

// Computed counts
const coursesCount = computed(() => courseArray.value.length)
const usersCount = computed(() => userArray.value.length)

// State for forms
const courseToEdit = ref(null) // For creating or editing a course
const courseToEditForLessons = ref(null)

// Notification state
const notification = ref({ message: '', type: 'success', visible: false })

onMounted(() => {
  // Load from localStorage or use props as fallback
  const storedCourses = localStorage.getItem('courses')
  if (storedCourses) {
    courseArray.value = JSON.parse(storedCourses)
  } else {
    courseArray.value = JSON.parse(JSON.stringify(props.courses || []))
    localStorage.setItem('courses', JSON.stringify(courseArray.value))
  }

  const storedUsers = localStorage.getItem('users')
  if (storedUsers) {
    userArray.value = JSON.parse(storedUsers)
  } else {
    userArray.value = JSON.parse(JSON.stringify(props.usersData || []))
    localStorage.setItem('users', JSON.stringify(userArray.value))
  }
})

// --- View Navigation Handlers ---
function showCoursesView() {
  currentView.value = 'courses'
  courseToEdit.value = null
  courseToEditForLessons.value = null
}

function showUsersView() {
  currentView.value = 'users'
}

function showAddCourseForm() {
  courseToEdit.value = null // Ensure we are in "create" mode
  currentView.value = 'editCourse'
}

function showEditCourseForm(course) {
  courseToEdit.value = course
  currentView.value = 'editCourse'
}

function showLessonForm(course) {
  courseToEditForLessons.value = course
  currentView.value = 'addLesson'
}

// --- Data Persistence ---
function saveDataToLocalStorage() {
  localStorage.setItem('courses', JSON.stringify(courseArray.value))
  localStorage.setItem('users', JSON.stringify(userArray.value))
}

function showNotification(message, type = 'success') {
  notification.value = { message, type, visible: true }
  setTimeout(() => {
    notification.value.visible = false
  }, 3000)
}

// --- CRUD Handlers ---

// Courses
function handleSaveCourse(courseData) {
  if (courseData.id) {
    // Update existing course
    const index = courseArray.value.findIndex((c) => c.id === courseData.id)
    if (index !== -1) {
      courseArray.value[index] = { ...courseArray.value[index], ...courseData }
      saveDataToLocalStorage()
      showNotification(`Le cours "${courseData.title}" a été mis à jour.`)
    }
  } else {
    // Add new course
    const newCourse = {
      ...courseData,
      id: Date.now(), // Simulate a new ID
      lessons: [],
      lessons_count: 0,
    }
    courseArray.value.unshift(newCourse)
    saveDataToLocalStorage()
    showNotification(`Le cours "${newCourse.title}" a été ajouté.`)
  }
  showCoursesView()
}

function handleDeleteCourse(courseId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
    courseArray.value = courseArray.value.filter((course) => course.id !== courseId)
    saveDataToLocalStorage()
    showNotification('Cours supprimé avec succès.', 'success')
  }
}

// Lessons
function handleSaveLesson(lessonData) {
  if (!courseToEditForLessons.value) return

  const lessonToAdd = {
    ...lessonData,
    id: (courseToEditForLessons.value.lessons.length || 0) + 1,
    done: 'false',
  }

  const course = courseArray.value.find(c => c.id === courseToEditForLessons.value.id);
  if (course) {
    course.lessons.push(lessonToAdd)
    course.lessons_count = course.lessons.length
    saveDataToLocalStorage()
    showNotification(`Leçon "${lessonToAdd.title}" ajoutée.`)
  }

  showCoursesView()
}

// Users
function userSupButton(userId) {
  if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
    userArray.value = userArray.value.filter((user) => user.id !== userId)
    saveDataToLocalStorage()
    showNotification('Utilisateur supprimé.', 'success')
  }
}

function toggleAdminStatus(user) {
  user.isAdmin = !user.isAdmin
  saveDataToLocalStorage()
  showNotification(`Le statut de ${user.name} a été mis à jour.`)
}
</script>

<template>
  <div class="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
    <h1 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Tableau de bord Admin</h1>

    <!-- Notification Area -->
    <Notification v-if="notification.visible" :message="notification.message" :type="notification.type" />

    <!-- Stats Cards -->
    <DashboardStats :courses-count="coursesCount" :users-count="usersCount" @manage-courses="showCoursesView" @add-course="showAddCourseForm" @manage-users="showUsersView" />

    <div class="mt-8">
      <!-- Courses Table -->
      <CoursesTable v-if="currentView === 'courses'" :courses="courseArray" @add-lesson="showLessonForm" @edit-course="showEditCourseForm" @delete-course="handleDeleteCourse" />

      <!-- Users Table (Placeholder) -->
      <UsersTable v-if="currentView === 'users'" :users="userArray" @delete-user="userSupButton" @toggle-admin="toggleAdminStatus" />

      <!-- Course Add/Edit Form -->
      <CourseForm v-if="currentView === 'editCourse'" :initial-data="courseToEdit" @save-course="handleSaveCourse" @cancel="showCoursesView" />

      <!-- Lesson Add Form -->
      <LessonForm v-if="currentView === 'addLesson' && courseToEditForLessons" :course="courseToEditForLessons" @save-lesson="handleSaveLesson" @cancel="showCoursesView" />
    </div>
  </div>
</template>
<style scoped> </style>
