<template>
  <div>
    <h2>Task List</h2>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="editTaskAction"
        @delete="deleteAction"
        @complete="markCompleteAction"
      />
      <div v-if="pagination.last_page > 1" class="tasks-pagination">
        <button
          @click="changePageAction(pagination.current_page - 1)"
          :disabled="pagination.current_page === 1"
        >
          Previous
        </button>
        <span>{{ pagination.current_page }} / {{ pagination.last_page }}</span>
        <button
          @click="changePageAction(pagination.current_page + 1)"
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
import { fetchTasks, markCompleteTask, deleteTask } from '@/api/tasks.js'
import TaskItem from '@/components/TaskItem.vue'

const router = useRouter()
const route = useRoute()
const tasks = ref([])
const pagination = ref({})
const loading = ref(true)

const editTaskAction = (taskId) => {
  router.push({ name: 'task-edit', params: { taskId: taskId } })
}

const deleteAction = async (taskId) => {
  loading.value = true
  await deleteTask(taskId)
  await loadPage(route.query.page)
}

const markCompleteAction = async (task) => {
  loading.value = true
  await markCompleteTask(task)
  await loadPage(route.query.page)
}

const changePageAction = async (page) => {
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

