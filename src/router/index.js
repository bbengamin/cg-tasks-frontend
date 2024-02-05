import { createRouter, createWebHistory } from 'vue-router'
import TaskListView from '@/views/TaskListView.vue'
import TaskFormView from '@/views/TaskFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tasks',
    },
    {
      path: '/tasks',
      name: 'task-list',
      component: TaskListView
    },
    {
      path: '/tasks/create',
      name: 'task-create',
      component: TaskFormView
    },
    {
      path: '/tasks/:taskId',
      name: 'task-edit',
      component: TaskFormView
    }
  ]
})

export default router
