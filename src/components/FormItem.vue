<template>
  <slot name="item" />
  <template v-if="errors.length > 0">
    <span
      v-for="error in errors"
      :key="error"
      class="error"
    >
      {{ error }}
    </span>
  </template>
</template>

<script setup>
defineProps({
  errors: {
    type: Array,
    default: () => []
  }
})
</script>

