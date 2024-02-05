<template>
  <div>
    <h2>Edit Task</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <form @submit.prevent="save">
        <label for="title">Title:</label>
        <input v-model="task.title" required />
        <label for="description">Description:</label>
        <textarea v-model="task.description" required></textarea>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const task = ref({})

async function fetchTask(taskId) {
  const taskRequest = await fetch('http://localhost/api/tasks/' + taskId)
  const { data } = await taskRequest.json()
  return data
}

const save = async () => {
  loading.value = true
  const url = task.value.id ? 'http://localhost/api/tasks/' + task.value.id : 'http://localhost/api/tasks'
  const method = task.value.id ? 'PUT' : 'POST'
  const request = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task.value)
  })

  const response = await request.json()

  if (task.value.id) {
    await router.push({ name: 'task-list' })
  } else {
    await router.push({ name: 'task-edit', params: { taskId: response.data.id } })
  }
}

watch(
  () => route.params.taskId,
  async taskId => {
    loading.value = true
    if (taskId) {
      task.value = await fetchTask(taskId)
    } else {
      task.value = { title: '', description: '' }
    }
    loading.value = false
  },
  { immediate: true }
)
</script>

