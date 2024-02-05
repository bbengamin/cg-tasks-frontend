<template>
  <div>
    <h2>Task List</h2>
    <router-link :to="{ name: 'task-create' }">Create task</router-link>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="task in tasks" :key="task.id">
        <div>{{ task.title }}</div>
        <div>{{ task.description }}</div>

        <div v-if="task.completed">Completed</div>
        <button v-else @click="markComplete(task)">Mark Complete</button>

        <button @click="deleteTask(task.id)">Delete</button>
        <button @click="editTask(task.id)">Edit</button>
      </div>
      <div v-if="pagination.last_page > 1">
        <button
          @click="changePage(pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
        >
          Previous
        </button>
        <span>{{ pagination.current_page }} / {{ pagination.last_page }}</span>
        <button
          @click="changePage(pagination.current_page + 1)"
          :disabled="pagination.current_page === pagination.last_page"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const tasks = ref([])
const pagination = ref({})
const loading = ref(true)

async function fetchTasks(page = 1) {
  const request = await fetch('http://localhost/api/tasks?page=' + page)
  return await request.json()
}

const editTask = (taskId) => {
  router.push({ name: 'task-edit', params: { taskId: taskId } })
}

const deleteTask = async (taskId) => {
  loading.value = true
  const url = 'http://localhost/api/tasks/' + taskId
  await fetch(url, { method: 'DELETE' })
  await loadPage(route.query.page)
}

const markComplete = async (task) => {
  loading.value = true

  const url = 'http://localhost/api/tasks/' + task.id

  Intl.DateTimeFormat('en-US', {

  }).format()

  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...task, completed: true })
  })
  await loadPage(route.query.page)
}

const changePage = async (page) => {
  await router.push({ name: 'task-list', query: { page: page } })
}

async function loadPage(page) {
  loading.value = true
  const { data, meta } = await fetchTasks(page)
  tasks.value = data
  pagination.value = meta
  loading.value = false
}

watch(
  () => route.query.page,
  async page => {
    await loadPage(page)
  },
  { immediate: true }
)

onMounted(() => {
  fetchTasks()
})
</script>

