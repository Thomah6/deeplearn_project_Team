<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// ... (le reste de votre code)

function Update(courseId) {
    id = courseId;
    router.push('/admin')
}

function addCourse(courseId) {
    id = courseId;
    router.push('/admin')
}
</script>