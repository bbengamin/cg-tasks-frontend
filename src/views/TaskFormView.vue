<template>
  <div>
    <h2>Edit Task</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <form class="task-form" @submit.prevent="save">

        <FormItem :errors="validation.title">
          <template #item>
            <label for="title">Title:</label>
            <input v-model="task.title" />
          </template>
        </FormItem>

        <FormItem :errors="validation.description">
          <template #item>
            <label for="description">Description:</label>
            <textarea v-model="task.description" rows="4"></textarea>
          </template>
        </FormItem>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchTask, saveTask } from '@/api/tasks.js'
import FormItem from '@/components/FormItem.vue'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const task = ref({})
const validation = ref({})

const save = async () => {
  loading.value = true

  const { errors, data } = await saveTask(task)

  if (errors) {
    validation.value = errors
    loading.value = false
  } else {
    if (task.value.id) {
      await router.push({ name: 'task-list' })
    } else {
      await router.push({ name: 'task-edit', params: { taskId: data.id } })
    }
  }
}

watch(
  () => route.params.taskId,
  async taskId => {
    loading.value = true
    if (taskId) {
      task.value = await fetchTask(taskId)
    } else {
      task.value = { title: '', description: '', completed: 0 }
    }
    loading.value = false
  },
  { immediate: true }
)
</script>

