const BASE_URL = 'http://localhost/api/tasks/'

const fetchTask = async (taskId) => {
  const taskRequest = await fetch(BASE_URL + taskId)
  const { data } = await taskRequest.json()
  return data
}

const saveTask = async (task) => {
  const url = task.value.id ? BASE_URL + task.value.id : BASE_URL
  const method = task.value.id ? 'PUT' : 'POST'

  const request = await fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task.value),
    redirect: 'follow'
  })

  return await request.json()
}

const fetchTasks = async (page = 1) => {
  const request = await fetch(BASE_URL + '?page=' + page)
  return await request.json()
}

const deleteTask = async (taskId) => {
  await fetch(BASE_URL + taskId, { method: 'DELETE' })
}

const markCompleteTask = async (task) => {
  const url = BASE_URL + task.id

  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...task, completed: true })
  })
}

export { fetchTask, saveTask, fetchTasks, deleteTask, markCompleteTask }