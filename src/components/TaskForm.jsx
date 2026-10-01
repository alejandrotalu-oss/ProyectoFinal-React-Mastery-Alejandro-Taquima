import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createTask,
  getTaskById,
  updateTask,
} from '../services/taskService'

function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pendiente')

  const navigate = useNavigate()
  const { id } = useParams()

  const isEditing = Boolean(id)

  useEffect(() => {
    const loadTask = async () => {
      if (!isEditing) {
        return
      }

      const task = await getTaskById(id)

      if (task) {
        setTitle(task.title)
        setDescription(task.description)
        setStatus(task.status)
      }
    }

    loadTask()
  }, [id, isEditing])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const taskData = {
      title,
      description,
      status,
    }

    if (isEditing) {
      await updateTask(id, taskData)
    } else {
      await createTask(taskData)
    }

    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="pendiente">Pendiente</option>
          <option value="en-progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <button type="submit">
        {isEditing ? 'Guardar cambios' : 'Crear tarea'}
      </button>
    </form>
  )
}

export default TaskForm