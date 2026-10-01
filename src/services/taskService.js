const STORAGE_KEY = 'react-mastery-tasks'

export async function getTasks() {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

  return tasks
}

export async function createTask(task) {
  const tasks = await getTasks()

  const newTask = {
    id: crypto.randomUUID(),
    ...task,
    createdAt: new Date().toISOString(),
  }

  const updatedTasks = [...tasks, newTask]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))

  return newTask
}

export async function deleteTask(id) {
  const tasks = await getTasks()

  const updatedTasks = tasks.filter((task) => task.id !== id)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))

  return true
}

export async function getTaskById(id) {
  const tasks = await getTasks()

  return tasks.find((task) => task.id === id)
}

export async function updateTask(id, updatedData) {
  const tasks = await getTasks()

  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, ...updatedData }
      : task
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))

  return updatedTasks.find((task) => task.id === id)
}