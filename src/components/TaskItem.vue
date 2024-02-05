<template>
  <div class="task" :key="task.id">
    <div class="task-title">{{ task.title }}</div>
    <div>{{ task.description }}</div>

    <div class="task-actions">
      <div v-if="task.completed">Completed</div>
      <button v-else @click="$emit('complete', task)">Mark Complete</button>

      <div class="task-actions-buttons">
        <button @click="$emit('edit', task.id)">Edit</button>
        <button @click="$emit('delete', task.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
  }
})

defineEmits(['edit', 'delete', 'complete'])
</script>

