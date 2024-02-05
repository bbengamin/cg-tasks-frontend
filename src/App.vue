<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navigation">
      <RouterLink to="/">All tasks</RouterLink>
      <router-link :to="{ name: 'task-create' }">Create task</router-link>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
